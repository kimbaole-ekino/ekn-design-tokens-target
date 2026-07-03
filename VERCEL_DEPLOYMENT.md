# Vercel Deployment

This project is a static site deployed on Vercel.

Production URL:

https://ekn-design-tokens-target.vercel.app

Vercel project:

- Team: `thanh-bao-ekino`
- Project: `ekn-design-tokens-target`
- Project ID: `prj_KsTmdfKwlUr5dOfnQQMMfygd2VDe`

## How Vercel Deployments Work

When the GitHub repository is connected to Vercel:

- Every push to a non-production branch creates a Preview Deployment.
- Every merge or push to the production branch creates a Production Deployment.
- The default production branch is `main`.

Official docs:

https://vercel.com/docs/git

## One-Time Setup

### 1. Log in to Vercel

Run:

```bash
npx vercel login
```

Follow the browser login flow.

### 2. Link the Local Repo to Vercel

From the project root:

```bash
npx vercel link --yes
```

For this repo, the project has already been created on Vercel:

```text
thanh-bao-ekino/ekn-design-tokens-target
```

The local `.vercel/` folder is ignored by Git and should not be committed.

### 3. Connect the GitHub Repository

Auto deploy requires the Vercel project to be connected to GitHub.

Before running the command below, make sure the Vercel account or team has a GitHub Login Connection for the GitHub account/org that owns:

```text
kimbaole-ekino/ekn-design-tokens-target
```

Then run:

```bash
npx vercel git connect https://github.com/kimbaole-ekino/ekn-design-tokens-target
```

If this fails with a Login Connection error, open Vercel account settings and connect GitHub first.

## Manual Deploy

Use this when you want to deploy the current local files without waiting for Git.

### Preview Deploy

```bash
npx vercel
```

### Production Deploy

```bash
npx vercel --prod
```

The latest manual production deploy created this alias:

```text
https://ekn-design-tokens-target.vercel.app
```

## Auto Deploy From `main`

After GitHub is connected:

1. Create a branch.
2. Push the branch to GitHub.
3. Vercel creates a Preview Deployment.
4. Open the preview URL and test the site.
5. Merge the branch into `main`.
6. Vercel automatically creates a Production Deployment.
7. Test the production URL:

```text
https://ekn-design-tokens-target.vercel.app
```

## Local Verification Before Deploy

Because this is a static site, you can test locally by opening:

```text
index.html
```

Recommended checks before deploying:

- The home page loads.
- The CX iframe loads.
- The Health iframe loads.
- Button hover animation works.
- Browser console has no missing CSS or JS assets.

The deployed site currently has one harmless missing asset:

```text
/favicon.ico
```

Add a favicon later if needed.

## Troubleshooting

### `vercel git connect` Fails

Error example:

```text
You need to add a Login Connection to your GitHub account first.
```

Fix:

1. Open Vercel.
2. Go to account or team settings.
3. Add GitHub as a Login Connection.
4. Make sure Vercel has access to `kimbaole-ekino/ekn-design-tokens-target`.
5. Run `npx vercel git connect` again.

### Production Does Not Deploy After Merge

Check:

- The GitHub repo is connected in Vercel Project Settings.
- The production branch is set to `main`.
- The commit author has access to the Vercel project.
- The Vercel GitHub app has access to the repository.

### Local `.vercel/` Files Appear in Git

Make sure `.gitignore` contains:

```gitignore
.vercel/
.vercel
.env*
```

