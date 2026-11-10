import { useEffect, useRef, useState } from "react";
import type { ExerciseDetail, ExerciseSummary, MuscleGroupOption } from "@lift-lab/shared-types";
import { Media } from "./components/RichText";
import { mapMuscleGroups } from "./components/body-map/BodyMap";
import { MusclePicker } from "./components/muscle-map/MusclePicker";
import { getExercise, getExercises, getMuscleGroups, PAGE_SIZE, type ContentLocale } from "./api/client";

export default function ExercisesPage({locale, initialSlug = ""}: {locale: ContentLocale; initialSlug?: string}) {
  const [selected, setSelected] = useState("");
  const [list, setList] = useState<{ key: string; exercises: ExerciseSummary[]; error: string } | null>(null);
  const [groups, setGroups] = useState<MuscleGroupOption[]>([]);
  const [offset, setOffset] = useState(0);
  const [retry, setRetry] = useState(0);
  const [slug, setSlug] = useState(initialSlug);
  const [detailState, setDetailState] = useState<{ key: string; detail: ExerciseDetail | null; error: string } | null>(null);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const listKey = `${locale}/${selected}/${offset}/${retry}`;
  const current = list?.key === listKey ? list : null;
  const loading = !current;
  const exercises = current?.exercises ?? [];
  const error = current?.error ?? "";
  const detailKey = `${slug}/${locale}/${retry}`;
  const detail = detailState?.key === detailKey ? detailState.detail : null;
  const detailError = detailState?.key === detailKey ? detailState.error : "";

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([getExercises(locale, selected, offset, controller.signal), getMuscleGroups(locale, controller.signal)])
      .then(([items, muscles]) => { if (!controller.signal.aborted) { setList({ key: listKey, exercises: items, error: "" }); setGroups(muscles); } })
      .catch(() => { if (!controller.signal.aborted) setList({ key: listKey, exercises: [], error: "We couldn’t load the exercise library. Please try again." }); });
    return () => controller.abort();
  }, [locale, selected, offset, retry, listKey]);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    getExercise(slug, locale, controller.signal)
      .then(item => { if (!controller.signal.aborted) setDetailState({ key: detailKey, detail: item, error: "" }); })
      .catch(error => { if (!controller.signal.aborted) setDetailState({ key: detailKey, detail: null, error: error instanceof Error ? error.message : "Could not load exercise details." }); });
    return () => controller.abort();
  }, [slug, locale, retry, detailKey]);

  useEffect(() => { if (slug) detailHeading.current?.focus(); }, [slug]);
  const selectedGroup = groups.find(group => group.slug === selected);
  function closeDetail() { setSlug(""); opener.current?.focus(); }

  return <>
    <section className="explore" id="library" aria-labelledby="library-title"><p className="eyebrow">EXERCISE LIBRARY</p><h2 id="library-title">Find your focus.</h2><label className="muscle-filter">Muscle group <select value={selected} onChange={event => { setSelected(event.target.value); setOffset(0); closeDetail(); }}><option value="">All muscles</option>{groups.map(group => <option key={group.slug} value={group.slug}>{group.name}</option>)}</select></label>
      <MusclePicker groups={groups} selected={selected} onSelect={slug => { setSelected(slug); setOffset(0); closeDetail(); }} />
      {selectedGroup && !mapMuscleGroups([selectedGroup]).mapped.length && selectedGroup.illustration && <div className="muscle-illustration" role="group" aria-label={`${selectedGroup.name} illustration`}><Media asset={selectedGroup.illustration} /></div>}
      <div aria-live="polite" aria-busy={loading}>
        {loading ? <p className="notice">Loading exercises…</p> : error ? <div className="notice" role="alert"><p>{error}</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div> : !exercises.length ? <p className="notice">{selected ? "No exercises are available for this muscle group yet." : "The exercise library is getting ready. Check back soon."}</p> : <><div className="cards">{exercises.slice(0, PAGE_SIZE).map(exercise => <article key={exercise.slug}><p>{exercise.difficulty}</p><h3>{exercise.title}</h3><span>{groups.find(group => group.slug === exercise.primaryMuscle)?.name ?? exercise.primaryMuscle}</span><button className="detail-button" onClick={event => { opener.current = event.currentTarget; setSlug(exercise.slug); }}>View exercise<span className="sr-only">: {exercise.title}</span> →</button></article>)}</div><nav className="pagination" aria-label="Exercise pages"><button disabled={offset === 0} onClick={() => { setOffset(Math.max(0, offset - PAGE_SIZE)); closeDetail(); }}>Previous</button><span>Page {offset / PAGE_SIZE + 1}</span><button disabled={exercises.length <= PAGE_SIZE || offset + PAGE_SIZE > 10000} onClick={() => { setOffset(offset + PAGE_SIZE); closeDetail(); }}>Next</button></nav></>}
      </div>
      {slug && <section className="exercise-detail" aria-labelledby="detail-title"><button onClick={closeDetail}>Close details</button><h2 id="detail-title" tabIndex={-1} ref={detailHeading}>{detail?.title ?? "Exercise details"}</h2><div aria-live="polite">{detailError ? <div role="alert"><p>{detailError}</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div> : !detail ? <p>Loading exercise…</p> : <><p>{detail.summary}</p><dl><dt>Difficulty</dt><dd>{detail.difficulty}</dd><dt>Modality</dt><dd>{detail.modality}</dd><dt>Primary muscles</dt><dd>{detail.primaryMuscles.map(group => group.name).join(", ") || "Not specified"}</dd><dt>Equipment</dt><dd>{detail.equipment.map(item => item.name).join(", ") || "Not specified"}</dd>{detail.durationMinutes !== null && <><dt>Estimated duration</dt><dd>{detail.durationMinutes} minutes</dd></>}</dl><h3>Instructions</h3><p className="instructions">{detail.instructions}</p>{detail.commonMistakes.length > 0 && <><h3>Common mistakes</h3><ul className="common-mistakes">{detail.commonMistakes.map(mistake => <li key={mistake}>{mistake}</li>)}</ul></>}</>}</div></section>}
    </section>
  </>;
}
