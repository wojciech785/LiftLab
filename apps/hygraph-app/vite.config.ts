import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Studio loads the app's pages (setup + elements) in iframes from this origin.
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true },
});
