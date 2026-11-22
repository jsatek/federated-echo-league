// The sim <-> AI interface (ADR-0002, ADR-0011). Everything here is public
// knowledge that both the sim and the bots may use. Nothing here holds state.

export { createRng, type Rng } from "./rng.ts";

/** ADR-0007: the sim advances in fixed 50 ms Ticks. */
export const TICKS_PER_SECOND = 20;
/** Bots decide 10 times a second (the Role Brain cadence in ADR-0011). */
export const DECISION_EVERY_TICKS = 2;

export type TeamId = "blue" | "red";
export const TEAMS: readonly TeamId[] = ["blue", "red"];

export interface Point {
  x: number;
  y: number;
}

/**
 * The public map layout, in map units. One Lane for the walking skeleton.
 * ADR-0014: bases sit about 5 s of walking from the middle of the Lane.
 */
export const MAP = {
  width: 3600,
  height: 500,
  laneY: 250,
  bases: { blue: { x: 60, y: 250 }, red: { x: 3540, y: 250 } },
  /** Heroes appear somewhere inside this radius of their base. */
  baseRadius: 160,
} as const;

export const LANE_MIDDLE: Point = { x: MAP.width / 2, y: MAP.laneY };

export type HeroKind = "warden" | "lumen";

/** What anyone may know about each Hero. Movement speed is map units per second. */
export const HEROES: Readonly<Record<HeroKind, { name: string; speed: number; radius: number }>> = {
  warden: { name: "Warden", speed: 345, radius: 28 },
  lumen: { name: "Lumen", speed: 330, radius: 28 },
};

/** How far a Hero sees, in map units (ADR-0005). Brush arrives in ticket 06. */
export const HERO_VISION = 700;

export type HeroId = string;

/** An own Hero, known in full. */
export interface AllyHero {
  id: HeroId;
  hero: HeroKind;
  x: number;
  y: number;
}

/** An enemy Hero the Team can currently see. */
export interface VisibleEnemyHero {
  id: HeroId;
  hero: HeroKind;
  x: number;
  y: number;
}

/** What the sim hands one Team's AI each decision step: own Heroes plus that Team's Vision. */
export interface Observation {
  tick: number;
  team: TeamId;
  allies: AllyHero[];
  enemies: VisibleEnemyHero[];
}

/** What a bot wants its Hero to do next. The sim decides what actually happens. */
export type Intent = { kind: "move"; to: Point } | { kind: "hold" };

/** One Intent per own Hero the AI wants to steer; Heroes left out keep their last Intent. */
export type Intents = Readonly<Record<HeroId, Intent>>;

/** A Team's AI, as the sim's caller sees it. */
export interface TeamAi {
  decide(observation: Observation): Intents;
}
