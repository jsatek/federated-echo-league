// The Replay list page: reads replays/index.json and links each Replay into the viewer.

import type { ReplayIndex } from "@fel/replay";
import { toReplayLink } from "./replay-link.ts";

const list = document.getElementById("replays")!;

try {
  const response = await fetch("replays/index.json");
  if (!response.ok) throw new Error(`Couldn't load the Replay list (HTTP ${response.status}).`);
  const index = (await response.json()) as ReplayIndex;
  list.replaceChildren(
    ...index.replays.map((listing) => {
      const { href, title, detail } = toReplayLink(listing);
      const li = document.createElement("li");
      const a = Object.assign(document.createElement("a"), { className: "replay", href });
      a.append(span("title", title), span("detail", detail));
      li.append(a);
      return li;
    }),
  );
} catch (error) {
  list.replaceChildren(span("detail", error instanceof Error ? error.message : String(error)));
  list.id = "error";
}

function span(className: string, text: string): HTMLSpanElement {
  return Object.assign(document.createElement("span"), { className, textContent: text });
}
