// Plays a set of Matches and writes them, with an index.json, as the site will serve them.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { encodeReplay, type ReplayIndex } from "@fel/replay";
import { replayFileName, runMatch } from "./index.ts";

export interface PublishOptions {
  seeds: readonly number[];
  durationSeconds: number;
  outDir: string;
}

export async function publishReplays({ seeds, durationSeconds, outDir }: PublishOptions): Promise<ReplayIndex> {
  mkdirSync(outDir, { recursive: true });
  const index: ReplayIndex = { replays: [] };
  for (const seed of seeds) {
    const replay = runMatch({ seed, durationSeconds });
    const file = replayFileName(seed);
    writeFileSync(join(outDir, file), await encodeReplay(replay));
    index.replays.push({
      file,
      seed,
      durationSeconds,
      heroes: replay.units.map(({ team, heroName, player }) => ({ team, heroName, player })),
    });
  }
  writeFileSync(join(outDir, "index.json"), JSON.stringify(index, null, 2) + "\n");
  return index;
}
