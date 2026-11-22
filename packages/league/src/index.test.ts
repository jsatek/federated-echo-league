import { expect, test } from "vitest";
import { packageName } from "./index.ts";

test("league package is wired into the workspace", () => {
  expect(packageName).toBe("@fel/league");
});
