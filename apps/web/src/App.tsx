import { useEffect, useState } from "react";
import type { ExerciseSummary } from "@lift-lab/shared-types";
import { getApiStatus, getExercises } from "./api/client";
import { MuscleMap } from "./components/muscle-map/MuscleMap";

const groups = ["chest", "back", "legs"];

export default function App() {
  const [selected, setSelected] = useState("chest");
  const [exercises, setExercises] = useState<ExerciseSummary[]>([]);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => { Promise.all([getExercises(), getApiStatus()]).then(([items, status]) => { setExercises(items); setApiReady(status.hygraphConfigured); }).catch(() => setExercises([])); }, []);
  const visible = exercises.filter((exercise) => exercise.primaryMuscle === selected);

  return <main>
    <header><span className="wordmark">LIFT LAB</span><span className="status">{apiReady ? "Hygraph connected" : "Local skeleton mode"}</span></header>
    <section className="hero"><div><p className="eyebrow">STRENGTH, EXPLAINED</p><h1>Train with<br /><em>intention.</em></h1><p className="intro">Choose a muscle group to explore the first Lift Lab data flow: React → NestJS → Hygraph.</p></div><MuscleMap selected={selected} onSelect={setSelected} /></section>
    <section className="explore"><p className="eyebrow">MUSCLE EXPLORER</p><div className="group-picker" role="group" aria-label="Select muscle group">{groups.map((group) => <button className={group === selected ? "active" : ""} key={group} onClick={() => setSelected(group)}>{group}</button>)}</div><div className="cards">{visible.map((exercise) => <article key={exercise.slug}><p>{exercise.difficulty}</p><h2>{exercise.title}</h2><span>{exercise.primaryMuscle}</span></article>)}{!visible.length && <p>Start the API to load the local skeleton exercises.</p>}</div></section>
  </main>;
}
