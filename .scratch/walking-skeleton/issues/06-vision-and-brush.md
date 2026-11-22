# 06: Vision and Brush

**What to build:** Each Team's Observation contains only what its Team can see (ADR-0005): Vision around Heroes, minions and Towers, with Brush hiding anyone inside it from enemies who aren't in the same patch. Minions and Towers lose track of a Hero their Team can't see, so stepping into Brush drops aggro. The single order door refuses illegal Intents (attacking an unseen Hero, casting on cooldown, acting while stunned), whoever sends them. Observations also say what visible enemies are attacking and what is attacking you (ADR-0015). The Replay still holds the full truth.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] Tests show a bot cannot see, or successfully target, a Hero hidden in Brush
- [ ] Tests show minion and Tower aggro dropping when the target walks into Brush
- [ ] Refused Intents are recorded as Match Events with a plain reason
- [ ] Enemy cooldowns are never in an Observation; casts the Team saw are
