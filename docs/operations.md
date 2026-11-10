# Recovery and audit — Lift Lab (Hygraph)

Project `cmtbngj4605dn08w5ymytbfu8`. Environments: `master` (live), `development` (clone of master with content, 2026-11-10).
Hygraph's built-in **Backup & Recovery** (daily master backups, 7-day retention, one-click restore) and **Audit Logs** (Audit Logs Explorer) are Enterprise features and are not enabled on this project. The options below work without them.

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

## Audit trail without Enterprise audit logs

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
