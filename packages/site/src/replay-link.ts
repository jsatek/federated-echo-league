import type { ReplayListing } from "@fel/replay";

/** Where things sit in the published folder, relative to the site's page. */
const VIEWER_PATH = "viewer/";
/** Relative to the viewer's page. */
const REPLAYS_FROM_VIEWER = "../replays/";

export interface ReplayLink {
  href: string;
  title: string;
  detail: string;
}

export function toReplayLink(listing: ReplayListing): ReplayLink {
  const [blue, red] = [listing.heroes.filter((h) => h.team === "blue"), listing.heroes.filter((h) => h.team === "red")];
  const names = (heroes: ReplayListing["heroes"]) => heroes.map((h) => `${h.player} (${h.heroName})`).join(", ");
  const minutes = Math.floor(listing.durationSeconds / 60);
  const seconds = String(listing.durationSeconds % 60).padStart(2, "0");
  return {
    href: `${VIEWER_PATH}?replay=${encodeURI(REPLAYS_FROM_VIEWER + listing.file)}`,
    title: `${names(blue)} vs ${names(red)}`,
    detail: `Seed ${listing.seed} · ${minutes}:${seconds}`,
  };
}
