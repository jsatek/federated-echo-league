// Usage: node packages/runner/src/publish-cli.ts <out-dir>
// Plays the Matches the site publishes and writes them with an index.json.

import { resolve } from "node:path";
import { publishReplays } from "./publish-replays.ts";

/** Until the league schedules Matches, the site shows these Seeds. */
const PUBLISHED_SEEDS = [1, 2, 3, 4, 5];
const DURATION_SECONDS = 60;

const outDir = process.argv[2];
if (!outDir) throw new Error("Usage: publish-cli.ts <out-dir>");
const index = await publishReplays({ seeds: PUBLISHED_SEEDS, durationSeconds: DURATION_SECONDS, outDir: resolve(outDir) });
console.log(`Wrote ${index.replays.length} Replays and index.json to ${outDir}`);
