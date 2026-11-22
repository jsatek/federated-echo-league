# 02: Two Heroes walk the lane, watched in a browser

**What to build:** The thinnest complete path through every layer. A minimal `contract` (an Observation in, Intents out). A `sim` that advances at 20 Ticks per second (ADR-0007) with one seeded random generator. A placeholder bot in `ai` that walks its Hero to the middle of the Lane. A single command runs a Match from a Seed and writes a Replay containing position Tracks only, as versioned, gzipped JSON (ADR-0008). A bare PixiJS `viewer` loads that Replay file and plays it smoothly at phone width.

**Blocked by:** 01

**Status:** done

- [x] One command produces a Replay file from a Seed
- [x] Running it twice with the same Seed produces a byte-identical Replay (automated test)
- [x] The sim only talks to the bot through `contract`; the viewer depends only on `replay`
- [x] The viewer plays the Replay with interpolation between Track samples and fits a 400px-wide screen
- [x] The Replay format carries a version number, and the viewer refuses an unknown version with a clear message

## Comments

The "single command runs a Match from a Seed" lives in the `runner` package (ADR-0016). `runner` depends on `sim`, `ai`, `contract` and `replay`.

**Done (agent).** `pnpm match --seed 7` writes `replays/seed-7.replay.json.gz`, and `pnpm viewer` plays it (`?replay=<file>`). The tests cover byte-identical Replays per Seed, Hero movement, refused Intents, Vision filtering in the Observation, the Replay round trip and version refusal, and viewer interpolation. Screenshots at 400px: `ticket-02-viewer.png`.

Decision during the build: the sim and each Team's AI draw from separate random streams hashed from the one Seed (ADR-0017, clarifying ADR-0004).

New glossary terms: Observation, Track.
