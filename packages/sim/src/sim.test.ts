import { HEROES, TICKS_PER_SECOND } from "@fel/contract";
import { expect, test } from "vitest";
import { createSim } from "./index.ts";

const duel = {
  seed: 1,
  heroes: [
    { id: "blue-warden", team: "blue", hero: "warden" },
    { id: "red-lumen", team: "red", hero: "lumen" },
  ],
} as const;

function heroAt(sim: ReturnType<typeof createSim>, id: string) {
  const hero = sim.heroes().find((h) => h.id === id);
  if (!hero) throw new Error(`no hero ${id}`);
  return hero;
}

test("a Hero walks at its own speed and stops on its target", () => {
  const sim = createSim(duel);
  const start = heroAt(sim, "blue-warden");
  const target = { x: start.x + 1000, y: start.y };
  sim.setIntents("blue", { "blue-warden": { kind: "move", to: target } });

  for (let t = 0; t < TICKS_PER_SECOND; t++) sim.step();
  expect(heroAt(sim, "blue-warden").x).toBeCloseTo(start.x + HEROES.warden.speed, 6);

  for (let t = 0; t < 5 * TICKS_PER_SECOND; t++) sim.step();
  expect(heroAt(sim, "blue-warden")).toMatchObject(target);
});

test("the sim refuses Intents for Heroes that are not yours", () => {
  const sim = createSim(duel);
  const before = heroAt(sim, "red-lumen");

  const refused = sim.setIntents("blue", {
    "red-lumen": { kind: "move", to: { x: 0, y: 0 } },
    "nobody": { kind: "hold" },
  });
  sim.step();

  expect(refused).toEqual([
    { heroId: "red-lumen", reason: "red-lumen is not on blue's Team" },
    { heroId: "nobody", reason: "nobody is not a Hero in this Match" },
  ]);
  expect(heroAt(sim, "red-lumen")).toEqual(before);
});

test("an Observation shows own Heroes, and enemies only inside the Team's Vision", () => {
  const sim = createSim(duel);
  const blue = heroAt(sim, "blue-warden");

  // At the start the bases are far apart: Blue cannot see Red.
  const atStart = sim.observe("blue");
  expect(atStart).toEqual({
    tick: 0,
    team: "blue",
    allies: [{ id: "blue-warden", hero: "warden", x: blue.x, y: blue.y }],
    enemies: [],
  });

  // Walk Red to 600 units from Blue (Vision is 700): now Blue sees Red.
  sim.setIntents("red", { "red-lumen": { kind: "move", to: { x: blue.x + 600, y: blue.y } } });
  for (let t = 0; t < 20 * 20; t++) sim.step();
  expect(sim.observe("blue").enemies).toEqual([
    { id: "red-lumen", hero: "lumen", x: blue.x + 600, y: blue.y },
  ]);
});
