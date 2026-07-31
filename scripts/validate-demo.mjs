import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const packageName = "@ekinotech/design-tokens-ekinotech-showcase";
const schemes = [
  "creative-black",
  "creative-white",
  "cx-black",
  "cx-white",
  "health-black",
  "health-white",
];
const requiredFiles = [
  "index.html",
  "src/demos/block/index.html",
  "src/demos/full-page/index.html",
  "src/demos/shared/demo.css",
  "src/demos/shared/demo.js",
  "src/demos/shared/tokens.css",
];

for (const relativePath of requiredFiles) {
  await access(path.join(root, relativePath));
}

for (const scheme of schemes) {
  const cssUrl = import.meta.resolve(`${packageName}/${scheme}.css`);
  const css = await readFile(new URL(cssUrl), "utf8");

  if (!css.includes("--color-")) {
    throw new Error(`Package export ${scheme}.css must contain color custom properties.`);
  }
}

const obsoletePaths = [
  "src/styles/tokens",
  "src/styles/tokens/css",
  "src/styles/tokens/html",
  "src/styles/tokens/json",
  "src/cx",
  "src/health",
  "src/shared",
];

for (const relativePath of obsoletePaths) {
  try {
    await access(path.join(root, relativePath));
    throw new Error(`Obsolete demo/output path must be removed: ${relativePath}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Obsolete demo/output path")) {
      throw error;
    }
  }
}

const blockHtml = await readFile(path.join(root, "src/demos/block/index.html"), "utf8");
const pageHtml = await readFile(path.join(root, "src/demos/full-page/index.html"), "utf8");
const landingHtml = await readFile(path.join(root, "index.html"), "utf8");
const tokensCss = await readFile(path.join(root, "src/demos/shared/tokens.css"), "utf8");

for (const { name, html } of [
  { name: "landing", html: landingHtml },
  { name: "block", html: blockHtml },
  { name: "full-page", html: pageHtml },
]) {
  if (!html.includes("shared/tokens.css")) {
    throw new Error(`${name} page must load the shared token CSS entry.`);
  }

  if (html.includes("node_modules") || html.includes("styles/tokens")) {
    throw new Error(`${name} page must not load node_modules or copied token CSS directly.`);
  }
}

for (const scheme of schemes) {
  const packageExport = `${packageName}/${scheme}.css`;
  if (!tokensCss.includes(`@import "${packageExport}"`)) {
    throw new Error(`Shared token CSS must import ${packageExport}.`);
  }
}

if (
  !blockHtml.includes('data-color-scheme="creative-black"') ||
  !blockHtml.includes('data-color-scheme="cx-white"') ||
  !blockHtml.includes('data-color-scheme="health-black"') ||
  !blockHtml.includes("data-block-scheme-control")
) {
  throw new Error("Block demo must include independently scoped scheme blocks and controls.");
}

if (!pageHtml.includes('<html lang="en" data-color-scheme="creative-white">')) {
  throw new Error("Full-page demo must place data-color-scheme on the document root.");
}

const schemeTags = pageHtml.match(/<[^>]+data-color-scheme=/g) ?? [];
if (schemeTags.length !== 1) {
  throw new Error("Full-page demo must not introduce local color-scheme scopes.");
}

console.log(
  `Validated ${requiredFiles.length} app files, six package CSS exports, both selector strategies, and removal of copied token CSS.`,
);
