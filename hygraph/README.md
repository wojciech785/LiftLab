# Hygraph schema as code

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
and the Training attributes taxonomy. Its article blocks and media fields are
intentionally deferred to a later migration.

```sh
node --env-file=apps/api/.env scripts/hygraph/apply-programme-article-core.mjs
node --env-file=apps/api/.env scripts/hygraph/apply-programme-article-core.mjs --apply
```
