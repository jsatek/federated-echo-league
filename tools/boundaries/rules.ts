// ADR-0006: viewer and site may depend only on replay and league;
// sim and ai meet only through contract, never each other.
// ADR-0016: runner sits on top; it may use anything, nothing may use it.

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

/** Packages that may reach only the listed packages, directly or indirectly. */
const BROWSER_SAFE = ["replay", "league"];
const ONLY_ALLOWED: Record<string, readonly string[]> = {
  viewer: BROWSER_SAFE,
  site: BROWSER_SAFE,
};

/** Packages that must never reach the listed packages, directly or indirectly. */
const FORBIDDEN: Record<string, readonly string[]> = {
  sim: ["ai"],
  ai: ["sim"],
};

/** Top-level packages: they may depend on others, but nothing may depend on them. */
const TOP_LEVEL = ["runner"];

function isAllowed(from: string, to: string): boolean {
  if (TOP_LEVEL.includes(to)) return false;
  const only = ONLY_ALLOWED[from];
  if (only !== undefined) return only.includes(to);
  return !(FORBIDDEN[from] ?? []).includes(to);
}

export function findViolations(packages: WorkspacePackage[]): Violation[] {
  const depsOf = new Map(packages.map((p) => [p.name, p.dependsOn]));
  const violations: Violation[] = [];
  for (const pkg of packages) {
    for (const [reached, chain] of shortestChains(pkg.name, depsOf)) {
      if (!isAllowed(pkg.name, reached)) {
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
