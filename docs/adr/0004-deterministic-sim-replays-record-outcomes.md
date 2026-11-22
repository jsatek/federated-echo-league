# Deterministic sim; Replays record outcomes, not inputs

The sim is deterministic: the same Seed and the same code produce the same Match. It uses one seeded random generator, with no `Math.random` and no wall-clock time. Even so, a Replay records what happened (positions, events), not the Seed plus inputs needed to recompute it. Determinism makes bugs reproducible and AI tuning measurable. Storing outcomes means the viewer needs no sim code, and old Replays keep playing after rule changes. That breaks the usual "replay = seed + inputs" habit on purpose, and costs bigger files.
