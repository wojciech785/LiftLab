import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // three.js lives in the lazily loaded MuscleMap3D chunk (~900 kB, ~245 kB gzip);
  // the main bundle stays ~250 kB. Raise the warning threshold for that one chunk.
  build: { chunkSizeWarningLimit: 1000 },
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://127.0.0.1:3001", changeOrigin: true } }
  }
});
