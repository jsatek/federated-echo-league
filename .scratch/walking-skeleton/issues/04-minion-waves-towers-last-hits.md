# 04: Minion Waves, Towers and Last Hits

**What to build:** The Lane gains stakes, ported from the lane-duel prototype (branch `prototype/lane-duel`). A Minion Wave spawns every 15 s per Team. Towers have health, shoot minions and switch to a Hero who hits an allied Hero under them. Gold comes only from Last Hits and kills and is spent automatically on upgrades at base (ADR-0012). XP takes Heroes to level 6. Bases are far behind the Towers (ADR-0014), and Recall takes 4 s. The Replay gains Match Events (ADR-0008), and the viewer draws minions, Towers and health bars.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] A Replay where the placeholder bots stand still shows Waves fighting, Last Hits going unclaimed and, eventually, a Tower falling
- [ ] Match Events record casts, damage, deaths, gold, level-ups, Recalls and Tower kills
- [ ] Tests cover Last Hit gold, Tower target switching, Recall interrupted by damage, and gold cashed in at base
- [ ] Bases are about 5 s of walking from the middle of the Lane; the viewer shows the Lane section and marks Heroes who are off-screen
