import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Studio loads the app's pages (setup + elements) in iframes from this origin.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // @hygraph/app-sdk does `import zoid from "@graphcms/zoid/lib/zoid.js"`. That file is a
      // webpack bundle flagged __esModule with no default export, so Vite's interop yields
      // `undefined` and the SDK fails with "Cannot read properties of undefined (reading
      // 'create')" (Studio: "Could not connect … timed out"). The package entry sets
      // `module.exports.default = module.exports`, so point the import there instead.
      { find: /^@graphcms\/zoid\/lib\/zoid\.js$/, replacement: "@graphcms/zoid" },
    ],
  },
  server: { port: 5174, strictPort: true },
});
