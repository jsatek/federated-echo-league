# A `runner` package plays Matches; `league` stays browser-safe

Running a Match from a Seed needs `sim`, `ai` and `contract` together. `league` cannot host this, because ADR-0006 lets `viewer` and `site` depend on `league`, and the boundary check follows indirect dependencies, so the whole sim would reach the phone download through `league`. We added an eighth package, `runner`. It wires `sim` and `ai` together through `contract`, writes Replays with `replay`, and will later run whole seasons from `league`'s schedule and record results back into league data files. `runner` may depend on any package, and no package may depend on it. It is the only place the offline half (sim, ai) and the league half meet.

Amends ADR-0006's package list.
