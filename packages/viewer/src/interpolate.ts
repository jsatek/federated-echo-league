import type { ReplayPoint, Track } from "@fel/replay";

/**
 * Where to draw a unit at `seconds` into the Match: a straight line between
 * the two Track samples either side, so 10 Hz samples look smooth at 60 fps.
 */
export function positionAt(track: Track, samplesPerSecond: number, seconds: number): ReplayPoint {
  const last = track.x.length - 1;
  const at = Math.min(Math.max(seconds * samplesPerSecond, 0), last);
  const i = Math.min(Math.floor(at), last - 1);
  if (i < 0) return { x: track.x[0]!, y: track.y[0]! };
  const f = at - i;
  return {
    x: track.x[i]! + (track.x[i + 1]! - track.x[i]!) * f,
    y: track.y[i]! + (track.y[i + 1]! - track.y[i]!) * f,
  };
}
