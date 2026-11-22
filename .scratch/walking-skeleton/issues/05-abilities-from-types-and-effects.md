# 05: Abilities from Ability Types and Effects

**What to build:** The generic ability system from ADR-0010: an ability is an Ability Type (Projectile, Dash, Blink, Cone, Ground Circle, Self) plus Effects (Damage, Slow, Stun, Shield) with per-level numbers. Two Heroes, Warden and Lumen, are defined as data, with the kits from the prototype. Projectiles are blocked by the first enemy unit they meet. Engage Dashes travel their full length and stop on the first enemy Hero. The viewer draws projectiles, circles, cones, stuns and shields.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] Adding a new ability needs data only, with no new sim code, as long as it uses existing Ability Types and Effects
- [ ] Tests cover each Ability Type and each Effect, including a Stun interrupting a cast and a Recall
- [ ] A scripted Replay fires every Warden and Lumen ability, and each effect is visible in the viewer
- [ ] Cooldowns and durations are whole Ticks
