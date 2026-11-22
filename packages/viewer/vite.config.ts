import { defineConfig } from "vite";

export default defineConfig({
  // During development, Replays written by `pnpm match` are served from the repo's replays/ folder.
  publicDir: "../../replays",
  build: { outDir: "dist/web", emptyOutDir: true },
});
