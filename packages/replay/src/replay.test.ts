import { expect, test } from "vitest";
import { decodeReplay, encodeReplay, type Replay } from "./index.ts";

const replay: Replay = {
  match: { seed: 7, ticksPerSecond: 20, sampleEveryTicks: 2, durationTicks: 4 },
  map: { width: 3600, height: 500, laneY: 250, bases: { blue: { x: 60, y: 250 }, red: { x: 3540, y: 250 } } },
  units: [
    { id: "blue-warden", team: "blue", hero: "warden", heroName: "Warden", player: "Kestrel", radius: 28 },
  ],
  tracks: { "blue-warden": { x: [100.4, 117.6, 134.9], y: [250, 250.5, 249.2] } },
};

test("a Replay survives saving and loading, with positions rounded to whole map units", async () => {
  const loaded = await decodeReplay(await encodeReplay(replay));
  expect(loaded).toEqual({
    ...replay,
    tracks: { "blue-warden": { x: [100, 118, 135], y: [250, 251, 249] } },
  });
});

async function gunzipJson(bytes: Uint8Array): Promise<Record<string, unknown>> {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text()) as Record<string, unknown>;
}

async function gzipJson(value: unknown): Promise<Uint8Array> {
  const stream = new Blob([JSON.stringify(value)]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

test("the file is gzipped JSON with a format version and delta-encoded Tracks", async () => {
  const file = await gunzipJson(await encodeReplay(replay));
  expect(file).toMatchObject({ format: "fel-replay", version: 1 });
  expect(file["tracks"]).toEqual({ "blue-warden": { x: [100, 18, 17], y: [250, 1, -2] } });
});

test("a Replay from an unknown format version is refused with a clear message", async () => {
  const future = await gzipJson({ ...replay, format: "fel-replay", version: 2 });
  await expect(decodeReplay(future)).rejects.toThrow(
    "This Replay uses format version 2, but this viewer only understands version 1. Update the viewer to watch it.",
  );
});

test("a Replay that a web host already unzipped still loads", async () => {
  const plain = new TextEncoder().encode(JSON.stringify(await gunzipJson(await encodeReplay(replay))));
  expect(await decodeReplay(plain)).toEqual(await decodeReplay(await encodeReplay(replay)));
});

test("a file that is not a Replay at all is refused with a clear message", async () => {
  const webPage = new TextEncoder().encode("<!doctype html><title>Not found</title>");
  await expect(decodeReplay(webPage)).rejects.toThrow("This file is not a Federated Echo League Replay.");
});
