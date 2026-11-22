# AI interface: Vision in, Intents out; Team Brain + Role Brains; ratings live only in the AI

Each decision step, the sim gives a Team's AI that Team's Vision (ADR-0005). The AI returns one Intent per Hero: move to point, attack unit, cast ability at point/unit, hold, recall. Pathfinding and auto-attack timing stay in the sim.

Inside `ai`, a Team Brain per Team scores macro options about once a second and gives each Hero an Assignment. A Role Brain per Hero carries out its Assignment about 10 times a second with rules specific to its Role.

Player Ratings exist only in `ai`. They act through stale Vision (reaction time), aim noise, decision noise and similar. The sim is rating-blind and treats every Hero identically. Humanisation is therefore always explainable as a bot decision, never a hidden stat penalty, and the sim stays simple to test.
