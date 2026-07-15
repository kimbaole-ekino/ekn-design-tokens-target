# Vercel deployment

This repository is a static site and does not require a framework build.

## Project settings

- Framework preset: **Other**
- Root directory: repository root
- Build command: leave empty
- Output directory: leave empty
- Install command: leave empty unless Vercel requires one

The deployment entry point is `/index.html`. Relative links load the block and full-page demos plus delivered CSS under `src/styles/tokens/`.

## Before deployment

Run locally with Node 22:

```sh
npm run validate
```

Do not commit `.env.local` or `.vercel/`. The target repository only needs source HTML/CSS/JS and the delivered generated CSS artifacts.

## Git integration

Connect the repository in Vercel and enable preview deployments for pull requests. Use the preview URL during target-maintainer review to validate visual changes before merging generated token delivery PRs.
