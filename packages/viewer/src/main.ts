// The viewer: loads one Replay file and plays it back (ADR-0001). It never runs the sim.
// Pick a Replay with ?replay=<file>; the default is the one `pnpm match` writes for Seed 1.

import { decodeReplay } from "@fel/replay";
import { playReplay } from "./player.ts";

const status = document.getElementById("status")!;
const stage = document.getElementById("stage")!;
const file = new URLSearchParams(location.search).get("replay") ?? "seed-1.replay.json.gz";

try {
  const response = await fetch(file);
  if (!response.ok) throw new Error(`Couldn't load ${file} (HTTP ${response.status}).`);
  const replay = await decodeReplay(new Uint8Array(await response.arrayBuffer()));
  await playReplay(replay, stage, (text) => (status.textContent = text));
} catch (error) {
  status.id = "error";
  status.textContent = `${file}: ${error instanceof Error ? error.message : String(error)}`;
}
