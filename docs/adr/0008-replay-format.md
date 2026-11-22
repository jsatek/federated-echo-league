# Replay format: tracks + events + snapshots, versioned gzipped JSON

A Replay has three parts:

- **Tracks**: every unit's position and HP at 10 Hz (every other Tick), with positions quantised to whole map units and delta-encoded.
- **Events**: a timestamped list (cast, damage, heal, death, gold, tower, objective, Highlight).
- **Snapshots**: full state every 10 s, for fast seeking.

It is JSON with a format version, served gzipped, with a target of under 1 MB per Match. We start with JSON for debuggability and move to a binary encoding only if measured sizes or phone decode times demand it.
