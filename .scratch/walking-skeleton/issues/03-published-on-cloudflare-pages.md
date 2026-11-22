# 03: Published on a static host

**What to build:** A minimal `site` page that lists the available Replays and opens one in the viewer, built as static files and deployed to Cloudflare Pages, so anyone with the link can watch a Replay on their phone.

**Blocked by:** 02

**Status:** ready-for-agent

- [x] One command builds the site and viewer as static files with the Replays alongside
- [ ] The owner is walked step by step through connecting the repository to Cloudflare Pages (this needs their Cloudflare account; it cannot be done for them)
- [ ] A push to the agreed branch redeploys the site
- [ ] Opening the public link on a phone lists Replays and plays one

## Comments

**Agent part done.** `pnpm build:pages` builds `dist-pages/`: site at the top, viewer in `viewer/`, five freshly played Replays (Seeds 1–5, 60 s) plus `index.json` in `replays/`. It was checked locally with `pnpm preview:pages` at 400px: list → Replay → back, with no errors. Screenshots: `ticket-03-list.png`, `ticket-03-viewer.png`. Setup steps for the owner: `docs/deploy.md`.

Still to do with the owner: connect Cloudflare Pages, confirm a push redeploys, and open the public link on a phone.
