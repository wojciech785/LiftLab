import { useEffect, useState } from "react";
import { useFormSidebarExtension } from "@hygraph/app-sdk-react";

type Check = { label: string; ok: boolean; detail?: string };
/**
 * Studio's form keeps localized values under `localizations.<locale>.<field>`
 * (final-form dot paths); non-localized fields sit at the top level. Learned
 * from form.getState() on 2026-11-18, see docs/app-framework.md.
 */
const fieldName = (field: string, locale: string) => `localizations.${locale}.${field}`;

function checksFor(summary: unknown, mistakes: unknown): Check[] {
  const list = Array.isArray(mistakes) ? mistakes.filter((item): item is string => typeof item === "string") : [];
  const badLength = list.filter(item => item.trim().length < 3 || item.trim().length > 140);
  return [
    { label: "Summary filled in", ok: typeof summary === "string" && summary.trim().length > 0 },
    { label: "At least 2 common mistakes", ok: list.length >= 2, detail: `${list.length} added` },
    { label: "Mistakes are 3–140 characters", ok: badLength.length === 0, detail: badLength.length ? `${badLength.length} out of range` : undefined },
    { label: "No duplicate mistakes", ok: new Set(list.map(item => item.trim().toLowerCase())).size === list.length },
  ];
}

/**
 * formSidebar element: live publishing checklist for the open Exercise entry,
 * per enabled locale. It subscribes to the unsaved form fields, so results
 * update as the editor types.
 */
export function ExerciseCheck() {
  const { form, selectedLocales } = useFormSidebarExtension();
  const locales = selectedLocales.filter(locale => locale.isEnabled);
  // A string key, so the subscriptions are not recreated on every render.
  const localeKey = locales.map(locale => locale.apiId).join(",");
  const [values, setValues] = useState<Record<string, unknown>>({});

  // Summary: live per-field subscription (supported API).
  useEffect(() => {
    let active = true;
    const stops: Array<() => unknown> = [];
    for (const locale of localeKey.split(",").filter(Boolean)) {
      const name = fieldName("summary", locale);
      form.subscribeToFieldState(name, state => setValues(current => ({ ...current, [name]: state.value })), { value: true })
        .then(stop => { if (active) stops.push(stop); else void stop(); })
        .catch((error: unknown) => console.warn(`[exercise-check] cannot read ${name}`, error));
    }
    return () => { active = false; stops.forEach(stop => void stop()); };
  }, [form, localeKey]);

  // Common mistakes: Studio's subscribeToFieldState throws for scalar string lists
  // ("Cannot use 'in' operator to search for 'stage' in <item>": it treats list
  // items as related entries), so read them from the form state once a second.
  useEffect(() => {
    let active = true;
    const read = () => void form.getState<{ localizations?: Record<string, { commonMistakes?: unknown }> }>().then(state => {
      if (!active) return;
      const next = Object.fromEntries(localeKey.split(",").filter(Boolean).map(locale =>
        [fieldName("commonMistakes", locale), state.values.localizations?.[locale]?.commonMistakes]));
      setValues(current => JSON.stringify(Object.fromEntries(Object.keys(next).map(key => [key, current[key]]))) === JSON.stringify(next) ? current : { ...current, ...next });
    }, () => undefined);
    read();
    const timer = window.setInterval(read, 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [form, localeKey]);

  return <main className="sidebar">
    {locales.map(locale => <section key={locale.apiId}>
      <h2>{locale.displayName}</h2>
      <ul>{checksFor(values[fieldName("summary", locale.apiId)], values[fieldName("commonMistakes", locale.apiId)]).map(check =>
        <li key={check.label} className={check.ok ? "ok" : "bad"}>
          <span aria-hidden="true">{check.ok ? "✓" : "✗"}</span> {check.label}{check.detail && <small> ({check.detail})</small>}
        </li>)}</ul>
    </section>)}
  </main>;
}
