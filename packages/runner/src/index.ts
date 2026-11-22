// Plays Matches (ADR-0016): joins sim and ai through contract and records a Replay.

import {
  DECISION_EVERY_TICKS,
  HEROES,
  MAP,
  TEAMS,
  TICKS_PER_SECOND,
  type HeroKind,
  type TeamAi,
  type TeamId,
} from "@fel/contract";
import { createPlaceholderTeamAi } from "@fel/ai";
import type { Replay } from "@fel/replay";
import { createSim } from "@fel/sim";

/** ADR-0008: Tracks are sampled at 10 Hz, every other Tick. */
const SAMPLE_EVERY_TICKS = 2;

/** One Hero in a Match and the Player controlling it. */
export interface LineupSlot {
  id: string;
  team: TeamId;
  hero: HeroKind;
  player: string;
}

/** The walking-skeleton matchup: one Lane, Warden vs Lumen. */
export const DEFAULT_LINEUP: readonly LineupSlot[] = [
  { id: "blue-warden", team: "blue", hero: "warden", player: "Kestrel" },
  { id: "red-lumen", team: "red", hero: "lumen", player: "Magpie" },
];

export interface MatchOptions {
  seed: number;
  durationSeconds?: number;
  lineup?: readonly LineupSlot[];
}

export function runMatch({ seed, durationSeconds = 30, lineup = DEFAULT_LINEUP }: MatchOptions): Replay {
  const durationTicks = durationSeconds * TICKS_PER_SECOND;
  const sim = createSim({ seed, heroes: lineup });
  const ais: Record<TeamId, TeamAi> = {
    blue: createPlaceholderTeamAi("blue", seed),
    red: createPlaceholderTeamAi("red", seed),
  };
  const tracks: Replay["tracks"] = Object.fromEntries(lineup.map((l) => [l.id, { x: [], y: [] }]));

  for (;;) {
    if (sim.tick % SAMPLE_EVERY_TICKS === 0) {
      for (const hero of sim.heroes()) {
        tracks[hero.id]!.x.push(hero.x);
        tracks[hero.id]!.y.push(hero.y);
      }
    }
    if (sim.tick === durationTicks) break;
    if (sim.tick % DECISION_EVERY_TICKS === 0) {
      for (const team of TEAMS) sim.setIntents(team, ais[team].decide(sim.observe(team)));
    }
    sim.step();
  }

  return {
    match: { seed, ticksPerSecond: TICKS_PER_SECOND, sampleEveryTicks: SAMPLE_EVERY_TICKS, durationTicks },
    map: { width: MAP.width, height: MAP.height, laneY: MAP.laneY, bases: MAP.bases, baseRadius: MAP.baseRadius },
    units: lineup.map(({ id, team, hero, player }) => ({
      id,
      team,
      hero,
      heroName: HEROES[hero].name,
      player,
      radius: HEROES[hero].radius,
    })),
    tracks,
  };
}
