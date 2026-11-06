# Exercise browser

Start the API from `apps/api`, then run `npm run dev:web` from the repository
root. The web app uses `VITE_API_URL` (default `/api`). Vite proxies `/api`
to `http://127.0.0.1:3001`, so both localhost and 127.0.0.1 frontend addresses
work without cross-origin requests. For a separate deployed API, set
`VITE_API_URL` to its URL and configure its allowed frontend origin.

The library displays published CMS exercises, filters by published muscle-group
slugs, and pages through 12 results at a time. The content-language selector
requests English or Czech with English fallback; the interface labels remain
English. Exercise details are read from the API when opened.

The library distinguishes loading, request failure (with retry), and empty
results. The current CMS test fixtures are drafts, so the live library remains
empty until reviewed content is published. No publishing is triggered by browsing.

The previous 3D placeholder is no longer rendered. The existing muscle-map
component is retained for the later anatomy GLB integration; the browser works
without WebGL or image assets.

Run `npm test --workspace=@lift-lab/web` for browser component tests using mocked
API calls. Use `npm run build` for the production bundle.
