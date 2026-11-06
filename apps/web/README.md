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
results. The original test fixtures remain drafts; the published starter library
is documented in `docs/starter-content.md`. No publishing is triggered by browsing.

The previous 3D placeholder is no longer rendered. The existing muscle-map
component is retained for the later anatomy GLB integration; the browser works
without WebGL or image assets.

Run `npm test --workspace=@lift-lab/web` for browser component tests using mocked
API calls. Use `npm run build` for the production bundle.

## Programmes and articles

Main navigation opens exercise, programme, and article lists. Hash URLs support
refresh and browser back/forward without extra hosting rewrite rules:

- `/#/programmes`
- `/#/programmes/bodyweight-movement-practice`
- `/#/articles/bodyweight-or-dumbbells`
- `/#/exercises/bodyweight-squat`

Programmes show ordered sessions, sets, repetitions, rest, and coaching notes.
Articles render all seven schema block types in editorial order. Related
exercise and programme links open their detail views. Content language applies
to all three libraries with English fallback; interface labels remain English.

Images are shown only when their URL, nonempty alt text, and rights/source
metadata are available. Otherwise a text placeholder appears. Rich-text embeds
are displayed as unavailable media; the dedicated image-gallery block handles
licensed images. Muscle-map blocks currently display explanatory copy and
muscle lists, pending the anatomy asset.
