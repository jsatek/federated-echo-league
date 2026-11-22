import { expect, test } from "vitest";
import { toListItem } from "./listing.ts";

const listing = {
  file: "seed-3.replay.json.gz",
  seed: 3,
  durationSeconds: 90,
  heroes: [
    { team: "blue", heroName: "Warden", player: "Kestrel" },
    { team: "red", heroName: "Lumen", player: "Magpie" },
  ],
} as const;

test("a Replay listing links into the viewer, pointing back at the replays folder", () => {
  expect(toListItem({ ...listing, heroes: [...listing.heroes] })).toEqual({
    href: "viewer/?replay=../replays/seed-3.replay.json.gz",
    title: "Kestrel (Warden) vs Magpie (Lumen)",
    detail: "Seed 3 · 1:30",
  });
});
