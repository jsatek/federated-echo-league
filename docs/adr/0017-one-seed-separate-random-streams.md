# One Seed, separate random streams for the sim and each Team's AI

ADR-0004 says the sim uses "one seeded random generator". We read that as one Seed per Match, not one shared generator. The sim and each Team's AI each draw from their own stream (`createRng(seed, "sim")`, `"ai-blue"`, `"ai-red"`). The stream is made by hashing the Seed together with the stream's name. With a shared generator, a bot that started rolling one extra die would shift every later rule outcome, so an AI tweak could not be compared fairly against the same Seed. Hashing, rather than offsets like `seed * 2 + 1`, keeps one Seed's stream from repeating another Seed's.

Clarifies ADR-0004.
