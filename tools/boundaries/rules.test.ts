import { expect, test } from "vitest";
import { findViolations } from "./rules.ts";

test("a workspace that follows ADR-0006 has no violations", () => {
  expect(
    findViolations([
      { name: "contract", dependsOn: [] },
      { name: "sim", dependsOn: ["contract", "replay"] },
      { name: "ai", dependsOn: ["contract"] },
      { name: "replay", dependsOn: [] },
      { name: "league", dependsOn: ["replay"] },
      { name: "viewer", dependsOn: ["replay", "league"] },
      { name: "site", dependsOn: ["replay", "league"] },
    ]),
  ).toEqual([]);
});

test("viewer importing sim directly is a violation", () => {
  expect(
    findViolations([
      { name: "sim", dependsOn: [] },
      { name: "viewer", dependsOn: ["sim"] },
    ]),
  ).toEqual([{ from: "viewer", to: "sim", via: ["viewer", "sim"] }]);
});

test("viewer reaching sim through league is a violation, with the chain shown", () => {
  expect(
    findViolations([
      { name: "sim", dependsOn: [] },
      { name: "league", dependsOn: ["sim"] },
      { name: "viewer", dependsOn: ["league"] },
    ]),
  ).toEqual([{ from: "viewer", to: "sim", via: ["viewer", "league", "sim"] }]);
});

test("sim and ai may not depend on each other in either direction", () => {
  expect(
    findViolations([
      { name: "sim", dependsOn: ["ai"] },
      { name: "ai", dependsOn: ["sim"] },
    ]),
  ).toEqual([
    { from: "sim", to: "ai", via: ["sim", "ai"] },
    { from: "ai", to: "sim", via: ["ai", "sim"] },
  ]);
});
