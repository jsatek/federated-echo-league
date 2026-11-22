// Usage: pnpm match --seed 7 [--seconds 30] [--out replays/seed-7.replay.json.gz]

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { parseArgs } from "node:util";
import { encodeReplay } from "@fel/replay";
import { replayFileName, runMatch } from "./index.ts";

const { values } = parseArgs({
  options: {
    seed: { type: "string", default: "1" },
    seconds: { type: "string", default: "30" },
    out: { type: "string" },
  },
});

const seed = Number(values.seed);
const durationSeconds = Number(values.seconds);
if (!Number.isInteger(seed) || seed < 0) throw new Error(`--seed must be a whole number, got "${values.seed}"`);
if (!Number.isInteger(durationSeconds) || durationSeconds <= 0) {
  throw new Error(`--seconds must be a positive whole number, got "${values.seconds}"`);
}

// pnpm runs scripts from the repo root, so relative paths land there.
const out = resolve(values.out ?? `replays/${replayFileName(seed)}`);
const bytes = await encodeReplay(runMatch({ seed, durationSeconds }));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, bytes);
console.log(`Seed ${seed}: ${durationSeconds} s Match written to ${out} (${bytes.length} bytes)`);
