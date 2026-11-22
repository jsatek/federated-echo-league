// ADR-0004: all randomness comes from seeded generators, never Math.random.

export interface Rng {
  /** A number in [0, 1). */
  next(): number;
}

/**
 * One stream of randomness for one consumer, e.g. "sim" or "ai-blue" (ADR-0017).
 * Streams from the same Seed are independent, and no Seed's stream repeats another's.
 * mulberry32: small, fast and identical on every machine.
 */
export function createRng(seed: number, stream: string): Rng {
  let state = mix(seed, stream);
  return {
    next() {
      state = (state + 0x6d2b79f5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
  };
}

/** Hashes the Seed and stream name together (FNV-1a over both, then a final avalanche). */
function mix(seed: number, stream: string): number {
  let h = 0x811c9dc5;
  const feed = (byte: number) => {
    h = Math.imul(h ^ byte, 0x01000193);
  };
  for (let i = 0; i < 4; i++) feed((seed >>> (8 * i)) & 0xff);
  for (let i = 0; i < stream.length; i++) feed(stream.charCodeAt(i) & 0xff);
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  return h >>> 0;
}
