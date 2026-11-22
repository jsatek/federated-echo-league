# 02: Two Heroes walk the lane, watched in a browser

**What to build:** The thinnest complete path through every layer. A minimal `contract` (an Observation in, Intents out). A `sim` that advances at 20 Ticks per second (ADR-0007) with one seeded random generator. A placeholder bot in `ai` that walks its Hero to the middle of the Lane. A single command runs a Match from a Seed and writes a Replay containing position Tracks only, as versioned, gzipped JSON (ADR-0008). A bare PixiJS `viewer` loads that Replay file and plays it smoothly at phone width.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] One command produces a Replay file from a Seed
- [ ] Running it twice with the same Seed produces a byte-identical Replay (automated test)
- [ ] The sim only talks to the bot through `contract`; the viewer depends only on `replay`
- [ ] The viewer plays the Replay with interpolation between Track samples and fits a 400px-wide screen
- [ ] The Replay format carries a version number, and the viewer refuses an unknown version with a clear message
