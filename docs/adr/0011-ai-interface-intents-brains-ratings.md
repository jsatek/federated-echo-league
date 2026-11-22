# AI interface: Vision in, Intents out; Team Brain + Role Brains; ratings live only in the AI

Each decision step, the sim gives a Team's AI that Team's Vision (ADR-0005). The AI returns one Intent per Hero: move to point, attack unit, cast ability at point/unit, hold, recall. Pathfinding and auto-attack timing stay in the sim.

Inside `ai`, a Team Brain per Team scores macro options about once a second and gives each Hero an Assignment. A Role Brain per Hero carries out its Assignment about 10 times a second with rules specific to its Role.

Player Ratings exist only in `ai`. They act through stale Vision (reaction time), aim noise, decision noise and similar. The sim is rating-blind and treats every Hero identically. Humanisation is therefore always explainable as a bot decision, never a hidden stat penalty, and the sim stays simple to test.

## What the AI is told

Own Heroes in full (including cooldowns); visible enemy units' position, HP and status; visible Towers, Minion Waves and Objectives; the Match clock. Never enemy cooldowns or unseen positions. Remembering "they used their dash 8 s ago" or "last seen heading bot" is the AI's job, as it would be a human's.

## Team Brain options (v1)

Farm Lanes, Group and Push a Lane, Take Objective, Contest Objective, Defend Tower, Split-Push, Retreat and Recall. They are scored on gold and level difference, Objective timers, Tower states, enemy Heroes last seen or dead, and own Heroes' HP and mana.
