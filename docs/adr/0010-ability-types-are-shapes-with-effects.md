# An Ability Type is a delivery shape; abilities attach Effects to it

Each Hero ability is one Ability Type (how it is delivered: projectile, targeted, ground circle, cone, dash, zone, self, aura, ...) plus a list of Effects (what it does: damage, heal, shield, stun, slow, knockback, stat change, reveal, ...) with numbers. We chose composition over ~15 monolithic abilities because it multiplies Hero variety for the same code. It also lets the AI evaluate any ability generically by reading its shape and Effects, instead of needing hand-written logic per ability.

## The v1 lists

- **Ability Types (10)**: Projectile (stops at first hit), Piercing Line, Targeted (filtered to enemy, ally or any), Ground Circle (optional delay), Cone, Dash (can hit along the path), Blink, Zone (lingering area), Self, Aura.
- **Effects (10)**: Damage, Heal, Shield, Stun, Root, Slow, Silence, Displace (knockback or pull), Modify Stat, Reveal. Any Effect may last for a duration, which covers damage over time.

This replaces the original brief's "~15 ability types": composition gives more variety from fewer pieces. Summons, chains and global abilities are deferred.

A Hero kit is 1 Passive, 3 basic abilities and 1 Ultimate.
