# Federated Echo League

A fictional MOBA esports league that runs itself: matches are simulated offline, written to replay files, and watched in a browser (phone-friendly) alongside deep history and stats.

Read `GLOSSARY.md` and `docs/adr/` before working in any area.

## Working with the owner

The owner is new to git and coding workflows. Explain each step plainly (what a command does and why) and go one step at a time.

## Agent skills

Skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) are vendored in `.claude/skills/`.

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
