import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        landing: resolve(import.meta.dirname, "index.html"),
        block: resolve(import.meta.dirname, "src/demos/block/index.html"),
        fullPage: resolve(import.meta.dirname, "src/demos/full-page/index.html"),
      },
    },
  },
});
