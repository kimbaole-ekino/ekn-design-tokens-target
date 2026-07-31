# Vercel deployment

This repository uses Vite to bundle package CSS into a static site.

## Project settings

- Framework preset: **Vite**
- Root directory: repository root
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

The deployment entry point is `/index.html`. `src/demos/shared/tokens.css` imports the six public package CSS exports. Vite resolves those imports and writes deployable CSS assets to `dist`; deployed pages do not load files from `node_modules`.

## Before deployment

Run locally with Node 22:

```sh
npm run validate
```

Do not commit `.env.local` or `.vercel/`. The target repository needs its source HTML/CSS/JS and the installed token package. It does not keep copied generated CSS.

## Git integration

Connect the repository in Vercel and enable preview deployments for pull requests. Use the preview URL during target-maintainer review to validate visual changes before merging generated token delivery PRs.
