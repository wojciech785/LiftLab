# Lift Lab — Software Design Document

**Status (2026-11-10):** Schema migrations 001–005 applied; starter content published; NestJS read/write API and React browser for exercises, programmes, articles and workout requests working. Next: Hygraph MCP connection, assets/editorial workflow, Live Preview, 3D muscle map. See `CLAUDE.md` for the as-built summary.
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
- [ ] Create a separate development environment (currently only `master`).
- [x] Store credentials locally (`apps/api/.env`, git-ignored).
- [ ] Connect the Hygraph MCP to the Claude workspace using the user’s PAT.
- [x] Scaffold an npm workspace with React/Vite frontend, NestJS API, TypeScript, styling, linting, testing, and `.env.example` files (see §4 for as-built deviations).
- [x] Confirm no secret is exposed to the browser.

### Phase 1 — Model the content

- [x] Create the models, components, enumerations, conditional fields, relations, and taxonomy in this SDD.
- [x] Capture schema changes — done as numbered migrations in `hygraph/schema/` documented in `hygraph/README.md` instead of a separate changelog.
- [x] Generate GraphQL types and review operation contracts.

### Phase 2 — Editorial content and DAM

- [x] Create 8–12 exercises across body regions and modalities (8 published, en + cs).
- [x] Add 2 programmes, 3 sessions per programme, 3 coaches, and 3 modular articles (coaches are labelled demo editorial profiles).
- [ ] Upload properly attributed assets with alt text; map at least six `meshId` values.
- [ ] Exercise the stages, publication, scheduling, and version comparison workflow.

### Phase 3 — Frontend and backend connection

- [x] Build responsive React browse pages and NestJS Hygraph read endpoints.
- [ ] Build the 3D muscle-map experience with non-WebGL fallback.
- [x] Implement typed queries and the validated workout-intent mutation.
- [ ] Use the API Playground to test equivalent queries/mutations before coding them.

### Phase 4 — Production CMS features

- [ ] Add Live Preview and click-to-edit using a temporary HTTPS tunnel for local testing.
- [ ] Localise selected content to Czech.
- [ ] Add audience variants and demonstrate a Lift Lab Home second-brand view.
- [ ] Make, diff, and promote a schema change across environments.

### Phase 5 — Advanced operations

- [x] Configure roles and permissions (already practised).
- [ ] Configure a signed Hygraph publish webhook for the external endpoint.
- [ ] Create a YouTube Data API remote field that searches/selects exercise tutorials, with a video-ID fallback and approved-channel policy.
- [ ] Document backup/export, recovery drill, and audit-log review.

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
- The project has sample English content, an initial Czech localisation, and an editor can preview unpublished changes.
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
2. Which 3D direction is preferred: an anatomical muscle-map model, a stylised gym avatar, or a simple abstract body diagram before moving to 3D?
3. Should workout intents remain anonymous, or should the project later add a real authentication provider and saved plans?
4. Is Czech the preferred second locale, or should the exercise use another language?
