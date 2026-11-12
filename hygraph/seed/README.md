# Content snapshots

`content-snapshot-YYYY-MM-DD.json` is a full export of the PUBLISHED content
(en + cs) from a Hygraph environment: all models except `WorkoutIntent`
(personal data), with rich text as structured `raw` nodes, relations as slugs
and asset references as ids. Asset files themselves are re-imported from
`assets/` by URL (see `docs/assets.md`).

Use it to seed a new project or environment (after migrations 001–006) and as
recovery option 4 in `docs/operations.md`. It contains no credentials.
