# App Framework: "Lift Lab editor tools" (Enterprise)

A small Vite + React app (`apps/hygraph-app`) that Studio embeds in iframes.
First element: **Exercise check**, a sidebar panel on Exercise entries with
live, per-locale publishing checks. Verified 2026-11-18 in `development`.

## Pieces

| Piece | Where | Notes |
| --- | --- | --- |
| App registration | Studio (dev deployment) → User settings → Your apps | Name *Lift Lab editor tools*, API ID `lift-lab-editor-tools`, Setup URL `http://localhost:5174/setup`, avatar `http://localhost:5174/icon.svg`. **No API permissions** (permissions cannot be changed after registering). Access: private, Lift Lab project. |
| Element | same form, Elements tab | *Exercise check*, API ID `exercise-check`, type **formSidebar**, URL `http://localhost:5174/sidebar/exercise-check`. |
| Installation | per environment: Project settings → Apps → Install | Studio opens `/setup`; **Install app** sets the installation `COMPLETED`. Installed in `development` (2026-11-18); install in `master` the same way. |
| Sidebar placement | Schema → Exercise → Sidebar | Add *Exercise check*. Studio config, not in `hygraph/schema/` migrations. |
| Code | `apps/hygraph-app` | `npm run dev:app` (port 5174) must run while using it: Studio loads the pages from your browser. |

## What the panel checks (per enabled locale)

Summary filled in · at least 2 common mistakes · each 3–140 characters · no
duplicates. It reads the **unsaved** form, so editors see problems before
saving (Hygraph's own validation runs only on save).

## Gotchas found while building it

1. **SDK + Vite: `zoid` is `undefined`.** `@hygraph/app-sdk` does
   `import zoid from "@graphcms/zoid/lib/zoid.js"`; that webpack bundle is
   flagged `__esModule` without a default export, so Vite's interop returns
   `undefined`. Symptom: `TypeError: Cannot read properties of undefined
   (reading 'create')` in the app frame, and in Studio "Could not connect to
   …/setup" / "Loading component timed out after 45000 milliseconds". Fix: alias
   the import to the package entry (`@graphcms/zoid`), which sets
   `module.exports.default` (see `vite.config.ts`). Restart with
   `npm run dev:app -- --force` after changing it (Vite caches deps).
2. **No `<StrictMode>`** around the SDK `Wrapper`: double-run effects would
   register the same zoid component twice.
3. **Form field names.** Localized values live at
   `localizations.<locale>.<field>` (e.g. `localizations.cs.commonMistakes`);
   non-localized fields at the top level (`slug`, `primaryMuscles`, …). Found
   with `form.getState()`.
4. **`subscribeToFormState` delivered nothing**; use per-field
   `subscribeToFieldState`.
5. **`subscribeToFieldState` fails for scalar string lists** (Studio error
   `Cannot use 'in' operator to search for 'stage' in <item>`: it treats list
   items as related entries). Workaround: read such fields via
   `form.getState()` once a second. Worth reporting to the App Framework team,
   together with gotcha 1.
6. SDK pinned to `@hygraph/app-sdk-react` **0.0.8** (0.0.9 was one day old and
   has identical code).

## Debugging checklist

- Open `http://localhost:5174/setup` directly: "This page only works inside
  Hygraph Studio (SDK state: error)" means the server is fine.
- In Studio's console, filter `UIX`: `initializing …` followed by
  `initialized` means the handshake worked. Pass `debug` to `<Wrapper>` for
  these logs.
- Only works for people whose browser can reach the dev server (localhost).
  For a shared setup, host the app on HTTPS and update the URLs in the
  registration.

## Next ideas (SDD §14.5)

Muscle map in the sidebar (needs relation values from the form), a YouTube
tutorial field element (needs a server-side YouTube API key).
