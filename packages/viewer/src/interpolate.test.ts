import { expect, test } from "vitest";
import { positionAt } from "./interpolate.ts";

// Samples at 10 per second: t = 0 s, 0.1 s, 0.2 s.
const track = { x: [100, 120, 120], y: [250, 260, 250] };

test("between two samples, a Hero is drawn proportionally between them", () => {
  expect(positionAt(track, 10, 0.025)).toEqual({ x: 105, y: 252.5 });
  expect(positionAt(track, 10, 0.15)).toEqual({ x: 120, y: 255 });
});

test("on a sample, a Hero is drawn exactly there", () => {
  expect(positionAt(track, 10, 0.1)).toEqual({ x: 120, y: 260 });
});

test("before the first or after the last sample, a Hero stays at the end of the Track", () => {
  expect(positionAt(track, 10, -1)).toEqual({ x: 100, y: 250 });
  expect(positionAt(track, 10, 5)).toEqual({ x: 120, y: 250 });
});
