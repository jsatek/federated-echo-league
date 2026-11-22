import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decodeReplay, type ReplayIndex } from "@fel/replay";
import { expect, test } from "vitest";
import { publishReplays } from "./publish-replays.ts";

test("publishing writes each Replay plus an index.json that lists them all", async () => {
  const outDir = mkdtempSync(join(tmpdir(), "fel-replays-"));
  await publishReplays({ seeds: [3, 4], durationSeconds: 10, outDir });

  const index = JSON.parse(readFileSync(join(outDir, "index.json"), "utf8")) as ReplayIndex;
  expect(index).toEqual({
    replays: [
      {
        file: "seed-3.replay.json.gz",
        seed: 3,
        durationSeconds: 10,
        heroes: [
          { team: "blue", heroName: "Warden", player: "Kestrel" },
          { team: "red", heroName: "Lumen", player: "Magpie" },
        ],
      },
      expect.objectContaining({ file: "seed-4.replay.json.gz", seed: 4 }),
    ],
  });
  for (const { file, seed } of index.replays) {
    const replay = await decodeReplay(readFileSync(join(outDir, file)));
    expect(replay.match.seed).toBe(seed);
  }
});
