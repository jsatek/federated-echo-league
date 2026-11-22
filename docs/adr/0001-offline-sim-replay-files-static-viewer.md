# Offline sim writes replay files; a static browser viewer plays them

Matches are simulated ahead of time by a TypeScript sim that writes Replay files; a PixiJS viewer in the browser only plays those files back, and everything is served from static hosting. We chose this over a live server-side sim so the league can run itself cheaply (no running server, no live compute per viewer), VODs work on a phone, and history is just a pile of files that never changes.

## Consequences

- The viewer never decides outcomes. Anything a viewer shows (including stats) must be in, or derivable from, the replay and league data files.
- Replay size and phone decode cost matter, because every byte is downloaded by every viewer.
