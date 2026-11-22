import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

const cli = join(dirname(fileURLToPath(import.meta.url)), "cli.ts");

/** Writes a throwaway workspace: { "packages/viewer/src/index.ts": "..." } */
function fakeWorkspace(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), "fel-boundaries-"));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

function pkg(name: string, deps: Record<string, string> = {}): string {
  return JSON.stringify({ name: `@fel/${name}`, dependencies: deps });
}

function runCheck(root: string) {
  const result = spawnSync(process.execPath, [cli, root], { encoding: "utf8" });
  return { code: result.status, output: result.stdout + result.stderr };
}

test("fails when viewer source imports sim", () => {
  const root = fakeWorkspace({
    "packages/sim/package.json": pkg("sim"),
    "packages/sim/src/index.ts": "export const x = 1;\n",
    "packages/viewer/package.json": pkg("viewer"),
    "packages/viewer/src/index.ts": 'import { x } from "@fel/sim";\nexport const y = x;\n',
  });
  const { code, output } = runCheck(root);
  expect(code).toBe(1);
  expect(output).toContain("viewer -> sim");
});

test("fails when site reaches into contract by relative path", () => {
  const root = fakeWorkspace({
    "packages/contract/package.json": pkg("contract"),
    "packages/contract/src/index.ts": "export type Intent = {};\n",
    "packages/site/package.json": pkg("site"),
    "packages/site/src/pages/home.ts":
      'import type { Intent } from "../../../contract/src/index.ts";\nexport type I = Intent;\n',
  });
  const { code, output } = runCheck(root);
  expect(code).toBe(1);
  expect(output).toContain("site -> contract");
});

test("fails when ai declares sim as a dependency in package.json", () => {
  const root = fakeWorkspace({
    "packages/sim/package.json": pkg("sim"),
    "packages/ai/package.json": pkg("ai", { "@fel/sim": "workspace:*" }),
  });
  const { code, output } = runCheck(root);
  expect(code).toBe(1);
  expect(output).toContain("ai -> sim");
});

test("passes when packages meet only through allowed edges", () => {
  const root = fakeWorkspace({
    "packages/contract/package.json": pkg("contract"),
    "packages/ai/package.json": pkg("ai", { "@fel/contract": "workspace:*" }),
    "packages/ai/src/index.ts": 'import type { X } from "@fel/contract";\n',
    "packages/replay/package.json": pkg("replay"),
    "packages/viewer/package.json": pkg("viewer"),
    "packages/viewer/src/index.ts": 'export * from "@fel/replay";\n',
  });
  expect(runCheck(root).code).toBe(0);
});
