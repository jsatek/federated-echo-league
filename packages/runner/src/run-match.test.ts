import { decodeReplay, encodeReplay } from "@fel/replay";
import { expect, test } from "vitest";
import { runMatch } from "./index.ts";

const replayBytes = (seed: number) => encodeReplay(runMatch({ seed }));

test("the same Seed produces a byte-identical Replay", async () => {
  expect(await replayBytes(7)).toEqual(await replayBytes(7));
});

test("a different Seed produces a different Replay", async () => {
  expect(await replayBytes(7)).not.toEqual(await replayBytes(8));
});

test("both Heroes walk from their bases to the middle of the Lane", async () => {
  const replay = await decodeReplay(await replayBytes(7));
  const middle = replay.map.width / 2;
  for (const unit of replay.units) {
    const { x } = replay.tracks[unit.id]!;
    const base = replay.map.bases[unit.team].x;
    expect(Math.abs(x[0]! - base)).toBeLessThanOrEqual(replay.map.baseRadius);
    expect(Math.abs(x.at(-1)! - middle)).toBeLessThanOrEqual(250);
  }
});
