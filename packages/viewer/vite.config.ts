import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  // Relative asset paths, so the viewer works from any folder (it is published under viewer/).
  base: "./",
  // During development only, Replays written by `pnpm match` are served from the repo's replays/ folder.
  publicDir: command === "serve" ? "../../replays" : false,
  build: { outDir: "dist/web", emptyOutDir: true },
}));
