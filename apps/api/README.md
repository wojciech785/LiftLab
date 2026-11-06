# Lift Lab API

From `apps/api`, configure `.env` using `.env.example`, then run `npm run start:dev`.
The API listens on `http://localhost:3001/api` by default.

Exercise reads use `HYGRAPH_CONTENT_API_URL` and `HYGRAPH_CONTENT_API_TOKEN`.
The token needs Content API read permissions for Exercise, MuscleGroup, and
Equipment in the PUBLISHED stage and the requested locales. Keep this read
token separate from the management/mutation tokens.

- `GET /api/exercises` returns up to 30 published summaries.
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
