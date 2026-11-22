// The Replay file format (ADR-0008): versioned, gzipped JSON.
// Used by runner (to write) and viewer (to read), so it must work in Node and browsers.

export const REPLAY_FORMAT = "fel-replay";
export const REPLAY_FORMAT_VERSION = 1;

export type TeamId = "blue" | "red";

export interface ReplayPoint {
  x: number;
  y: number;
}

/** One Match as the viewer needs it. Positions are in map units. */
export interface Replay {
  match: {
    seed: number;
    ticksPerSecond: number;
    /** Track samples are taken every this many Ticks (2 = 10 Hz). */
    sampleEveryTicks: number;
    durationTicks: number;
  };
  map: {
    width: number;
    height: number;
    laneY: number;
    bases: Record<TeamId, ReplayPoint>;
    baseRadius: number;
  };
  units: ReplayHero[];
  /** Per unit id: positions at every sample, starting at Tick 0. */
  tracks: Record<string, Track>;
}

export interface ReplayHero {
  id: string;
  team: TeamId;
  hero: string;
  heroName: string;
  player: string;
  radius: number;
}

export interface Track {
  x: number[];
  y: number[];
}

/** The JSON inside the file. Track values are whole map units, delta-encoded. */
interface ReplayFile extends Replay {
  format: typeof REPLAY_FORMAT;
  version: number;
}

/** The list of published Replays (`index.json` beside the Replay files). */
export interface ReplayIndex {
  replays: ReplayListing[];
}

export interface ReplayListing {
  /** File name, relative to the index. */
  file: string;
  seed: number;
  durationSeconds: number;
  heroes: Pick<ReplayHero, "team" | "heroName" | "player">[];
}

export async function encodeReplay(replay: Replay): Promise<Uint8Array> {
  const file: ReplayFile = {
    format: REPLAY_FORMAT,
    version: REPLAY_FORMAT_VERSION,
    ...replay,
    tracks: mapTracks(replay.tracks, (values) => deltas(values.map(Math.round))),
  };
  return pipe(new TextEncoder().encode(JSON.stringify(file)), new CompressionStream("gzip"));
}

export async function decodeReplay(bytes: Uint8Array): Promise<Replay> {
  const notAReplay = new Error("This file is not a Federated Echo League Replay.");
  let file: ReplayFile;
  try {
    file = JSON.parse(new TextDecoder().decode(await gunzip(bytes))) as ReplayFile;
  } catch {
    throw notAReplay;
  }
  if (file?.format !== REPLAY_FORMAT) throw notAReplay;
  if (file.version !== REPLAY_FORMAT_VERSION) {
    throw new Error(
      `This Replay uses format version ${file.version}, but this viewer only understands version ${REPLAY_FORMAT_VERSION}. Update the viewer to watch it.`,
    );
  }
  const { format: _format, version: _version, tracks, ...rest } = file;
  return { ...rest, tracks: mapTracks(tracks, undoDeltas) };
}

function mapTracks(tracks: Record<string, Track>, f: (values: number[]) => number[]): Record<string, Track> {
  return Object.fromEntries(Object.entries(tracks).map(([id, t]) => [id, { x: f(t.x), y: f(t.y) }]));
}

function deltas(values: number[]): number[] {
  return values.map((v, i) => (i === 0 ? v : v - values[i - 1]!));
}

function undoDeltas(values: number[]): number[] {
  let sum = 0;
  return values.map((d) => (sum += d));
}

/** Unzips gzip data; passes through data that is already plain (gzip starts with 0x1f 0x8b). */
async function gunzip(bytes: Uint8Array): Promise<Uint8Array> {
  const isGzip = bytes[0] === 0x1f && bytes[1] === 0x8b;
  return isGzip ? pipe(bytes, new DecompressionStream("gzip")) : bytes;
}

async function pipe(bytes: Uint8Array, transform: GenericTransformStream): Promise<Uint8Array> {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(transform);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
