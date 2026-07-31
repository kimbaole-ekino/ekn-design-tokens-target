# Vercel deployment

This repository uses Vite to bundle package CSS into a static site.

## Project settings

- Framework preset: **Vite**
- Root directory: repository root
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

The deployment entry point is `/index.html`. `src/demos/shared/tokens.css` imports the six public package CSS exports. Vite resolves those imports and writes deployable CSS assets to `dist`; deployed pages do not load files from `node_modules`.

## Private package access

The committed `.npmrc` contains the GitLab registry URL and reads its authentication value from `DESIGN_TOKENS_NPM_TOKEN`. It does not contain a token.

Create a Deploy Token in Central's GitLab project with only `read_package_registry`. In Vercel, add its token value as the `DESIGN_TOKENS_NPM_TOKEN` environment variable for Production, Preview, and Development. Redeploy after saving the variable.

GitLab returns `404 Project not found` when the private project is not visible to the request. If this error remains, confirm that the Vercel variable is available to the failed deployment and that the Deploy Token belongs to GitLab project `8864` and has not expired.

## Before deployment

Run locally with Node 22:

```sh
npm run validate
```

Do not commit `.env.local` or `.vercel/`. The target repository needs its source HTML/CSS/JS and the installed token package. It does not keep copied generated CSS.

## Git integration

Connect the repository in Vercel and enable preview deployments for pull requests. Use the preview URL during target-maintainer review to validate visual changes before merging generated token delivery PRs.
