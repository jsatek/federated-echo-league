# Federated Echo League

A fictional MOBA esports league that runs itself: matches are simulated offline, written to replay files, and watched in a browser (phone-friendly) alongside deep history and stats.

Read `GLOSSARY.md` and `docs/adr/` before working in any area.

## Install, build and test

The code is a pnpm workspace: eight packages under `packages/` (see ADR-0006 and ADR-0016) plus repo tooling under `tools/`.

1. **Install the pinned Node version** (22.23.5, written in `.nvmrc`). An exact version means the same Seed gives the same Match (ADR-0007). If you change it, change `.nvmrc`, `.node-version` (read by Cloudflare Pages) and `engines` in `package.json` together. With [nvm](https://github.com/nvm-sh/nvm): `nvm install` then `nvm use` in the repo folder. Check with `node -v`.
2. **Turn on pnpm** (it ships with Node): `corepack enable`. The pnpm version is pinned in `package.json`, so corepack fetches the right one.
3. **Install dependencies:** `pnpm install`. It refuses to run on the wrong Node version.
4. **Test everything:** `pnpm test`. This first runs the package boundary check (ADR-0006), then every package's tests. Test one package with `pnpm vitest run --project sim`.
5. **Typecheck and build:** `pnpm typecheck` checks types everywhere, and `pnpm build` compiles every package into its `dist/` folder.

### Run a Match and watch it

1. `pnpm match --seed 7` plays a Match and writes `replays/seed-7.replay.json.gz`. Add `--seconds 60` for a longer Match. The same Seed always gives a byte-identical file. The `replays/` folder isn't stored in git.
2. `pnpm viewer` starts the viewer on your computer and prints a web address (like `http://localhost:5173`). Open it and add `?replay=seed-7.replay.json.gz` to watch that file. Press Ctrl+C in the terminal to stop it.

### Build the public site

1. `pnpm build:pages` builds everything the static host serves into `dist-pages/`: the Replay list (`site`) at the top, the viewer in `viewer/`, and freshly played Replays plus `index.json` in `replays/`. The published Seeds are listed in `packages/runner/src/publish-cli.ts`.
2. `pnpm preview:pages` serves that folder on your computer so you can click through it before pushing.
3. Cloudflare Pages runs `pnpm build:pages` on every push to the production branch. Setup steps are in `docs/deploy.md`.

Packages are named `@fel/<name>`. Each library package's `package.json` points straight at `src/index.ts`, so tests and Node use the TypeScript source without a build step. `viewer` and `site` are browser apps, not libraries, so they have no `index.ts`. Vite builds each from its `index.html`; `pnpm build:pages` puts them together. When one package starts using another, add it to `dependencies` (`"@fel/contract": "workspace:*"`) and to `references` in that package's `tsconfig.json`.

The boundary check lives in `tools/boundaries/`. It reads every package's `package.json` and imports and fails if `viewer` or `site` can reach anything other than `replay` and `league`, even indirectly, if `sim` and `ai` depend on each other, or if any package depends on `runner` (ADR-0016). To see it fail, add `import "@fel/ai";` to any file in `packages/viewer/src/`, then run `pnpm test`.

## Working with the owner

The owner is new to git and coding workflows. Explain each step plainly (what a command does and why) and go one step at a time.

## Agent skills

Skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) are vendored in `.claude/skills/`.

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
