# Content snapshots

`content-snapshot-YYYY-MM-DD.json` is a full export of the PUBLISHED content
(en + cs) from a Hygraph environment: all models except `WorkoutIntent`
(personal data), with rich text as structured `raw` nodes, relations as slugs
and asset references as ids. Asset files themselves are re-imported from
`assets/` by URL (see `docs/assets.md`).

Use it to seed a new project or environment (after migrations 001–006) and as
recovery option 4 in `docs/operations.md`. It contains no credentials.

## 2026-11-12: rebuilt project `cmw8okmtc003y07w272tdlgtw` (dev deployment)

1. Schema: migrations 001–006 replayed in order via the `hygraph-dev` MCP
   (`submit_batch_migration`, 21 atomic batches, 180 operations, all SUCCESS).
   Introspection afterwards matched the legacy project except Hygraph's own
   built-in search types (`HygraphSearch*`) that the dev platform adds.
2. Assets: the 7 illustrations re-imported from GitHub raw URLs with a file for
   **both** locales at create time (`localizations.create[].data.uploadUrl`),
   alt text en/cs and rights/source.
3. Content: created from `content-snapshot-2026-11-12.json` in dependency order
   (muscle groups, equipment, coaches → exercises → programmes with nested
   sessions and sets → articles with localized blocks), relations connected by
   slug, then published with `locales: [en, cs]`, `publishBase: true`.
4. Verification: the same export query run on the new project and compared
   field by field with the snapshot (ids/URLs ignored) — **all 9 models
   identical**. The first comparison caught 3 Czech texts with transcription
   errors; they were restored from the snapshot and re-verified.

Not copied: `WorkoutIntent` entries (personal data), scheduled releases,
entry version history, content permissions and API tokens (configured in the
new project by hand).
