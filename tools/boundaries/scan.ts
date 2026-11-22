// Reads a workspace from disk into the shape the rules understand.
// A package "depends on" another if its package.json lists it or any of its
// source files import it (by @fel/ name or by a relative path into it).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import type { WorkspacePackage } from "./rules.ts";

const SCOPE = "@fel/";
const SOURCE_FILE = /\.(ts|tsx|mts|cts|js|jsx|mjs|cjs)$/;
const SKIP_DIRS = new Set(["node_modules", "dist"]);
// from "x" | import "x" | import("x") | require("x") | export ... from "x"
const SPECIFIER = /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"']+)["']/g;

export function scanWorkspace(root: string): WorkspacePackage[] {
  const packagesDir = join(root, "packages");
  const dirs = readdirSync(packagesDir).filter((d) =>
    existsSync(join(packagesDir, d, "package.json")),
  );
  const nameOfDir = new Map(dirs.map((d) => [d, readName(join(packagesDir, d))]));

  return dirs.map((dir) => {
    const pkgDir = join(packagesDir, dir);
    const name = nameOfDir.get(dir)!;
    const deps = new Set<string>(declaredDeps(pkgDir));
    for (const file of sourceFiles(pkgDir)) {
      for (const spec of specifiers(readFileSync(file, "utf8"))) {
        const target = spec.startsWith(".")
          ? packageDirOf(resolve(dirname(file), spec), packagesDir)
          : undefined;
        const dep = target !== undefined ? nameOfDir.get(target) : shortName(spec);
        if (dep !== undefined && dep !== name) deps.add(dep);
      }
    }
    return { name, dependsOn: [...deps] };
  });
}

function readName(pkgDir: string): string {
  const { name } = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")) as {
    name: string;
  };
  return shortName(name) ?? name;
}

function declaredDeps(pkgDir: string): string[] {
  const json = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8")) as Record<
    string,
    Record<string, string> | undefined
  >;
  return ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]
    .flatMap((field) => Object.keys(json[field] ?? {}))
    .map(shortName)
    .filter((n): n is string => n !== undefined);
}

/** "@fel/sim" or "@fel/sim/deep/path" -> "sim"; anything else -> undefined. */
function shortName(spec: string): string | undefined {
  if (!spec.startsWith(SCOPE)) return undefined;
  return spec.slice(SCOPE.length).split("/")[0];
}

/** Which packages/<dir> an absolute path falls inside, if any. */
function packageDirOf(path: string, packagesDir: string): string | undefined {
  const rel = relative(packagesDir, path);
  if (rel.startsWith("..") || rel === "") return undefined;
  return rel.split(sep)[0];
}

function* sourceFiles(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* sourceFiles(path);
    else if (SOURCE_FILE.test(entry)) yield path;
  }
}

function specifiers(source: string): string[] {
  return [...source.matchAll(SPECIFIER)].map((m) => m[1]!);
}
