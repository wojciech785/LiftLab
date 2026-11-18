import { useEffect, useState } from "react";
import { useFormSidebarExtension } from "@hygraph/app-sdk-react";

type Values = Record<string, unknown>;
type Check = { label: string; ok: boolean; detail?: string };

/** Localized fields live under `localization_<locale>` in the form; fall back to the plain name. */
function fieldValue(values: Values, field: string, locale: string): unknown {
  const localized = values[`localization_${locale}`];
  if (localized && typeof localized === "object" && field in localized) return (localized as Values)[field];
  return values[field];
}

function checksFor(values: Values, locale: string): Check[] {
  const summary = fieldValue(values, "summary", locale);
  const mistakes = fieldValue(values, "commonMistakes", locale);
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
 * per enabled locale. It reads the unsaved form, so results update as the
 * editor types. Step 1 also lists the form's field names (learning aid).
 */
export function ExerciseCheck() {
  const { form, model, selectedLocales, entry } = useFormSidebarExtension();
  const [values, setValues] = useState<Values>({});

  useEffect(() => {
    let unsubscribe: (() => unknown) | undefined;
    let active = true;
    // subscribeToFormState is deprecated in favour of per-field subscriptions,
    // but it shows the whole form shape, which is what we want to learn first.
    void form.subscribeToFormState(state => setValues(state.values as Values), { values: true })
      .then(stop => { if (active) unsubscribe = stop; else void stop(); });
    return () => { active = false; void unsubscribe?.(); };
  }, [form]);

  const locales = selectedLocales.filter(locale => locale.isEnabled);
  return <main className="sidebar">
    {locales.map(locale => <section key={locale.apiId}>
      <h2>{locale.displayName}</h2>
      <ul>{checksFor(values, locale.apiId).map(check => <li key={check.label} className={check.ok ? "ok" : "bad"}>
        <span aria-hidden="true">{check.ok ? "✓" : "✗"}</span> {check.label}{check.detail && <small> ({check.detail})</small>}
      </li>)}</ul>
    </section>)}
    <details>
      <summary>Form fields seen</summary>
      <p className="muted">{model.apiId} · {entry?.id ?? "new entry"}</p>
      <ul className="muted">{Object.entries(values).map(([key, value]) => <li key={key}><code>{key}</code>: {Array.isArray(value) ? `list(${value.length})` : value === null ? "null" : typeof value}</li>)}</ul>
    </details>
  </main>;
}
