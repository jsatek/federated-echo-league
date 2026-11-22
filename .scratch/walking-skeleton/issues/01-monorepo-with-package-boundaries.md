# 01: Monorepo with enforced package boundaries

**What to build:** A TypeScript monorepo managed with pnpm, holding the seven packages from ADR-0006 (`contract`, `sim`, `ai`, `replay`, `league`, `viewer`, `site`), each empty but buildable and testable. One command runs every package's tests. An automatic check fails the build if `viewer` or `site` depends on `sim`, `ai` or `contract`, or if `sim` and `ai` depend on each other instead of meeting through `contract`.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] pnpm workspace with the seven packages; a single command builds and tests all of them
- [ ] A test runner is set up, with one trivial passing test per package
- [ ] The boundary check runs as part of the test command and fails on a deliberately bad import (shown in a test or a documented manual check)
- [ ] The Node version is pinned (ADR-0007: same Seed reproduces on the same setup)
- [ ] `CLAUDE.md` says how to install, build and test, in plain steps for a newcomer
