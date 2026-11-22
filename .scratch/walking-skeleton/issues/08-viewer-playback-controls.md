# 08: Viewer playback controls

**What to build:** Replays gain full-state Snapshots every 10 s (ADR-0008), so the viewer can seek. The viewer gets a seek bar and 1×/2×/4× speed that work by touch on a phone. Replays are checked against the size budget.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] Seeking to any point of a 3-minute Replay shows the right state almost immediately
- [ ] Speed and seek controls are usable on a 400px-wide touch screen
- [ ] An automated check fails if a 3-minute Replay exceeds 1 MB gzipped, and reports the actual size
