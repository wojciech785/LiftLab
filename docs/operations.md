# Recovery and audit — Lift Lab (Hygraph)

Current project `cmw8okmtc003y07w272tdlgtw` (Hygraph dev deployment, **Enterprise since 2026-11-16**); the 2026-11-10 drill below ran on the legacy project `cmtbngj4605dn08w5ymytbfu8`.

| Enterprise feature | Status (2026-11-16) |
| --- | --- |
| Audit Logs | **Menu visible but not recording** (2026-11-16): explorer empty in `master` and `development` after known events at 08:46–08:52 UTC; enablement requested from Hygraph. Until then the system-field audit trail below is the source. |
| Backup & Recovery | Not yet enabled (needs custom per-project setup by Hygraph); the recovery toolkit below remains in force |

## Recovery toolkit

| # | Option | Covers | Status / evidence |
| --- | --- | --- | --- |
| 1 | **Schema as code** — migrations `hygraph/schema/001–006` replay onto a blank or cloned environment (`npm run hygraph:migrate -- NNN --env <env> --apply`). | Full schema (models, components, enums, stages, locales, taxonomy) | Exercised 2026-11-10: migration 006 applied to `development`, then replayed on `master`; schema comparison of both environments identical afterwards (7,394 entries each). |
| 2 | **Point-in-time snapshot** — clone `master` *with content* into an environment (e.g. `backup-YYYY-MM-DD`) before risky work. Entry IDs are preserved. | Content + assets + schema at clone time | `development` cloned 2026-11-10 and used as the snapshot in the drill below. Environment count may be limited by plan. |
| 3 | **Single-entry rollback** — Studio → entry → Versions panel → restore an earlier version. | One entry | Available in Studio; version history is not exposed via the Content API on this project. Not yet exercised. |
| 4 | **Content export** — script dumping all entries (all stages, en + cs) and asset metadata to JSON outside git, excluding `WorkoutIntent` (personal data). Needs a matching import script. | All content | Not implemented (most effort). |
| 5 | **Asset re-import** — original files live in the repo (`assets/muscle-groups/*.svg`) and are imported by public URL with alt text (en + cs) and rights/source. | Original assets | Exercised 2026-11-10: all 7 illustrations imported from the repo, linked, published. Procedure in `docs/assets.md`. |

## Recovery drill — 2026-11-10 (passed)

Scenario: accidental overwrite of a published exercise's copy. Run in `development` so live content was never at risk.

1. **Baseline** (12:18 UTC): `bird-dog` (id `cmw4xgmo405cx06w2fnve3ks6`, same id in both environments) summary en "Coordinate opposite limbs while keeping the trunk steady.", cs "Koordinujte protilehlé končetiny při stabilním trupu."
2. **Incident** (12:18:16 UTC): summary overwritten in en and cs with "ACCIDENTAL EDIT (recovery drill)" / "NECHTĚNÁ ÚPRAVA (cvičení obnovy)".
3. **Recovery** (12:18:23 UTC): values restored from the known-good copy (`master`, PUBLISHED) via the Content API.
4. **Verification**: en and cs summaries match `master` exactly; `updatedBy` records the change (MEMBER, Wojciech Zaorski).

Time to recover: ~7 seconds once the source was identified. Lesson: keep a fresh content snapshot (option 2) — recovery is only as current as the last clone.

## Enterprise audit log (SDD §14.2, step 1)

**Where:** Studio → Project Settings → Audit logs. **Who:** Owner/Admin, or a custom role with only *Can view Audit Logs* ("Auditor").
**What is logged:** create / update / delete / publish / unpublish on content, models, fields, enumerations, locales, stages, environments, webhooks, roles, members, PATs, views. Each event: entity id, timestamp (UTC), type, action, environment, trigger type (USER, PAT, …), triggered by, payload (full for schema; **no before/after payload for content**).

### Known events generated for verification

| # | When (UTC) | Event | Trigger | How | Expected in log | Verified |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | 2026-11-16 08:52:41 | Publish Muscle Group `core` (unchanged) | PAT "MCP General Token" | MCP `publishMuscleGroup` | Type Content, Publish | ☐ |
| 1 | 2026-11-12 10:53–10:57 | ~180 schema operations (models, fields, locale `cs`, stage `REVIEW`, taxonomy) | PAT (MCP token) | Project rebuild, 21 batches | Type Model/Field/Locale/Stage, Create/Update, with payload | ☐ (were pre-upgrade events kept?) |
| 2 | 2026-11-16 08:46:47 | Update Coach `lift-lab-training-notes` (value unchanged) | PAT "MCP General Token" | MCP `updateCoach` | Type Content, Update | ☐ |
| 3 | 2026-11-16 08:46:47 | Publish same Coach (en, cs) | PAT "MCP General Token" | MCP `publishCoach` | Type Content, Publish | ☐ |
| 4 | _fill in_ | Studio edit + publish of an exercise | USER (Wojciech) | Studio | Content Update + Publish, triggered by user email | ☐ |
| 5 | _fill in_ | Workout request from the app | PAT "Mutation Token" | `POST /api/workout-intents` | Content Create on WorkoutIntent, no personal data in log | ☐ |
| 6 | _fill in_ | Role "Auditor" created | USER | Studio → Roles | Type Role, Create | ☐ |

### Review checklist (weekly, or before/after risky work)

1. Filter **Trigger type = PAT**: every token event should map to a known job (app writes = Mutation Token; schema = migration/MCP token). Unknown token → investigate and rotate.
2. Filter **Action = Delete / Unpublish**: confirm each was intended.
3. Filter **Type = Role / PAT / Member / Webhook**: access changes must match a ticket or decision.
4. Filter **Type = Model / Field** on `master`: schema changes must correspond to a numbered migration (never ad-hoc in master).
5. Record findings and the date at the bottom of this file.

Open questions: retention period and export/API access (not documented; check in Studio and with Hygraph).

### Verification log

- **2026-11-16:** Studio project `34088f24-24ad-4017-a3cc-8b9675ed70e9` (content id `cmw8okmtc003y07w272tdlgtw`), environments `master` (`3fba3c8953434e0c99a862b46b461007`) and `development` (`2c59c7e4b24449ce8157475800129d62`): Audit Logs explorer **empty** in both after events #0, #2, #3 were confirmed via entry system fields (`publishedBy` = PAT "MCP General Token"). Conclusion: feature visible but recording not enabled for the project. Requested enablement (plus Backup & Recovery, App Framework, retention/export answers) from Hygraph. Re-run the table above once enabled.

## Audit trail without Enterprise audit logs (backup source)

What we can pull today (Content API / Hygraph MCP, verified 2026-11-10):

| Source | What it shows | Example from 2026-11-10 |
| --- | --- | --- |
| System fields `createdBy/At`, `updatedBy/At`, `publishedBy/At` | Who created, last changed and published each entry, and whether it was a person (`MEMBER`) or a token (`PAT`) | Exercises and assets: MEMBER Wojciech Zaorski. The app's saved workout request: PAT "Mutation Token" — app writes are distinguishable from people. |
| `documentInStages` | Which stages hold a version and when each was updated | `glute-bridge`: DRAFT 11:46, REVIEW 09:24, PUBLISHED 2026-11-06 (pending release) |
| `scheduledReleases` / `scheduledIn` | Planned publishes, owner, status, affected entries | "Glute bridge summary revision", 2026-11-11 08:00 UTC, PENDING, created by Wojciech Zaorski |
| Git history + migration names | Every schema change, when and why | `git log -- hygraph/schema`, migrations 001–006 |
| Project logs | Human-readable change records | `docs/editorial-workflow.md`, `docs/environments.md`, `docs/assets.md` |

Gaps vs. Enterprise audit logs: no history of deletes, permission/role/token changes or member invites, and no before/after payloads. A signed publish webhook to an external log (SDD phase 5) would close part of that gap.

Example query:

```graphql
query { exercises(stage: DRAFT, orderBy: updatedAt_DESC, first: 10) {
  slug createdAt createdBy { name kind } updatedAt updatedBy { name kind }
  documentInStages(includeCurrent: true) { stage updatedAt publishedAt } } }
```
