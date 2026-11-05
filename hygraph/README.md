# Hygraph schema as code

Each numbered file in `schema/` is an immutable migration. Do not edit an
applied migration; create the next number for any schema change. The initial
foundation provisions a **blank** environment with Lift Lab's shared enums,
components, core models, fields, and relations.

Create a Hygraph Permanent Auth Token with only the Management API permissions
needed for the schema operations, then set these server-only values in
`apps/api/.env`:

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
