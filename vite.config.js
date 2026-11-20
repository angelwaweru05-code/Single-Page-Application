import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves project sites from a subpath
  // (e.g. /Single-Page-Application/), so assets must use relative URLs.
  base: "./",
  plugins: [react()],
});
