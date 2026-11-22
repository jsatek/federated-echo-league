// ADR-0006: viewer and site never reach sim, ai or contract;
// sim and ai meet only through contract, never each other.

export interface WorkspacePackage {
  /** Short name, e.g. "sim" for @fel/sim. */
  name: string;
  /** Other workspace packages this one uses (declared or imported). */
  dependsOn: string[];
}

export interface Violation {
  from: string;
  to: string;
  /** The dependency chain that breaks the rule, from `from` to `to`. */
  via: string[];
}

const FORBIDDEN: Record<string, readonly string[]> = {
  viewer: ["sim", "ai", "contract"],
  site: ["sim", "ai", "contract"],
  sim: ["ai"],
  ai: ["sim"],
};

export function findViolations(packages: WorkspacePackage[]): Violation[] {
  const depsOf = new Map(packages.map((p) => [p.name, p.dependsOn]));
  const violations: Violation[] = [];
  for (const pkg of packages) {
    const forbidden = FORBIDDEN[pkg.name] ?? [];
    for (const [reached, chain] of shortestChains(pkg.name, depsOf)) {
      if (forbidden.includes(reached)) {
        violations.push({ from: pkg.name, to: reached, via: chain });
      }
    }
  }
  return violations;
}

/** Breadth-first walk: every package reachable from `start`, with the shortest chain to it. */
function shortestChains(start: string, depsOf: Map<string, string[]>): Map<string, string[]> {
  const chains = new Map<string, string[]>();
  const queue: string[][] = [[start]];
  const seen = new Set([start]);
  for (let chain = queue.shift(); chain; chain = queue.shift()) {
    for (const dep of depsOf.get(chain.at(-1)!) ?? []) {
      if (seen.has(dep)) continue;
      seen.add(dep);
      const next = [...chain, dep];
      chains.set(dep, next);
      queue.push(next);
    }
  }
  return chains;
}
