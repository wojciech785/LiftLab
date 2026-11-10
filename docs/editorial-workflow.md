# Editorial workflow (Draft → Review → Published)

Project `cmtbngj4605dn08w5ymytbfu8`, environment `master`. Stages: `DRAFT`,
`REVIEW` (custom, migration 002) and `PUBLISHED`. The app reads `PUBLISHED`
only, so nothing an editor does in Draft or Review reaches visitors until it is
published.

## Roles in the flow

1. **Editor** revises the entry in Draft (all intended locales together).
2. **Reviewer/coach** checks form and safety copy in the Review stage.
3. **Editor** publishes — immediately or through a scheduled release — after
   asset and locale checks.

## Content API recipe

```graphql
# 1. Revise (lands in DRAFT)
mutation { updateExercise(where:{id:$id}, data:{
  summary:"…",
  localizations:{ update:[{ locale: cs, data:{ summary:"…" } }] }
}) { id } }

# 2. Promote a snapshot to REVIEW (copies the current DRAFT)
mutation { publishExercise(where:{id:$id}, to:[REVIEW], locales:[en, cs], publishBase:true) { id } }

# 3. Compare stages side by side
query { review: exercise(where:{id:$id}, stage: REVIEW)    { summary }
        live:   exercise(where:{id:$id}, stage: PUBLISHED) { summary }
        draft:  exercise(where:{id:$id}, stage: DRAFT) { documentInStages(includeCurrent:true){ stage updatedAt publishedAt } } }

# 4. Schedule the publish
mutation { createScheduledRelease(data:{ title:"…", releaseAt:"2026-11-11T08:00:00Z" }) { id } }
mutation { schedulePublishExercise(where:{id:$id}, to:[PUBLISHED], locales:[en, cs],
  publishBase:true, releaseId:$releaseId) { id } }
```

Localized publishes must list every locale (`locales:[en, cs]`); otherwise only
the default locale moves. `publishBase:true` also publishes non-localized fields.

## Gotchas learned

- **Publishing always copies DRAFT, never REVIEW.** Review is a snapshot for
  checking, not a gate. A scheduled publish ships whatever is in Draft at
  release time, so don't edit Draft between review and release (or re-review).
- Entry `history` is empty through the Content API for this project/token;
  use Studio's *Versions* panel for revision diffs and the stage query above
  for Draft/Review/Published comparison.
- MCP and `execute_graphql` refuse `unpublish*`/`delete*`. Cancel a scheduled
  release in Studio (Releases) or with `deleteScheduledRelease` from an
  authorised token.
- `localizations.upsert.create` requires all required localized fields (e.g.
  `title`); use `localizations.update` for an existing locale.

## Practice log

| Date | Entry | Change | Stages | Release |
| --- | --- | --- | --- | --- |
| 2026-11-10 | Exercise `glute-bridge` | Clearer summary (en + cs) | Draft → Review (09:24 UTC) | `Glute bridge summary revision`, 2026-11-11 08:00 UTC (09:00 Prague), id `cmwahhpqt03kk06umeipq6yui` |

Before the release fires, the API/web app still serve the old summary
("Explore hip extension with a floor-based bridge."). Verify after 09:00
Prague on 2026-11-11 with `GET /api/exercises/glute-bridge?locale=cs`.
Coach review has not happened; this run practises the mechanics only.
