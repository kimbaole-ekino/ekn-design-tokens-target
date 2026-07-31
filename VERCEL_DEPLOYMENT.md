# Vercel deployment

This repository is a static site and does not require a framework build.

## Project settings

- Framework preset: **Other**
- Root directory: repository root
- Build command: leave empty
- Output directory: leave empty
- Install command: `npm ci`

The deployment entry point is `/index.html`. Relative links load the block and full-page demos. Token CSS loads from the installed `@ekinotech/design-tokens-ekinotech-showcase` package under `node_modules`.

## Before deployment

Run locally with Node 22:

```sh
npm run validate
```

Do not commit `.env.local` or `.vercel/`. The target repository needs its source HTML/CSS/JS and the installed token package. It does not keep copied generated CSS.

## Git integration

Connect the repository in Vercel and enable preview deployments for pull requests. Use the preview URL during target-maintainer review to validate visual changes before merging generated token delivery PRs.
