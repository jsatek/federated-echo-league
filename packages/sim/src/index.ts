// The rules (ADR-0006). Rating-blind: every Hero is treated identically (ADR-0011).
// The sim's only conversation with bots is Observation out, Intents in (ADR-0002).

import {
  createRng,
  HERO_VISION,
  HEROES,
  MAP,
  TICKS_PER_SECOND,
  type HeroId,
  type HeroKind,
  type Intent,
  type Intents,
  type Observation,
  type TeamId,
} from "@fel/contract";

export interface MatchSetup {
  seed: number;
  heroes: readonly { id: HeroId; team: TeamId; hero: HeroKind }[];
}

/** Full information about a Hero. For recording Replays; never handed to bots. */
export interface HeroState {
  readonly id: HeroId;
  readonly team: TeamId;
  readonly hero: HeroKind;
  readonly x: number;
  readonly y: number;
}

export interface RefusedIntent {
  heroId: HeroId;
  reason: string;
}

export interface Sim {
  readonly tick: number;
  heroes(): readonly HeroState[];
  /** What one Team's AI may know right now (ADR-0005, ADR-0011). */
  observe(team: TeamId): Observation;
  /** Accepts each Intent the Team may give; returns the ones it refused, and why. */
  setIntents(team: TeamId, intents: Intents): RefusedIntent[];
  step(): void;
}

interface MutableHero {
  id: HeroId;
  team: TeamId;
  hero: HeroKind;
  x: number;
  y: number;
  intent: Intent;
}

export function createSim(setup: MatchSetup): Sim {
  const rng = createRng(setup.seed, "sim");
  const heroes: MutableHero[] = setup.heroes.map(({ id, team, hero }) => {
    // Appear at a random point inside the base circle.
    const angle = rng.next() * 2 * Math.PI;
    const r = Math.sqrt(rng.next()) * MAP.baseRadius;
    const base = MAP.bases[team];
    return { id, team, hero, x: base.x + r * Math.cos(angle), y: base.y + r * Math.sin(angle), intent: { kind: "hold" } };
  });
  let tick = 0;

  return {
    get tick() {
      return tick;
    },
    heroes: () => heroes.map(({ id, team, hero, x, y }) => ({ id, team, hero, x, y })),
    observe(team) {
      const allies = heroes.filter((h) => h.team === team);
      const seen = (h: MutableHero) => allies.some((a) => Math.hypot(a.x - h.x, a.y - h.y) <= HERO_VISION);
      return {
        tick,
        team,
        allies: allies.map(({ id, hero, x, y }) => ({ id, hero, x, y })),
        enemies: heroes.filter((h) => h.team !== team && seen(h)).map(({ id, hero, x, y }) => ({ id, hero, x, y })),
      };
    },
    setIntents(team, intents) {
      const refused: RefusedIntent[] = [];
      for (const [heroId, intent] of Object.entries(intents)) {
        const hero = heroes.find((h) => h.id === heroId);
        if (!hero) {
          refused.push({ heroId, reason: `${heroId} is not a Hero in this Match` });
          continue;
        }
        if (hero.team !== team) {
          refused.push({ heroId, reason: `${heroId} is not on ${team}'s Team` });
          continue;
        }
        hero.intent = intent;
      }
      return refused;
    },
    step() {
      for (const hero of heroes) move(hero);
      tick++;
    },
  };
}

function move(hero: MutableHero): void {
  if (hero.intent.kind !== "move") return;
  const { to } = hero.intent;
  const dx = to.x - hero.x;
  const dy = to.y - hero.y;
  const distance = Math.hypot(dx, dy);
  const stride = HEROES[hero.hero].speed / TICKS_PER_SECOND;
  if (distance <= stride) {
    hero.x = to.x;
    hero.y = to.y;
  } else {
    hero.x += (dx / distance) * stride;
    hero.y += (dy / distance) * stride;
  }
}
