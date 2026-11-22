// The viewer: loads one Replay file and plays it back (ADR-0001). It never runs the sim.
// Pick a Replay with ?replay=<path>, relative to this page.

import { decodeReplay } from "@fel/replay";
import { playReplay } from "./player.ts";

const status = document.getElementById("status")!;
const stage = document.getElementById("stage")!;
const file = new URLSearchParams(location.search).get("replay");

if (file === null) {
  status.textContent = "No Replay chosen. Pick one from the list, or add ?replay=<file> to the address.";
} else {
  await load(file);
}

async function load(file: string): Promise<void> {
  try {
    const response = await fetch(file);
    // Dev servers answer a missing file with the app's own web page instead of a 404.
    const isWebPage = response.headers.get("content-type")?.includes("text/html") ?? false;
    if (!response.ok || isWebPage) throw new Error("Couldn't find this Replay file.");
    const replay = await decodeReplay(new Uint8Array(await response.arrayBuffer()));
    await playReplay(replay, stage, (text) => (status.textContent = text));
  } catch (error) {
    status.id = "error";
    status.textContent = `${file}: ${error instanceof Error ? error.message : String(error)}`;
  }
}
