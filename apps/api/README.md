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
- `GET /api/exercises/:slug?locale=en` returns exercise detail, including rich-text
  instructions (structured nodes: paragraphs, formatting, links), all primary muscles, equipment, and `commonMistakes`
  (localized list, empty when none). Missing or draft-only
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

## Saved workout requests

`POST /api/workout-intents` saves a draft in Hygraph and returns only
`{"accepted":true}` with HTTP 201. It does not publish, send an email, or generate
a workout plan. Configure `HYGRAPH_MUTATION_API_URL` and the dedicated
`HYGRAPH_MUTATION_API_TOKEN` in `apps/api/.env`; see the environment example for
permissions. No fallback to read, Management, or MCP tokens is used.

```json
{
  "goal": "general-fitness",
  "availableMinutes": 45,
  "experienceLevel": "beginner",
  "selectedMuscles": ["quadriceps"],
  "consent": true
}
```

Goal must match the five training goals; time is an integer from 15–180 minutes;
experience is beginner/intermediate/advanced. Select zero to three unique,
published muscle slugs. Optional contactEmail must be a valid email, at most
254 characters. Consent must be the boolean true, whether email is supplied or
not. Status is server-controlled and personal data/CMS IDs are not echoed.

The endpoint accepts JSON from WEB_ORIGIN; localhost and 127.0.0.1 are equivalent
for local development. Missing/foreign Origin is rejected with 403. This is a
cross-site browser check, not user authentication. A per-IP, in-memory throttle
allows five attempts per minute, including invalid payloads (429 afterward).
The API remains bound to loopback. A public/multi-instance deployment needs a
reviewed proxy configuration and shared rate-limit storage.

Missing write configuration returns 503; upstream failure returns a sanitized
502. No automatic write retry is made because a lost response can occur after
an entry has already been stored. Review saved requests in Hygraph and remove
them when no longer needed. Never publish them or enable public model reads.

Verification includes a real Nest HTTP pipeline with a mocked CMS writer.
On 2026-11-06 the configured dedicated token also passed an actual app-to-Hygraph
save: HTTP 201 with only `{"accepted":true}`, followed by a CMS read confirming
one NEW draft, the selected muscle, no email, and no published version. The
email-free 37-minute smoke-test request is retained for inspection in Hygraph.

## GraphQL code generation

Application operations live in `src/hygraph/operations/*.graphql`; services use
generated typed documents rather than handwritten CMS response interfaces.
From the repository root, use `npm run hygraph:schema:refresh` after a schema
change, then `npm run codegen`. `npm run codegen:check` validates operations and
checks generated-file freshness offline against the committed schema snapshot.
The `typecheck` script also verifies rejected variables and article-union
narrowing in `test/type-contracts.ts`. Full workflow: `src/hygraph/README.md`.
