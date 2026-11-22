import type { Replay } from "@fel/replay";
import { Application, Container, Graphics, Text } from "pixi.js";
import { positionAt } from "./interpolate.ts";

/** How much of the Lane is on screen, in map units. Bases stay off-screen (ADR-0014). */
const VIEW_WIDTH = 1800;
const LANE_WIDTH = 300;
const TEAM_COLOURS = { blue: 0x4aa3ff, red: 0xff5d5d } as const;
/** Pause on the last frame before starting again. */
const LOOP_PAUSE_SECONDS = 2;

export async function playReplay(replay: Replay, host: HTMLElement, onStatus: (text: string) => void): Promise<void> {
  const { map, match } = replay;
  const app = new Application();
  await app.init({ background: 0x172019, antialias: true, resolution: devicePixelRatio, autoDensity: true });
  host.appendChild(app.canvas);

  const world = new Container();
  app.stage.addChild(world);
  world.addChild(drawLane(replay));

  const heroes = replay.units.map((unit) => {
    const body = new Graphics().circle(0, 0, unit.radius).fill(TEAM_COLOURS[unit.team]).stroke({ width: 4, color: 0x0f1218 });
    const label = new Text({ text: unit.player, style: { fill: 0xe6e9ef, fontSize: 12, fontFamily: "system-ui, sans-serif" } });
    label.anchor.set(0.5, 1);
    world.addChild(body);
    app.stage.addChild(label); // labels stay a readable size at any zoom
    return { unit, body, label };
  });

  const samplesPerSecond = match.ticksPerSecond / match.sampleEveryTicks;
  const durationSeconds = match.durationTicks / match.ticksPerSecond;
  let seconds = 0;

  app.ticker.add((ticker) => {
    // Fit the view to the page width; keep the Lane middle centred.
    const width = host.clientWidth;
    const scale = width / VIEW_WIDTH;
    const height = Math.round(map.height * scale);
    if (app.screen.width !== width || app.screen.height !== height) app.renderer.resize(width, height);
    world.scale.set(scale);
    world.position.set(width / 2 - (map.width / 2) * scale, 0);

    seconds += ticker.deltaMS / 1000;
    if (seconds > durationSeconds + LOOP_PAUSE_SECONDS) seconds = 0;
    const shown = Math.min(seconds, durationSeconds);

    for (const { unit, body, label } of heroes) {
      const p = positionAt(replay.tracks[unit.id]!, samplesPerSecond, shown);
      body.position.set(p.x, p.y);
      label.position.set(world.position.x + p.x * scale, (p.y - unit.radius) * scale - 4);
    }
    onStatus(`Seed ${match.seed} · ${formatClock(shown)} / ${formatClock(durationSeconds)}`);
  });
}

function drawLane({ map }: Replay): Graphics {
  const g = new Graphics();
  g.rect(0, map.laneY - LANE_WIDTH / 2, map.width, LANE_WIDTH).fill(0x3a3f35);
  g.moveTo(map.width / 2, map.laneY - LANE_WIDTH / 2).lineTo(map.width / 2, map.laneY + LANE_WIDTH / 2).stroke({ width: 6, color: 0x555b4f });
  for (const team of ["blue", "red"] as const) {
    const base = map.bases[team];
    g.circle(base.x, base.y, 160).fill({ color: TEAM_COLOURS[team], alpha: 0.25 });
  }
  return g;
}

function formatClock(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
