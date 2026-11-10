# CLAUDE.md — Lift Lab

Hygraph-first learning project: a strength-training exercise library, programme/article
browser, workout-request form and (later) a 3D muscle explorer. `SDD.md` is the design
intent; this file describes **what actually exists** and how to work in the repo. When the
two disagree, trust the code and this file, then update the SDD.

## Stack (as built)

- npm workspaces, Node >= 22. No root `node_modules` committed — run `npm install` first.
- `apps/web` — React 19 + Vite 7 + TypeScript (strict). Plain CSS (`src/styles/*.css`),
  **hash routing** (`#/exercises|programmes|articles|request[/slug]`), no React Router,
  no Tailwind. R3F/drei installed; `components/muscle-map/MuscleMap.tsx` is a 3-sphere
  placeholder and is **not rendered**. Tests: Vitest + Testing Library (jsdom).
- `apps/api` — NestJS 11 BFF, global prefix `/api`, bound to `127.0.0.1:3001`.
  `class-validator` DTOs + global `ValidationPipe({ whitelist, transform })`,
  `@nestjs/throttler`. Tests: `node --test test/*.test.cjs` against the built `dist`.
- `packages/shared-types` — REST DTOs shared by web and API (source-only, `src/index.ts`).
- `hygraph/schema/NNN-*.mjs` — schema-as-code migrations (Management SDK);
  `scripts/hygraph/apply-*.mjs` plan/apply them.

## Commands (repo root)

```sh
npm install
npm run dev:api            # needs apps/api/.env
npm run dev:web            # Vite, proxies /api -> 127.0.0.1:3001
npm run build
npm run lint               # ESLint flat config (eslint.config.mjs)
npm run typecheck          # includes API negative type-contract checks
npm run check              # lint + typecheck + codegen:check + all tests — run before committing
npm test --workspace=@lift-lab/api
npm test --workspace=@lift-lab/web
npm run hygraph:schema:refresh   # introspect live schema -> apps/api/src/hygraph/schema.graphql
npm run codegen | codegen:check  # offline, against the committed snapshot
npm run hygraph:schema:<name>:plan | :apply   # foundation, workflow-localization,
                                               # programme-article-core, article-blocks-media, workout-intents
```

## Hygraph

- Project `cmtbngj4605dn08w5ymytbfu8`, environment `master`. Locales `en` (default), `cs`.
  Stages DRAFT → REVIEW → PUBLISHED.
- Migrations 001–005 applied: enums, components (SEO, Callout, MediaWithCaption, CTA),
  Exercise / MuscleGroup / Equipment / Coach, conditional modality fields, Review stage +
  Czech localisation, WorkoutProgramme / WorkoutSession / ExerciseSet / Article,
  Training-attributes taxonomy, 7 Article block types + asset fields, WorkoutIntent.
- **Migrations are immutable.** Never edit an applied file; add the next number plus an
  `apply-*` script and root `plan`/`apply` npm scripts. Always run `plan` and review before
  `--apply`. A failed submission reserves the migration name — retry with
  `HYGRAPH_MIGRATION_NAME=...-retry-N`.
- After any schema change: `hygraph:schema:refresh` → `codegen` → `typecheck`, and commit
  operations, `schema.graphql` and `generated/operations.ts` together.
- Reserved field names: use `intentStatus`, not `status`.
- Published starter content (2026-11-06): 8 exercises (en+cs), 7 muscle groups, 3 equipment,
  3 labelled demo editorial profiles (not real coaches), 2 programmes × 3 sessions,
  3 articles. No assets uploaded; `meshId`s are placeholders. `mcp-test-*` entries are
  drafts and must stay unpublished. Inventory + references: `docs/starter-content.md`.
- Content is AI-assisted, not coach-reviewed; keep educational/no-medical-advice framing and
  `noIndex: true` SEO on starter content.

## API surface (`/api`)

- `GET content-status`, `GET muscle-groups?locale=`
- `GET exercises?locale&muscle&limit&offset`, `GET exercises/:slug`
- `GET programmes`, `GET programmes/:slug`, `GET articles`, `GET articles/:slug`
- `POST workout-intents` → creates a DRAFT `WorkoutIntent` (intentStatus NEW), returns only
  `{"accepted":true}` (201). Origin check against `WEB_ORIGIN`, 5 req/min/IP in-memory throttle.
- Rules: locales `en|cs` only, English fallback; limit ≤ 100, offset ≤ 10000; reads always
  `PUBLISHED`; 400 invalid input, 404 missing, 503 unconfigured, 502 sanitised upstream error.
  No automatic write retries.
- GraphQL lives in `apps/api/src/hygraph/operations/*.graphql`; services use generated
  `TypedDocumentNode`s via `HygraphService.query/mutate`. Don't hand-write CMS response types;
  don't edit `generated/operations.ts`. REST DTOs stay CMS-agnostic (rich text → `RichContent`).

## Security rules (non-negotiable)

- The browser never sees Hygraph tokens. Only `VITE_API_URL` is public.
- Separate tokens: content read (PUBLISHED read), mutation (Read/Create WorkoutIntent on
  DRAFT + Read MuscleGroup), management (migrations only), MCP PAT (connector only).
  Never fall back from one to another; never put tokens in code, logs, commits or screenshots.
- `WorkoutIntent` is private: never publish entries, never grant public read.
- `.env` files are git-ignored; keep `.env.example` files in sync when adding variables.

## Hygraph MCP

Connected (verified 2026-11-10). Always pass `project: cmtbngj4605dn08w5ymytbfu8`,
`environment: master` (region EU-CENTRAL-1-STAGING; Content API
`https://eu-central-1-staging.cdn.hygraph.com/content/cmtbngj4605dn08w5ymytbfu8/master`).
Use `dry_run` for mutations/migrations first. MCP cannot delete or unpublish. Use it for exploring schema/content and editorial tasks. Prefer
schema changes as numbered migrations in this repo, not ad-hoc MCP edits, so the repo stays
the source of truth for schema. Never publish `WorkoutIntent` or `mcp-test-*` entries.

## Conventions

- Conventional commits (`feat(api):`, `feat(web):`, `feat(hygraph):`, `docs:`, `chore:`).
- Accessibility first: the 3D map must have a keyboard/list equivalent; content must work
  without WebGL; images render only with URL + alt text + rights/source metadata.
- Unknown article block types render a visible fallback, not a crash.
- Update the relevant README (`apps/*/README.md`, `hygraph/README.md`) with each feature.

## Known gaps vs. SDD

- Deliberately not adopted: Tailwind, React Router, Zod, Prettier, NestJS Jest (see SDD §4). Playwright e2e still planned.
- `react-hooks/set-state-in-effect` is downgraded to a warning (4 fetch effects reset state
  synchronously) — refactor candidates, don't add new ones.
- No `docs/schema-changelog.md` (migration files + `hygraph/README.md` serve this role).
- Webhook handling was removed from the BFF on purpose; `HYGRAPH_WEBHOOK_SECRET` in the SDD
  env list is obsolete.
- Not started: 3D muscle map (GLB + meshId validation), assets/DAM, Live Preview +
  click-to-edit, variants / second brand, environment promotion, YouTube remote field,
  publish webhook, backup/audit docs, reflection/decision log.
