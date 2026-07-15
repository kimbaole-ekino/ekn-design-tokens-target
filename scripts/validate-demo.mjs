import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "src/demos/block/index.html",
  "src/demos/full-page/index.html",
  "src/demos/shared/demo.css",
  "src/demos/shared/demo.js",
  "src/styles/tokens/ekn/css/creative-black.css",
  "src/styles/tokens/ekn/css/creative-white.css",
  "src/styles/tokens/ekn/css/cx-black.css",
  "src/styles/tokens/ekn/css/cx-white.css",
  "src/styles/tokens/ekn/css/health-black.css",
  "src/styles/tokens/ekn/css/health-white.css",
];

for (const relativePath of requiredFiles) {
  await access(path.join(root, relativePath));
}

const obsoletePaths = [
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
  `Validated ${requiredFiles.length} required demo files, six generated schemes, both selector strategies, and removal of obsolete output paths.`,
);
