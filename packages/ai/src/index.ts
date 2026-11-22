// Bots (ADR-0011). They see only an Observation and answer only with Intents.

import { createRng, LANE_MIDDLE, type Intent, type Point, type TeamAi, type TeamId } from "@fel/contract";

/** How far back from the Lane middle, toward its own base, each Hero stands. */
const STAND_BACK = 150;
/** How far the standing spot may wander from that, per Hero and Seed. */
const WOBBLE = 60;

/**
 * Walking-skeleton bot: each Hero walks to a spot just on its own side of the
 * Lane middle and holds there. Replaced by Stance-based Role Brains in ticket 07.
 */
export function createPlaceholderTeamAi(team: TeamId, seed: number): TeamAi {
  const rng = createRng(seed, `ai-${team}`);
  const towardOwnBase = team === "blue" ? -1 : 1;
  const spots = new Map<string, Point>();

  return {
    decide(observation) {
      const intents: Record<string, Intent> = {};
      for (const ally of observation.allies) {
        let spot = spots.get(ally.id);
        if (!spot) {
          spot = {
            x: LANE_MIDDLE.x + towardOwnBase * STAND_BACK + (rng.next() * 2 - 1) * WOBBLE,
            y: LANE_MIDDLE.y + (rng.next() * 2 - 1) * WOBBLE,
          };
          spots.set(ally.id, spot);
        }
        intents[ally.id] = ally.x === spot.x && ally.y === spot.y ? { kind: "hold" } : { kind: "move", to: spot };
      }
      return intents;
    },
  };
}
