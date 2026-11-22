# 07: The Stance-based bots

**What to build:** Port the lane-duel prototype's AI into `ai`, replacing the placeholder bot. Perception: reaction delay from the first decision, a primed start, and memory of enemy positions and cooldowns from casts seen (ADR-0015). Player Ratings live only in `ai` (ADR-0011). Matchup Profiles are derived from kits. The Role Brain has a Stance layer and an Action layer (ADR-0013), with decision noise rolled once per Stance call. A headless check runs several Seeds and reports Last Hits per minute, Stance changes per minute, idle time and kills.

**Blocked by:** 05, 06

**Status:** ready-for-agent

- [ ] Warden vs Lumen Replays look like prototype v3: farming first, trading on windows, dropping aggro in Brush, recalling safely
- [ ] The headless check lands in the prototype's range (roughly 9–11 Last Hits per minute, 10–13 Stance changes per minute, a few idle seconds per 3-minute Match)
- [ ] Tests cover the recall freeze fix (a low bot that can't recall safely walks back instead of standing still), All-in running until it resolves, and an elite Laning rating out-farming a poor one across most Seeds
- [ ] Each bot's Stance, its reason and the action scores can be written alongside the Replay for debugging, but are not part of the Replay itself
