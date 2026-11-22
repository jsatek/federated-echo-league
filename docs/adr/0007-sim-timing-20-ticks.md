# Sim runs at 20 ticks per second with normal floating-point math

The sim advances in fixed 50 ms Ticks (20 per second), and every duration in the rules (cooldowns, stuns, respawns) is a whole number of Ticks. The viewer interpolates to 60 fps. We use ordinary JavaScript floating-point numbers rather than integer or fixed-point math. Because Replays record outcomes (ADR-0004), cross-machine bit-exactness only matters when re-running an old Seed, so we pin the Node version instead of paying for fixed-point.
