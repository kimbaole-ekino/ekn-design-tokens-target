import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

for (const context of ["creative", "cx", "health"]) {
  for (const appearance of ["black", "white"]) {
    const scheme = `${context}-${appearance}`;
    test(`${scheme} artifact supports root and scoped selectors`, async () => {
      const css = await read(`src/styles/tokens/ekn/css/${scheme}.css`);
      assert.match(css, new RegExp(`:root\\[data-color-scheme="${scheme}"\\]`));
      assert.match(css, new RegExp(`\\[data-color-scheme="${scheme}"\\]`));
      assert.match(css, /--color-background:/);
      assert.match(css, /--color-text:/);
      assert.match(css, /--color-primary:/);
      assert.match(css, /--color-surface:/);
      assert.match(css, /--color-button-text:/);
    });
  }
}
