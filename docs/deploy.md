# Deploying to Cloudflare Pages

The public site is plain static files (ADR-0001). Cloudflare Pages builds them from this repository on every push to the production branch, then serves them at `https://<project-name>.pages.dev`.

## One-time setup (the owner does this, with their Cloudflare account)

1. Sign in at dash.cloudflare.com (a free account is enough).
2. Open **Workers & Pages**, then **Create application** → **Pages** → **Connect to Git**.
3. Choose **GitHub**, and let Cloudflare's GitHub app see the `federated-echo-league` repository (you can pick "Only select repositories"). Then select the repository and **Begin setup**.
4. On **Set up builds and deployments**, enter:
   - **Project name:** e.g. `federated-echo-league`. This becomes the web address.
   - **Production branch:** `ccr-dea71c01-tmlyq8` (the branch the work is on today).
   - **Framework preset:** None.
   - **Build command:** `pnpm build:pages`
   - **Build output directory:** `dist-pages`
   - **Root directory:** leave empty.
   - **Environment variables:** add `PNPM_VERSION` = `10.28.0`. Cloudflare reads the Node version from `.node-version` by itself, but it does not read the pnpm version from `package.json`.
5. **Save and Deploy**, and wait for the build log to finish (about a minute).
6. Recommended: in the project's **Settings** → **Builds & deployments**, set preview deployments to **None**. Otherwise every other branch also tries to build. Those builds aren't needed, and the `prototype/lane-duel` branch has no build command, so it fails.

## After setup

- Every push to the production branch rebuilds and republishes the site.
- If the work moves to another branch (for example a future `main`), change **Production branch** in the same settings page and save.
- A failed build leaves the previous version online; the build log in the Cloudflare dashboard says what went wrong.
