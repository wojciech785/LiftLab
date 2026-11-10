# Hygraph schema as code

> **From migration 006 on**, use the generic runner and the development →
> master workflow in [`docs/environments.md`](../docs/environments.md):
> `npm run hygraph:migrate -- NNN --env development --apply`. The per-migration
> `apply-*.mjs` scripts below are kept for 001–005 history.

Each numbered file in `schema/` is an immutable migration. Do not edit an
applied migration; create the next number for any schema change. The initial
foundation provisions a **blank** environment with Lift Lab's shared enums,
components, core models, fields, and relations.

Create a Hygraph Permanent Auth Token with the Management API
`ENVIRONMENT_READ` permission plus the create permissions required by the
schema operations (models, components, fields, enumerations, and relations).
`ENVIRONMENT_READ` is required because the SDK resolves the environment before
submitting a migration. Then set these server-only values in `apps/api/.env`:

```dotenv
HYGRAPH_MANAGEMENT_API_TOKEN=...
HYGRAPH_SCHEMA_API_ENDPOINT=https://.../content/<project>/<environment>
```

Inspect the scheduled operations first:

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-foundation.mjs
```

Provision the target blank environment only after reviewing that output:

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-foundation.mjs --apply
```

The script deliberately fails when run a second time against the same
environment. This prevents accidentally treating a destructive reset as a
normal migration. Later schema changes should be added as ordered, incremental
migrations.

Hygraph reserves a migration name even when a submission fails. To retry the
same code after fixing permissions, provide a fresh audit name:

```sh
HYGRAPH_MIGRATION_NAME=lift-lab-002-workflow-and-localization-retry-1 \
  node --env-file=apps/api/.env scripts/hygraph/apply-workflow-localization.mjs --apply
```

## Applying incremental migrations

For an environment where the foundation is already present, plan and apply the
Review-stage and Czech-localization migration independently:

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-workflow-localization.mjs
node --env-file=apps/api/.env scripts/hygraph/apply-workflow-localization.mjs --apply
```

The programme/article core migration adds the four top-level editorial models
and the Training attributes taxonomy. Migration 004 adds article blocks and media fields.

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-programme-article-core.mjs
node --env-file=apps/api/.env scripts/hygraph/apply-programme-article-core.mjs --apply
```

After 003, provision the seven Article block types, comparison-table rows, and
asset references with 004:

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-article-blocks-media.mjs
node --env-file=apps/api/.env scripts/hygraph/apply-article-blocks-media.mjs --apply
```

Plan mode only prints SDK operations; it does not validate them on the server.
Article block order and media references are shared across locales; block copy,
captions, and asset alt text are localized. Asset rights/source metadata and
alt text are optional at schema level so existing entries stay editable;
editors must check them before publishing. Comparison-table rows should have
the same number of cells as column headings. No assets are uploaded by this migration.

## Workout intents (005)

After 004, provision the private workout-intake model:

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-workout-intents.mjs
node --env-file=apps/api/.env scripts/hygraph/apply-workout-intents.mjs --apply
```

`WorkoutIntent` uses the existing TrainingGoal, Difficulty, and WorkoutIntentStatus
enums. `intentStatus` avoids Hygraph's reserved `status` field name. Entry fields
are goal, availableMinutes, experienceLevel, selectedMuscles, consent, optional
contactEmail, and intentStatus. The application always creates DRAFT entries with
NEW intentStatus; it never publishes requests.

After each schema migration, run `npm run hygraph:schema:refresh`, then
`npm run codegen` and `npm run typecheck` from the repository root. This keeps
the API's operation contracts aligned with the new schema. See
`apps/api/src/hygraph/README.md` for the offline generation/check workflow.

Keep this model out of public permissions. Configure a dedicated server token
with Read/Create for WorkoutIntent on Draft/en, and Read on MuscleGroup for
connecting existing entries. Do not reuse the Management or MCP token in the app.
Migration 005 does not change account/token permissions. Anonymous DRAFT reads
were checked and denied after provisioning.
