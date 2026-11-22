# 04: Minion Waves, Towers and Last Hits

**What to build:** The Lane gains stakes, ported from the lane-duel prototype (branch `prototype/lane-duel`). A Minion Wave spawns every 15 s per Team. Towers have health, shoot minions and switch to a Hero who hits an allied Hero under them. Gold comes only from Last Hits and kills and is spent automatically on upgrades at base (ADR-0012). XP takes Heroes to level 6. Bases are far behind the Towers (ADR-0014), and Recall takes 4 s. The Replay gains Match Events (ADR-0008), and the viewer draws minions, Towers and health bars.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] A Replay where the placeholder bots stand still shows Waves fighting, Last Hits going unclaimed and, eventually, a Tower falling
- [ ] Match Events record casts, damage, deaths, gold, level-ups, Recalls and Tower kills
- [ ] Tests cover Last Hit gold, Tower target switching, Recall interrupted by damage, and gold cashed in at base
- [ ] Bases are about 5 s of walking from the middle of the Lane; the viewer shows the Lane section and marks Heroes who are off-screen

## Comments

From the ticket 02 review: Replay Tracks currently start at Tick 0 and run to the end of the Match, and `units` holds only Heroes. Minions spawn and die mid-Match, so this ticket needs to give each Track a start (and units a kind and lifetime). The format is still version 1 and nothing is published yet, so change it in place, or bump the version if ticket 03 has already published Replays. The sim's refused Intents are returned to the runner but not recorded yet; record them as Match Events once Events exist.
