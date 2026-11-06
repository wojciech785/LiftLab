# Lift Lab API

From `apps/api`, configure `.env` using `.env.example`, then run `npm run start:dev`.
The API listens on `http://localhost:3001/api` by default.

Exercise reads use `HYGRAPH_CONTENT_API_URL` and `HYGRAPH_CONTENT_API_TOKEN`.
The token needs Content API read permissions for Exercise, MuscleGroup, and
Equipment in the PUBLISHED stage and the requested locales. Keep this read
token separate from the management/mutation tokens.

- `GET /api/exercises` returns up to 30 published summaries.
- `GET /api/muscle-groups?locale=en` returns published muscle names and slugs
  for the frontend filter. It retrieves all pages from Hygraph.
- `GET /api/exercises?locale=cs&muscle=quadriceps&limit=10&offset=0` filters by a
  primary muscle slug. Czech reads fall back to English. Maximum limit is 100;
  offset is bounded at 10000. Lists are sorted by slug.
- `GET /api/exercises/:slug?locale=en` returns exercise detail, including plain
  text instructions, all primary muscles, and equipment. Missing or draft-only
  entries return 404.

Only `en` and `cs` locales are accepted. Invalid locale/pagination returns 400,
missing Hygraph configuration returns 503, and upstream failures return 502.
Stage selection is fixed to PUBLISHED. The MCP test fixtures are drafts and
will not appear until deliberately reviewed and published in Hygraph.

`GET /api/content-status` reports whether credentials are configured; it does
not perform an authenticated connectivity check.

Run `npm test --workspace=@lift-lab/api` from the repository root for focused
service/client tests. No content is created or published by those tests.

## Programmes and articles

- `GET /api/programmes?locale=cs&limit=13&offset=0` returns programme summaries.
- `GET /api/programmes/:slug?locale=cs` includes ordered sessions and exercise
  prescriptions, warm-ups, cool-downs, and editorial profile attribution.
- `GET /api/articles?locale=en&limit=13&offset=0` returns article summaries.
- `GET /api/articles/:slug?locale=en` includes a discriminated block list and
  related exercise/programme links.

All reads select PUBLISHED. The same locale and pagination bounds apply as for
exercises. Detail reads return 404 when absent. Nested collections are capped
at 100 entries each. Rich text is exposed as structured nodes, not HTML;
frontend rendering supports standard text formatting and safe links. Images
include alt text and rights/source metadata. New block types receive a visible
unsupported-block fallback until the renderer is extended.
