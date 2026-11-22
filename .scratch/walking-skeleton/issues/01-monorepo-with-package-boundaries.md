# 01: Monorepo with enforced package boundaries

**What to build:** A TypeScript monorepo managed with pnpm, holding the seven packages from ADR-0006 (`contract`, `sim`, `ai`, `replay`, `league`, `viewer`, `site`), each empty but buildable and testable. One command runs every package's tests. An automatic check fails the build if `viewer` or `site` depends on `sim`, `ai` or `contract`, or if `sim` and `ai` depend on each other instead of meeting through `contract`.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] pnpm workspace with the seven packages; a single command builds and tests all of them
- [x] A test runner is set up, with one trivial passing test per package
- [x] The boundary check runs as part of the test command and fails on a deliberately bad import (shown in a test or a documented manual check)
- [x] The Node version is pinned (ADR-0007: same Seed reproduces on the same setup)
- [x] `CLAUDE.md` says how to install, build and test, in plain steps for a newcomer

## Comments

**Done (agent).** `pnpm test` runs the boundary check (`tools/boundaries/`), then Vitest across all seven packages. `pnpm build` runs `tsc --build` with project references. Node 22.23.5 is pinned in `.nvmrc`, `.node-version` and `engines` (enforced by `engine-strict`).

Open question for the owner: the check also follows indirect dependencies, so `league` can never import `sim` or `ai` (otherwise viewer would pull the sim in through league). Whatever runs Matches from a Seed needs a home outside `league`, or `league` needs splitting. Decide this before ticket 02 and record it in ADR-0006.

Known follow-ups: `pnpm build` also emits test files into `dist/`, and the base tsconfig has no DOM types. Viewer and site get a browser bundler and DOM types in tickets 02 and 03.
