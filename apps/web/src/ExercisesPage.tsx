import { useEffect, useRef, useState } from "react";
import type { ExerciseDetail, ExerciseSummary, MuscleGroupOption } from "@lift-lab/shared-types";
import { Media } from "./components/RichText";
import { getExercise, getExercises, getMuscleGroups, PAGE_SIZE, type ContentLocale } from "./api/client";

export default function ExercisesPage({locale, initialSlug = ""}: {locale: ContentLocale; initialSlug?: string}) {
  const [selected, setSelected] = useState("");
  const [exercises, setExercises] = useState<ExerciseSummary[]>([]);
  const [groups, setGroups] = useState<MuscleGroupOption[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [slug, setSlug] = useState(initialSlug);
  const [detail, setDetail] = useState<ExerciseDetail | null>(null);
  const [detailError, setDetailError] = useState("");
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(""); setExercises([]);
    Promise.all([getExercises(locale, selected, offset, controller.signal), getMuscleGroups(locale, controller.signal)])
      .then(([items, muscles]) => { if (!controller.signal.aborted) { setExercises(items); setGroups(muscles); } })
      .catch(() => { if (!controller.signal.aborted) setError("We couldn’t load the exercise library. Please try again."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [locale, selected, offset, retry]);

  useEffect(() => {
    if (!slug) return;
    const controller = new AbortController();
    setDetail(null); setDetailError("");
    getExercise(slug, locale, controller.signal)
      .then(item => { if (!controller.signal.aborted) setDetail(item); })
      .catch(error => { if (!controller.signal.aborted) setDetailError(error instanceof Error ? error.message : "Could not load exercise details."); });
    return () => controller.abort();
  }, [slug, locale, retry]);

  useEffect(() => { if (slug) detailHeading.current?.focus(); }, [slug]);
  const selectedGroup = groups.find(group => group.slug === selected);
  function closeDetail() { setSlug(""); setDetail(null); opener.current?.focus(); }

  return <>
    <section className="explore" id="library" aria-labelledby="library-title"><p className="eyebrow">EXERCISE LIBRARY</p><h2 id="library-title">Find your focus.</h2><label className="muscle-filter">Muscle group <select value={selected} onChange={event => { setSelected(event.target.value); setOffset(0); closeDetail(); }}><option value="">All muscles</option>{groups.map(group => <option key={group.slug} value={group.slug}>{group.name}</option>)}</select></label>
      {selectedGroup?.illustration && <div className="muscle-illustration" aria-label={`${selectedGroup.name} illustration`} role="group"><Media asset={selectedGroup.illustration} /></div>}
      <div aria-live="polite" aria-busy={loading}>
        {loading ? <p className="notice">Loading exercises…</p> : error ? <div className="notice" role="alert"><p>{error}</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div> : !exercises.length ? <p className="notice">{selected ? "No exercises are available for this muscle group yet." : "The exercise library is getting ready. Check back soon."}</p> : <><div className="cards">{exercises.slice(0, PAGE_SIZE).map(exercise => <article key={exercise.slug}><p>{exercise.difficulty}</p><h3>{exercise.title}</h3><span>{groups.find(group => group.slug === exercise.primaryMuscle)?.name ?? exercise.primaryMuscle}</span><button className="detail-button" onClick={event => { opener.current = event.currentTarget; setDetail(null); setDetailError(""); setSlug(exercise.slug); }}>View exercise<span className="sr-only">: {exercise.title}</span> →</button></article>)}</div><nav className="pagination" aria-label="Exercise pages"><button disabled={offset === 0} onClick={() => { setOffset(Math.max(0, offset - PAGE_SIZE)); closeDetail(); }}>Previous</button><span>Page {offset / PAGE_SIZE + 1}</span><button disabled={exercises.length <= PAGE_SIZE || offset + PAGE_SIZE > 10000} onClick={() => { setOffset(offset + PAGE_SIZE); closeDetail(); }}>Next</button></nav></>}
      </div>
      {slug && <section className="exercise-detail" aria-labelledby="detail-title"><button onClick={closeDetail}>Close details</button><h2 id="detail-title" tabIndex={-1} ref={detailHeading}>{detail?.title ?? "Exercise details"}</h2><div aria-live="polite">{detailError ? <div role="alert"><p>{detailError}</p><button onClick={() => setRetry(value => value + 1)}>Try again</button></div> : !detail ? <p>Loading exercise…</p> : <><p>{detail.summary}</p><dl><dt>Difficulty</dt><dd>{detail.difficulty}</dd><dt>Modality</dt><dd>{detail.modality}</dd><dt>Primary muscles</dt><dd>{detail.primaryMuscles.map(group => group.name).join(", ") || "Not specified"}</dd><dt>Equipment</dt><dd>{detail.equipment.map(item => item.name).join(", ") || "Not specified"}</dd>{detail.durationMinutes !== null && <><dt>Estimated duration</dt><dd>{detail.durationMinutes} minutes</dd></>}</dl><h3>Instructions</h3><p className="instructions">{detail.instructions}</p></>}</div></section>}
    </section>
  </>;
}
