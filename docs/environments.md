# Environments: development → master

Schema changes are made and tested in `development`, then promoted to
`master` by **replaying the same numbered migration**. The environment diff
is the safety check, not the promotion mechanism. Content is never promoted:
editors keep working in `master`.

| Environment | Purpose | Content |
| --- | --- | --- |
| `master` | Production schema and the real starter content. The app reads it. | Source of truth |
| `development` | Try schema changes and test the app against them. | Cloned copy; disposable |

## One-time setup (Studio)

1. **Project Settings → General → Environments**, select `master`, **Clone**.
2. Display name *Development*, API ID `development`, enable **Clone with
   content** (so the app has data to show). Cloned webhooks start disabled.
3. Check `development` appears in the list (or ask Claude to list environments
   through the Hygraph MCP).

Cloning copies the project's tokens. The app's read/mutation tokens and the
management token therefore work in both environments; only the endpoint
differs (`…/content/<project>/<environment>`).

## Change workflow

```sh
# 1. Write the next immutable migration
#    hygraph/schema/NNN-short-name.mjs  (export one schedule… function)

# 2. Review the local plan (nothing is sent)
npm run hygraph:migrate -- NNN

# 3. Apply to development
npm run hygraph:migrate -- NNN --env development --apply

# 4. Try it: point the API at development in apps/api/.env
#    HYGRAPH_CONTENT_API_URL=…/content/<project>/development
#    then refresh/codegen to see the operations still validate
npm run hygraph:schema:refresh && npm run codegen && npm run check

# 5. See what master is missing (expect exactly the new migration's changes)
npm run hygraph:diff -- --from development --to master

# 6. Promote: freeze schema edits in master, replay the migration there
npm run hygraph:migrate -- NNN --env master --apply

# 7. Confirm the environments match again (expect "Nothing to promote")
npm run hygraph:diff -- --from development --to master

# 8. Point .env back at master, refresh the snapshot from master, codegen,
#    commit migration + snapshot + generated types together, then deploy app
#    code that uses the new fields (schema first when adding; app first when removing)
```

Every apply needs an explicit `--env`; there is no default target.

## Rules

- **Never edit schema directly in master** (Studio or MCP). Changes made only in
  master show up as *deletions* in the next diff and would destroy content if
  applied. If it happens, write a migration that captures the change.
- The diff replaces the target with the source; it does not merge. Review every
  `delete*` operation — `hygraph:diff --apply` refuses them without
  `--allow-deletes`.
- Renamed fields appear as delete + create (content loss). Rename in two steps:
  add the new field, copy content, then remove the old one in a later migration.
- New required fields need a `migrationValue`; the diff does not supply one.
- The diff covers schema only (models, components, enums, stages, locales,
  taxonomies). Content, permissions, tokens and webhooks are not compared.
- `development` can be deleted and re-cloned at any time; never put real work
  only there.

## Alternative for large changes

Studio also offers **Promote** (swap a tested clone into `master`). Hygraph
recommends that with a third, freshly cloned `staging` environment and a
content freeze. It needs more environments than this project uses; replaying
migrations is enough here.

## Log

| Date | Migration | development | master | Diff after promote |
| --- | --- | --- | --- | --- |
| 2026-11-10 | 006 Exercise.commonMistakes (optional, localized string list) | Applied 11:36 UTC; tested with en/cs sample data on `goblet-squat` and the 3–140 character rule | Replayed 11:37 UTC | Empty (7,394 schema entries in both) |

The 2026-11-10 run used the Hygraph MCP (`submit_batch_migration`, dry run
first) because `apps/api/.env` was not set up; the operations were the exact
`npm run hygraph:migrate -- 006` plan. Before promoting, a comparison of both
environments' introspection showed 14 additions in development (all from
`commonMistakes`) and nothing master-only, so no deletion risk.

Gotchas:
- Introspection results can be cached briefly after a migration; change the
  query text (e.g. add an operation name) to get a fresh result.
- A schema snapshot taken with a token whose default stage is DRAFT prints
  `stage: Stage! = DRAFT` defaults. Keep `apps/api/src/hygraph/schema.graphql`
  generated from the app's read token (PUBLISHED) — `npm run hygraph:schema:refresh`.
- `development` still holds the sample `goblet-squat` mistakes; they are test
  data and were not added to master.
