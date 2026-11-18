# Live Preview and Click to Edit (Enterprise)

Editors see unpublished **draft** exercises inside Studio, refreshed on every
save, and can click a text in the preview to jump to that field in the form.
Verified 2026-11-18 on master (Standing Calf Raise, en + cs).

## How it works

```
Studio entry ──Open preview──▶ iframe: http://localhost:5173/?preview=<secret>&locale=cs#/exercises/<slug>
                                   │  web: isPreview() → banner + lazy @hygraph/preview-sdk
                                   ▼
                     GET /api/exercises/<slug>  (header X-Lift-Lab-Preview: <secret>)
                                   │  API: constant-time secret check → GetExercisePreview
                                   ▼
                     Hygraph Content API, stage DRAFT, HYGRAPH_PREVIEW_TOKEN
```

- Public requests (no header) still use `GetExercise` with `stage: PUBLISHED`
  and the published token. Drafts are unreachable without the secret.
- Preview off by default: no `HYGRAPH_PREVIEW_TOKEN` or a secret shorter than
  24 characters → 503. Wrong secret → 403. Responses are `Cache-Control: no-store`.
- Preview responses include `entryId`; the page puts `data-hygraph-entry-id` +
  `data-hygraph-field-api-id` on the title, summary, instructions and each
  common mistake (`data-hygraph-list-index`). The SDK draws the **Edit** overlay.
- On Studio **Save** the SDK's `save` event bumps a revision and the exercise
  is refetched (no full reload).
- Click to Edit is switched off while an audience variant is shown: those
  fields belong to the variant entry, not the base exercise.
- Only Exercise has a preview URL so far (articles/programmes: not needed yet).

## Setup (per environment)

| Where | What |
| --- | --- |
| Studio → Project settings → API Access | Permanent token "Lift Lab preview (draft, read-only)": default stage **Draft**, Read only on all models (incl. Segment, ExerciseVariant), Draft + Published, en + cs. |
| `apps/api/.env` | `HYGRAPH_PREVIEW_TOKEN`, `HYGRAPH_PREVIEW_SECRET` (`openssl rand -hex 24`). Restart the API. |
| `apps/web/.env` | `VITE_HYGRAPH_ENDPOINT` (same as `HYGRAPH_CONTENT_API_URL`), `VITE_HYGRAPH_STUDIO_URL=https://studio-eu-central-1-dev-1.hygraph.dev`. |
| Studio → Schema → Exercise → Sidebar → **Preview** widget | Name `Lift Lab (local)`, URL `http://localhost:5173/?preview=<secret>&locale={locale}#/exercises/{slug}` (pick `{locale}`/`{slug}` from the suggestions). |

The sidebar widget is Studio configuration, not part of `hygraph/schema/`
migrations: recreate it by hand after rebuilding a project or environment.
The query string sits before `#` so the hash router is unaffected.

## Verification checklist

1. Open the entry → sidebar **Lift Lab (local)** → orange preview bar appears.
2. Edit the summary, **Save** (not publish) → preview shows the new text; a
   normal tab without `?preview` still shows the published text.
3. Hover summary / a mistake → **Edit** → Studio focuses that field.
4. Switch preview locale to cs → Czech content.
5. Select *Beginner* → Edit overlays disappear.
6. Remove `?preview=…` → banner gone, published content.
7. Revert or publish the test edit.

## Gotchas

- `localhost` works inside the Studio iframe (browsers treat it as secure);
  a remote preview would need HTTPS and `frame-ancestors https://*.hygraph.dev`.
- The SDK allows `*.hygraph.com` and `*.hygraph.dev` Studio origins by default.
- The secret ends up in the Studio URL template (visible to editors). Use a
  new one for any shared deployment.
