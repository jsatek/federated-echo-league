# An Ability Type is a delivery shape; abilities attach Effects to it

Each Hero ability is one Ability Type (how it is delivered: projectile, targeted, ground circle, cone, dash, zone, self, aura, ...) plus a list of Effects (what it does: damage, heal, shield, stun, slow, knockback, stat change, reveal, ...) with numbers. We chose composition over ~15 monolithic abilities because it multiplies Hero variety for the same code. It also lets the AI evaluate any ability generically by reading its shape and Effects, instead of needing hand-written logic per ability.
