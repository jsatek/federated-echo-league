# Package boundaries: the viewer never imports the sim

The monorepo has these packages:

- `contract`: the sim↔AI interface.
- `sim`: rules.
- `ai`: bots.
- `replay`: file format and types.
- `league`: schedule, rosters, stats, history.
- `viewer`: PixiJS player.
- `site`: static pages.

`viewer` and `site` may depend only on `replay` and `league`, never on `sim`, `ai` or `contract`. `sim` and `ai` meet only through `contract`. This makes ADR-0001 and ADR-0002 enforceable in code, and keeps the phone download small.
