import type { ReplayListing } from "@fel/replay";
import { expect, test } from "vitest";
import { toReplayLink } from "./replay-link.ts";

const listing: ReplayListing = {
  file: "seed-3.replay.json.gz",
  seed: 3,
  durationSeconds: 90,
  heroes: [
    { team: "blue", heroName: "Warden", player: "Kestrel" },
    { team: "red", heroName: "Lumen", player: "Magpie" },
  ],
};

test("a Replay listing links into the viewer, pointing back at the replays folder", () => {
  expect(toReplayLink(listing)).toEqual({
    href: "viewer/?replay=../replays/seed-3.replay.json.gz",
    title: "Kestrel (Warden) vs Magpie (Lumen)",
    detail: "Seed 3 · 1:30",
  });
});
