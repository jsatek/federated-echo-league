// Usage: pnpm build:pages
// Builds everything the static host serves into dist-pages/ (ADR-0001):
//   dist-pages/index.html        the Replay list (site)
//   dist-pages/viewer/           the viewer
//   dist-pages/replays/          Replay files + index.json

import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";
import { resolve } from "node:path";

const out = resolve("dist-pages");
const run = (command: string, args: string[]) => execFileSync(command, args, { stdio: "inherit", shell: process.platform === "win32" });

rmSync(out, { recursive: true, force: true });
run("pnpm", ["--filter", "@fel/site", "exec", "vite", "build", "--outDir", out]);
run("pnpm", ["--filter", "@fel/viewer", "exec", "vite", "build", "--outDir", resolve(out, "viewer")]);
run("node", ["packages/runner/src/publish-cli.ts", resolve(out, "replays")]);
console.log(`\nStatic site ready in ${out}`);
