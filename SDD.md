# Lift Lab — Software Design Document

**Status (2026-11-12):** First milestone built and running against the new Hygraph dev project (`cmw8okmtc003y07w272tdlgtw`): migrations 001–006, published en + cs content and illustrations, NestJS BFF, React app with 3D/2D muscle explorer. **Next: Enterprise features (App Framework, recovery tools, audit logs, variants, Live Preview) — waiting for an Enterprise dev account; plan in §14.** See `CLAUDE.md` for the as-built summary.
**Purpose:** A Hygraph-first learning project that turns strength-training knowledge into an interactive exercise library, workout planner, and 3D muscle explorer.

## 1. Product definition

Lift Lab helps a lifter move from “what should I train?” to a safe, focused workout. It combines editorial training content with an interactive 3D body map:

1. The visitor selects a muscle group on a 3D model.
2. Lift Lab presents relevant exercises, programmes, equipment requirements, and coaching notes.
3. The visitor can explore a workout plan and save a lightweight training intent (for example, “I want a 45-minute back workout”).

The product is deliberately suited to Hygraph practice. The same exercise is reused in articles, workout plans, multiple locales, different audience variants, and a future second brand without duplicating content.

### Primary audiences

| Audience | Need | Example tailored content |
| --- | --- | --- |
| Beginner | Clear form cues and approachable alternatives | “Start here” exercise substitutions |
| Regular gym-goer | Efficient plans and progression | Four-week hypertrophy programme |
| Coach/editor | Structured, reusable editorial workflow | Draft exercise, stage review, schedule launch |

### Non-goals for v1

- Medical diagnosis, injury rehabilitation advice, or personalised medical programming.
- Payments, social networking, or a complete workout-tracking product.
- User authentication, beyond a deliberately small future-ready “saved intent” endpoint.

## 2. Learning objectives mapped to the project

| Hygraph technique | Lift Lab use |
| --- | --- |
| Rich Text | Long-form exercise instructions and training articles, including embedded assets and inline references. |
| Conditional fields | Exercise details change by modality; a barbell exercise reveals `barbellSetup`, while bodyweight exercises reveal `progressionLevel`. |
| Relations | Exercises ↔ muscle groups, equipment, plans, coaches, related articles, and substitutions. |
| Reusable components | Shared SEO metadata, CTA, callout, and media-with-caption components. |
| Modular components | Article blocks: text, muscle-map embed, exercise carousel, quote, comparison table, and CTA. |
| Enumerations | Difficulty, training goal, exercise modality, equipment category, content status. |
| Taxonomies | Cross-cutting discovery tags such as `beginner-friendly`, `compound`, `mobility`, and `home-gym`. |
| DAM/assets | Exercise photography, animated form clips, coach portraits, 3D model source/derived previews. |
| Localisation | English first, Czech as the practice locale; locale-specific coaching language and units. |
| Stages/scheduling | Draft → review → published exercise updates, scheduled seasonal programmes. |
| Variants | Beginner vs experienced-lifter copy; later “Lift Lab Home” brand. |
| Versions/environments | Compare coaching revisions and promote schema safely from development to production. |
| Extensibility | Direct Hygraph publish webhook to an external endpoint; YouTube-powered remote field for exercise tutorials; optional editorial sidebar app. |

## 3. Architecture

```text
Browser
  └─ React single-page application (Vite)
       ├─ R3F / Three.js muscle-map experience
       ├─ content pages and client-side routing
       └─ client interactions (filters, saved workout intent)
            │ HTTP / JSON
            ▼
       NestJS API (backend-for-frontend)
            ├─ read queries ──────────────► Hygraph Content API
            ├─ protected mutations ───────► Hygraph Content API
                                              │
                                              └─ Hygraph project
                                                 ├─ schema, entries, assets
                                                 ├─ locales, stages, variants
                                                 └─ taxonomy
                                                  └─ publish webhook ──► external endpoint
```

### Architectural decisions

1. **Separate React frontend and NestJS API from the start.** NestJS is the backend-for-frontend (BFF): it keeps Hygraph secrets server-side, validates writes, and establishes an API that can later serve a mobile client without a redesign.
2. **Hygraph is the editorial source of truth.** Exercise knowledge, media, plans, labels, and page composition belong in Hygraph. UI-only state, 3D hit-testing, animation, and temporary filter state do not.
3. **The browser never receives Hygraph write credentials.** Public/read access is through server-side reads. Mutations use a server-only token after request validation.
4. **R3F enhances discovery, not accessibility.** Every 3D selection has an equivalent keyboard-accessible list/filter interface. Content must remain useful when WebGL is unavailable.

## 4. Technology choices

| Area | Technology | Why |
| --- | --- | --- |
| Frontend | React 19, Vite, TypeScript, hash-based routing | A familiar, fast local SPA workflow. *As built:* a small hash router replaced React Router so refresh/back work without hosting rewrites. |
| Backend / BFF | NestJS, TypeScript, Node.js | Modular API, dependency injection, validation, configuration, and a clear boundary around Hygraph credentials. |
| Styling | Plain CSS + CSS variables | *As built:* per-area stylesheets in `apps/web/src/styles`; Tailwind not adopted. |
| 3D | React Three Fiber, Three.js, `@react-three/drei` | Declarative React integration, loading helpers, accessible fallback design. |
| CMS | Hygraph | Structured GraphQL content, assets, stages, locales, variants, and schema management. |
| GraphQL | `graphql-request` plus generated TypeScript types | Small client surface and typed query/mutation contracts. |
| Code generation | GraphQL Code Generator | Regenerates operations/types when Hygraph schema changes. |
| Validation | class-validator / class-transformer | *As built:* NestJS `ValidationPipe` DTOs validate mutation payloads; Zod not adopted. |
| Testing | Vitest + React Testing Library (web), `node:test` against the built API, compile-time type-contract checks | *As built.* Playwright end-to-end tests are still planned. |
| Quality | ESLint (flat config, typescript-eslint, react-hooks), TypeScript strict mode | `npm run check` runs lint, typecheck, codegen freshness and tests. Prettier deliberately not adopted to avoid a whole-repo reformat. |
| Local runtime | Node.js LTS, two local dev servers | Frontend and API run locally; a temporary HTTPS tunnel is only needed when testing Hygraph Live Preview. |

## 5. Repository structure (as built)

```text
lift-lab/
├── SDD.md, CLAUDE.md
├── package.json                     # workspace scripts (dev, build, check, codegen, hygraph:schema:*)
├── eslint.config.mjs
├── apps/
│   ├── web/                         # React/Vite SPA
│   │   ├── .env.example             # VITE_API_URL only
│   │   └── src/
│   │       ├── App.tsx              # hash router + nav + locale picker
│   │       ├── ExercisesPage.tsx, EditorialPage.tsx, WorkoutIntentPage.tsx
│   │       ├── api/client.ts        # typed calls to the Nest API
│   │       ├── components/          # RichText, muscle-map (placeholder, not rendered)
│   │       └── styles/
│   └── api/                         # NestJS BFF
│       ├── .env.example             # server-only Hygraph tokens
│       ├── codegen.mjs
│       ├── test/                    # node:test suites + type-contracts.ts
│       └── src/
│           ├── hygraph/             # HygraphService, operations/*.graphql, schema.graphql, generated/
│           ├── exercises/, editorial/, workout-intents/, health/
│           └── app.module.ts, main.ts
├── packages/shared-types/           # REST DTOs shared by web and API
├── hygraph/schema/NNN-*.mjs         # immutable schema migrations (Management SDK)
├── scripts/hygraph/                 # plan/apply + schema refresh scripts
└── docs/starter-content.md          # published content inventory and references
```

## 6. Hygraph content model

### Core models

| Model | Key fields | Purpose |
| --- | --- | --- |
| `Exercise` | title, slug, summary, instructions (Rich Text), difficulty, modality, duration, primaryMuscles, secondaryMuscles, equipment, `youtubeTutorial`, gallery, substitutions, coach, taxonomies, SEO | Canonical unit of training knowledge. |
| `MuscleGroup` | name, slug, bodyRegion, description, `meshId`, illustration, relatedExercises | Connects CMS content to the named mesh/group in the 3D model. `meshId` is editorially controlled but validated in code. |
| `WorkoutProgramme` | title, slug, goal, level, durationWeeks, sessionsPerWeek, heroAsset, overview (Rich Text), sessions, coach, variants, taxonomy | A publishable multi-week training plan. |
| `WorkoutSession` | title, order, estimatedMinutes, warmup (Rich Text), exerciseSets, cooldown (Rich Text) | A reusable session related to a programme. |
| `ExerciseSet` | order, exercise, sets, repRange, tempo, restSeconds, coachNote | Structured prescription within a session; can be a model or a component depending on whether it must be reused independently. |
| `Article` | title, slug, excerpt, heroAsset, contentBlocks (modular components), author, relatedExercises, relatedProgrammes, taxonomies, SEO | Editorial learning content. |
| `Coach` | name, slug, photo, role, biography (Rich Text), credentials, social links | Authorship, trust, and reusable profile data. |
| `Equipment` | name, slug, category, description, image, alternatives | Enables filters and conditional exercise instructions. |
| `WorkoutIntent` | goal, availableMinutes, selectedMuscles, experienceLevel, contactEmail (optional), consent, status | Small first write model used to learn Content API mutations. Keep personal data minimal. |

### Components

**Reusable components** (used on several models):

- `SeoMetadata`: title, description, social image, no-index flag.
- `Callout`: tone, heading, body, optional link.
- `MediaWithCaption`: asset, caption, alt-text override, focal point.
- `CTA`: label, destination, style.

**Modular `Article.contentBlocks` components** (ordered page composition):

- `RichTextBlock`
- `ExerciseCarouselBlock` (relation to exercises)
- `MuscleMapBlock` (selected muscle groups and explanatory copy)
- `ComparisonTableBlock`
- `CoachQuoteBlock`
- `CalloutBlock`
- `ImageGalleryBlock`

### Enumerations

| Enum | Values |
| --- | --- |
| `Difficulty` | beginner, intermediate, advanced |
| `TrainingGoal` | strength, hypertrophy, endurance, mobility, general-fitness |
| `ExerciseModality` | barbell, dumbbell, cable, machine, bodyweight, kettlebell, cardio |
| `EquipmentCategory` | free-weights, machine, cable, bodyweight, cardio, accessory |
| `WorkoutIntentStatus` | new, reviewed, archived |
| `CalloutTone` | tip, caution, progression, recovery |

### Conditional field rules

| When | Show these fields |
| --- | --- |
| `modality = barbell` | `barbellSetup`, `rackHeight`, `safetyPinsRequired` |
| `modality = machine` | `machineSetup`, `seatPosition`, `machineAlternative` |
| `modality = bodyweight` | `progressionLevel`, `regressionExercise` |
| `youtubeTutorial` is set | `videoTranscript` and `videoPoster` become required |
| `WorkoutIntent.contactEmail` is set | `consent` must be required |

### Relations and cardinality

- `Exercise` ↔ `MuscleGroup`: many-to-many; primary versus secondary muscle should be distinguished through two relation fields.
- `Exercise` ↔ `Equipment`: many-to-many.
- `Exercise` ↔ `Exercise`: many-to-many self-relation for substitutions/alternatives.
- `WorkoutProgramme` → `WorkoutSession`: one-to-many.
- `WorkoutSession` → `ExerciseSet`: one-to-many.
- `ExerciseSet` → `Exercise`: many-to-one.
- `Article` ↔ `Exercise` and `WorkoutProgramme`: many-to-many.
- `Coach` → exercises, programmes, articles: one-to-many.

### Taxonomy design

Create one taxonomy, **Training attributes**, with hierarchical tags:

```text
Training attributes
├── Experience: beginner-friendly, technique-first
├── Training style: compound, isolation, unilateral, circuit
├── Location: home-gym, commercial-gym, outdoors
└── Focus: posture, core, mobility, recovery
```

Taxonomy is for cross-model discovery. It should not replace strict fields such as `Difficulty` or `ExerciseModality`, which must remain filterable enumerations.

## 7. Content, DAM, and governance

### What lives in Hygraph

- All copy that an editor might revise: exercise instructions, safety notes, coaching tips, programmes, articles, navigation labels, SEO metadata.
- Editorially selected images, video, animations, 3D preview renders, coach portraits, and accessibility metadata.
- The mapping metadata between content and the 3D explorer (`MuscleGroup.meshId`).

### What does not live in Hygraph initially

- Source code, R3F scene configuration, shader code, and query documents.
- User session state, favourites, and browser-side filter state.
- Original high-poly 3D authoring files; store optimised web GLB assets in the application/CDN unless Hygraph DAM is specifically being evaluated for that workflow.

### Asset standards

- Every published visual requires meaningful alt text and a rights/source record.
- Images use descriptive filenames and focal points.
- Videos need poster images, transcript/caption content, and an explicit duration.
- Avoid uploading unlicensed anatomy, athlete, or brand assets.

### Stages and publishing

Use `Draft`, `Review`, and `Published` stages. An editor creates or revises an exercise in Draft; a coach validates form/safety guidance in Review; an editor publishes after asset and locale checks. Programme launches can be scheduled. Version comparison is used before publishing significant coaching revisions.

## 8. API and security design

### Reads

NestJS services query the Hygraph Content API using a least-privilege read token. GraphQL operations and generated types live in `apps/api/src/hygraph`. Controllers expose purpose-built REST endpoints such as `GET /exercises`, `GET /exercises/:slug`, and `GET /programmes/:slug`; the frontend never calls Hygraph directly. Production-style requests default to `PUBLISHED`; a protected preview request explicitly selects the preview stage.

### Writes

`POST /workout-intents` accepts a DTO validated by NestJS `ValidationPipe` (class-validator/class-transformer), applies throttling if the endpoint is exposed beyond localhost, and sends a constrained GraphQL mutation using a server-only mutation token. It returns no CMS internals to the browser. This is the training mutation path; authoring content remains in Hygraph.

### Webhooks

Hygraph publish/unpublish webhooks are configured in Hygraph and delivered directly to a separately operated external endpoint. The Lift Lab BFF does not receive, verify, or relay webhook events.

### Remote field: YouTube tutorials

Each `Exercise` can use a Hygraph remote field named `youtubeTutorial`. The field integrates with the YouTube Data API v3 to let an editor search for an approved tutorial and display useful live metadata in the entry form: title, channel, thumbnail, duration, and video ID. The saved value should contain only the stable data the frontend needs (`videoId`, `title`, `channelTitle`, `thumbnailUrl`, and optional `publishedAt`), not an opaque or expiring API response.

- Store the YouTube API key in the remote-field integration/runtime configuration only; never expose it to the React client.
- Maintain an approved-channel allowlist where possible, so training advice is sourced consistently.
- The React player uses YouTube's privacy-enhanced embed domain, `youtube-nocookie.com`, after user interaction/consent if required.
- A normal `youtubeVideoId` fallback field can be retained for local development or quota/API outages. The `videoTranscript` remains Hygraph content so it is localisable and accessible even when the video cannot load.

### Environment variables

```dotenv
HYGRAPH_CONTENT_API_URL=
HYGRAPH_CONTENT_API_TOKEN=
HYGRAPH_MUTATION_API_URL=
HYGRAPH_MUTATION_API_TOKEN=
HYGRAPH_MANAGEMENT_API_TOKEN=     # schema migrations only
HYGRAPH_SCHEMA_API_ENDPOINT=      # optional, defaults to content URL
HYGRAPH_MCP_ENDPOINT=
HYGRAPH_MCP_PAT=
```

`PORT` and `WEB_ORIGIN` are also read by the API. The BFF does not handle webhooks, so no webhook secret is configured in the app. `.env` remains local and ignored. The MCP PAT is only supplied to the Hygraph MCP connector; it must not be added to client code, screenshots, commits, or application logs.

## 9. Live Preview, locales, and variants

### Live Preview + click-to-edit

Configure a preview URL pointing to the React application. Because Hygraph cannot reach `localhost`, use a temporary HTTPS tunnel only during this exercise (for example Cloudflare Tunnel or ngrok). The API issues/validates a short-lived preview context; the React application adds Hygraph’s required editable metadata/links around page regions. The initial click-to-edit targets are article title, article blocks, exercise title, instructions, and programme overview.

### Locales

- Initial locales: `en` (default) and `cs`.
- Localise user-facing title, summary, rich text, SEO, asset alt text, and coaching language.
- Keep scientific identifiers (`meshId`), enum values, relations, and duration fields non-localised unless a later requirement proves otherwise.
- Render metric units for Czech by default; wording and any unit conversions belong in the frontend presentation layer, not duplicated exercise records.

### Variants and second brand

Start with audience variants for `beginner` and `experienced`. Variant fields will be used selectively for summary/CTA/safety phrasing, avoiding duplicate whole entries. A later `Lift Lab Home` brand can reuse exercises and coaches while varying theme, navigation, equipment emphasis, and selected copy.

## 10. Delivery plan

### Phase 0 — Foundation and access

- [x] Create a Hygraph project and configure locales, stages, and taxonomy (migrations 001–003).
- [x] Create a separate `development` environment (cloned with content 2026-11-10; workflow in `docs/environments.md`).
- [x] Store credentials locally (`apps/api/.env`, git-ignored).
- [x] Connect the Hygraph MCP to the Claude workspace (global connector, verified 2026-11-10).
- [x] Scaffold an npm workspace with React/Vite frontend, NestJS API, TypeScript, styling, linting, testing, and `.env.example` files (see §4 for as-built deviations).
- [x] Confirm no secret is exposed to the browser.

### Phase 1 — Model the content

- [x] Create the models, components, enumerations, conditional fields, relations, and taxonomy in this SDD.
- [x] Capture schema changes — done as numbered migrations in `hygraph/schema/` documented in `hygraph/README.md` instead of a separate changelog.
- [x] Generate GraphQL types and review operation contracts.

### Phase 2 — Editorial content and DAM

- [x] Create 8–12 exercises across body regions and modalities (8 published, en + cs).
- [x] Add 2 programmes, 3 sessions per programme, 3 coaches, and 3 modular articles (coaches are labelled demo editorial profiles).
- [~] Upload properly attributed assets with alt text; map at least six `meshId` values (7 original CC0 muscle-group illustrations published with en/cs alt text, see `docs/assets.md`; exercise photos/video and GLB `meshId` validation still open).
- [~] Exercise the stages, publication, scheduling, and version comparison workflow (Draft → Review → scheduled release done on `glute-bridge`, see `docs/editorial-workflow.md`; Studio version diff still to try).

### Phase 3 — Frontend and backend connection

- [x] Build responsive React browse pages and NestJS Hygraph read endpoints.
- [x] Build the 3D muscle-map experience with non-WebGL fallback (prototype figure from R3F primitives, lazy-loaded; 2D body map as fallback and in articles).
- [x] Implement typed queries and the validated workout-intent mutation.
- [ ] Use the API Playground to test equivalent queries/mutations before coding them.

### Phase 4 — Production CMS features

- [ ] Add Live Preview and click-to-edit — **back in scope (2026-11-12)**, moved to Phase 7 / §14.4 (needs Enterprise dev account).
- [x] Localise selected content to Czech (all starter exercises, muscle groups, programmes, articles and asset alt text have `cs`).
- [ ] Add audience variants and demonstrate a Lift Lab Home second-brand view — **back in scope (2026-11-12)**, moved to Phase 7 / §14.3 (Enterprise feature).
- [x] Make, diff, and promote a schema change across environments (migration 006 `Exercise.commonMistakes`: development → diff → master, diff empty afterwards; API/web show it).

### Phase 5 — Advanced operations

- [x] Configure roles and permissions (already practised).
- [ ] Configure a signed Hygraph publish webhook for the external endpoint.
- [ ] Create a YouTube tutorial picker for exercises, with a video-ID fallback and approved-channel policy — now planned as an App Framework field element (Phase 7 / §14.5) instead of a remote field.
- [x] Document backup/export, recovery drill, and audit-log review (`docs/operations.md`; drill passed 2026-11-10 without Enterprise tools). Repeat with Hygraph's built-in Backup & Recovery and Audit Logs in Phase 7 / §14.1–14.2.

### Phase 7 — Enterprise features (blocked: waiting for Enterprise dev account)

Detailed plan in §14. Order chosen so the cheapest, configuration-only items prove the account first.

- [ ] 7.1 Recovery tools: enable Backup & Recovery, run a restore drill with the built-in backups (§14.1).
- [~] 7.2 Audit logs: enabled 2026-11-16; known events generated and documented in `docs/operations.md`; user verification + Auditor role pending (§14.2).
- [ ] 7.3 Variants: segments, variant-enabled fields, beginner/experienced copy, Lift Lab Home view (§14.3).
- [ ] 7.4 Live Preview and click-to-edit for exercises, programmes and articles (§14.4).
- [ ] 7.5 App Framework: Lift Lab editor app with a YouTube tutorial field and a muscle-map/publish-check sidebar (§14.5).

### Phase 6 — Reflection

- [ ] Record what made editorial work easier or harder.
- [ ] Keep a decision log and a schema/content retro.
- [ ] Capture before/after schema diff screenshots and query examples.

## 11. Acceptance criteria for the first usable milestone

- A visitor can browse exercises by muscle group through both the 3D model and accessible fallback controls.
- Published Hygraph content is shown through typed server-side queries.
- One programme renders structured sessions, sets, and linked exercises.
- At least one article demonstrates modular content blocks and Rich Text.
- One protected, validated mutation creates a `WorkoutIntent`; no mutation credential is exposed client-side.
- The project has sample English content, an initial Czech localisation, and an editor can preview unpublished changes *(Live Preview planned in Phase 7 / §14.4)*.
- Mobile, keyboard, and reduced-motion behaviour are tested before considering the 3D experience complete.

## 12. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| 3D work overwhelms the CMS learning goal | Build the accessible catalogue first; add a simple named-mesh model progressively. |
| Inaccurate health guidance | Use educational language, coach review, and clear medical disclaimers; do not claim diagnosis or treatment. |
| Content model becomes over-normalised | Begin with the listed models; turn `ExerciseSet` into a component if it proves never independently reusable. |
| Tokens leak to the client | Use server-only modules, `.env` ignored by Git, and token scope separation. |
| Variants/locales multiply editorial effort | Localise only intended fields and use variants only where copy truly differs. |

## 13. Open decisions before implementation

1. Use a realistic but non-personal sample coaching brand, or an invented team of coaches?
2. ~~Which 3D direction is preferred?~~ **Decided 2026-11-10:** primitive shapes built in code (prototype project; no model file or licensing). Anatomical (Z-Anatomy, CC BY-SA 4.0) or stylised models remain possible later — the `meshId` contract makes the swap cheap.
3. Should workout intents remain anonymous, or should the project later add a real authentication provider and saved plans?
4. Is Czech the preferred second locale, or should the exercise use another language?

## 14. Enterprise features plan

Status: **planned, blocked on an Enterprise dev account** (requested 2026-11-12). Everything below targets the dev project `cmw8okmtc003y07w272tdlgtw`; schema changes still go through numbered migrations and the development → master workflow (`docs/environments.md`). Before starting, confirm in Studio which features the account actually enables and re-check the docs for anything that changed.

### 14.0 Prerequisites (day 1 on the new account)

- Confirm feature flags: Backup & Recovery, Audit Logs, Variants, Live Preview/Click to Edit, App Framework.
- Re-clone `development` from `master` with content (the current clone was taken while master was empty).
- Tokens: keep separate tokens per purpose. New: a **preview token** (DRAFT read, server-only) for §14.4.
- Update `hygraph-dev` MCP PAT if the account/project changes; MCP still cannot delete — deletions stay manual in Studio.

### 14.1 Recovery tools (Backup & Recovery)

What it gives us: daily automatic backups of `master` (content, assets, schema), up to 7 days, restore as a new environment or restore-and-promote to `master`.

1. Enable and confirm the first backup appears (Project backups list; note next scheduled backup and retention).
2. **Drill A — restore to a new environment:** pick yesterday's backup → "Recover backup only" → new environment. Run the export/compare used for the 2026-11-12 rebuild against it vs. `master` and record the result.
3. **Drill B — accidental change rollback:** in `master`, change one exercise (logged), then "Recover backup & promote to master" on a quiet day; verify the change is gone and the old master is kept under a new name. Note: restored environments change asset URLs — check the app and anything storing asset URLs.
4. Update `docs/operations.md`: recovery toolkit gets option 0 (built-in backups), RTO/RPO observed, runbook with screenshots.

Done when: both drills logged with timestamps and comparison output; runbook updated.

### 14.2 Audit logs

What it gives us: create/update/delete/publish/unpublish events for content, models, fields, environments, webhooks, roles, members and PATs, with who/how (USER, PAT, …), filters and detail payloads.

1. Enable; create a custom role "Auditor" with *Can view Audit Logs* (least privilege) and test it with a second member if available.
2. Generate known events: one migration via the migrate script (PAT), one Studio edit (user), one app workout request (Mutation Token PAT), one publish/unpublish, one webhook or token change.
3. Review each in the Audit Logs Explorer; record filters used and what each event shows (note: content events carry no full payload).
4. Check whether logs can be exported or queried via API and how long they are retained; if an API exists, add `npm run hygraph:audit` to pull recent events into a dated JSON (not committed if it contains personal data).
5. Update `docs/operations.md` audit section: Enterprise audit log as primary source, our system-field queries as backup; weekly review checklist.

Done when: every generated event is found in the log and the checklist is in the docs.

### 14.3 Variants (audiences + second brand)

Model:
- Segments (system model): `beginner`, `experienced`, `lift-lab-home`.
- Migration 007: enable variants on `Exercise.summary`, `Exercise.commonMistakes`, `Exercise.progressionLevel`, `WorkoutProgramme.overview`, `CTA.label` (start small; slugs/unique fields cannot be variant-enabled).

Content:
- Beginner/experienced variants for 3–4 exercises (e.g. glute bridge, goblet squat, bent-knee push-up), en + cs.
- `lift-lab-home` variants emphasising home-gym equipment for the bodyweight exercises.
- Publishing: publish segments, base entry, then each variant (variants are not published with the base).

API/web:
- `GET /api/exercises/:slug?audience=beginner|experienced` and `?brand=home` → query `variants(where: {segments_some: {slug: …}})`, merge variant fields over the base, fall back to base when absent. Audience is validated server-side like `locale`.
- Web: audience switch (default from the workout-request experience level, remembered per browser); "Lift Lab Home" view = brand segment + home-gym taxonomy filter + light theme change.
- Tests: merge/fallback logic, invalid audience 400, UI switch.

Done when: the same exercise shows different summary/mistakes per audience in both locales, and the Home view works without duplicated entries.

### 14.4 Live Preview and Click to Edit

API:
- Preview mode: `GET /api/...?preview=1` with a signed short-lived preview cookie/header issued by `GET /api/preview?secret=…&path=…` (secret from `.env`, compared in constant time). In preview, read `stage: DRAFT` with the separate preview token; responses `Cache-Control: no-store`. Published mode unchanged.
- Queries add `id` on entries and components (needed for click-to-edit component chains).

Web:
- `@hygraph/preview-sdk` initialised only in preview mode (`endpoint`, `studioUrl` for the dev deployment, `allowedOrigins`); `subscribe('save')` refetches the current view.
- Annotate editable regions with `data-hygraph-entry-id` + `data-hygraph-field-api-id` (exercise title/summary/instructions/common mistakes; programme title/overview; article title/excerpt; article blocks via `data-hygraph-component-chain`; rich text with `data-hygraph-rich-text-format`).
- Hash routes keep working: preview URL templates per model, e.g. `<base>/api/preview?secret=…&path=/%23/exercises/{slug}`.

Studio:
- Configure preview URLs for Exercise, WorkoutProgramme, Article. First try `http://localhost:5173` (Chrome treats localhost as secure); if the iframe is blocked, use a temporary HTTPS tunnel (Cloudflare Tunnel/ngrok) and add it to `allowedOrigins` and `WEB_ORIGIN`.

Done when: an editor changes a draft exercise, sees it in Live Preview without publishing, and clicking the title/instructions jumps to the field in Studio. Public pages still show only published content.

### 14.5 App Framework — "Lift Lab editor tools" app

New workspace `apps/hygraph-app` (React + `@hygraph/app-sdk-react`, Vite), registered in the project and installed in `development` first.

- **Field element — YouTube tutorial picker** (replaces the remote-field idea): search approved channels via a small server endpoint that holds the YouTube Data API key (never in the browser); store `videoId`, `title`, `channelTitle`, `thumbnailUrl`, `publishedAt` in a JSON field (migration 008: `Exercise.youtubeTutorial` JSON, keep `youtubeVideoId` fallback). Web renders it with `youtube-nocookie.com` after user interaction.
- **Sidebar element — muscle map & publish check:** renders the shared `BodyMap` for the entry's primary/secondary muscles and flags unknown `meshId`s; checklist before publishing (cs localization present, alt text + rights on linked assets, common mistakes 3–140 chars, SEO noIndex for starter content).
- Hosting: localhost during development if Studio allows it, otherwise the same HTTPS tunnel; document app registration, permissions it requests, and installation in `docs/app-framework.md`.

Done when: an editor can pick a tutorial in the entry form and sees the sidebar checks; app permissions are least-privilege.

### 14.6 Sequence and effort (rough)

| Step | Depends on | Effort |
| --- | --- | --- |
| 14.0 prerequisites | account | 0.5 session |
| 14.1 recovery drills | backups running ≥ 1 day | 1 session |
| 14.2 audit logs | — | 0.5–1 session |
| 14.3 variants | migration 007 | 2 sessions |
| 14.4 live preview + click to edit | preview token, maybe tunnel | 2 sessions |
| 14.5 app framework | YouTube API key, app registration | 2–3 sessions |

Risks: features or APIs differ on the dev deployment (verify first); variants multiply editorial work across locales (keep the field set small); preview/app iframes may need HTTPS (tunnel); YouTube API quota (cache + video-ID fallback).
