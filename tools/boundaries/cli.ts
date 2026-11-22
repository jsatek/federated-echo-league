// Usage: node tools/boundaries/cli.ts [workspace-root]
// Exits 1 and lists every ADR-0006 package-boundary violation found.

import { resolve } from "node:path";
import { findViolations } from "./rules.ts";
import { scanWorkspace } from "./scan.ts";

const root = resolve(process.argv[2] ?? ".");
const violations = findViolations(scanWorkspace(root));

if (violations.length === 0) {
  console.log("Package boundaries OK (ADR-0006).");
} else {
  console.error("Package boundary violations (see docs/adr/0006-package-boundaries.md):");
  for (const v of violations) {
    console.error(`  ${v.from} -> ${v.to}   (via ${v.via.join(" -> ")})`);
  }
  process.exitCode = 1;
}
