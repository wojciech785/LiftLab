import { useEffect, useRef, useState, type FormEvent } from "react";
import type { MuscleGroupSummary, WorkoutIntentRequest } from "@lift-lab/shared-types";
import { getMuscleGroups, saveWorkoutIntent, type ContentLocale } from "./api/client";

export function WorkoutIntentPage({locale}: {locale: ContentLocale}) {
  const [groups,setGroups] = useState<MuscleGroupSummary[]>([]);
  const [groupsErrorLocale,setGroupsErrorLocale] = useState<ContentLocale | null>(null);
  const groupsError = groupsErrorLocale === locale;
  const [goal,setGoal] = useState<WorkoutIntentRequest["goal"]>("general-fitness");
  const [minutes,setMinutes] = useState(45);
  const [level,setLevel] = useState<WorkoutIntentRequest["experienceLevel"]>("beginner");
  const [selected,setSelected] = useState<string[]>([]);
  const [email,setEmail] = useState("");
  const [consent,setConsent] = useState(false);
  const [status,setStatus] = useState<"idle"|"saving"|"saved">("idle");
  const [error,setError] = useState("");
  const pending = useRef(false);
  const mounted = useRef(true);
  useEffect(()=>{mounted.current=true;return ()=>{mounted.current=false;};},[]);
  useEffect(()=>{
    const controller = new AbortController();
    getMuscleGroups(locale,controller.signal).then(items=>{if(!controller.signal.aborted){setGroups(items);setGroupsErrorLocale(null);}}).catch(()=>{if(!controller.signal.aborted)setGroupsErrorLocale(locale);});
    return ()=>controller.abort();
  },[locale]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending.current) return;
    if (!consent) {setError("Please consent to storing the request before saving.");return;}
    pending.current=true;setStatus("saving");setError("");
    try {
      await saveWorkoutIntent({goal,availableMinutes:minutes,experienceLevel:level,selectedMuscles:selected,consent:true,...(email.trim()?{contactEmail:email.trim()}: {})});
      if(mounted.current){setEmail("");setConsent(false);setStatus("saved");}
    } catch(e) {if(mounted.current){setError(e instanceof Error?e.message:"Could not save the request.");setStatus("idle");}}
    finally {pending.current=false;}
  }
  return <section className="explore intent-page"><p className="eyebrow">TRAIN WITH INTENTION</p><h1>Save a workout request</h1><p>Record your goal and available time. This saves a request for later review; it does not generate a personalized training plan.</p>
    {status==="saved" ? <div className="notice" role="status"><h2>Workout request saved</h2><p>Your request is stored for review. No email is sent automatically.</p><button onClick={()=>{setSelected([]);setStatus("idle");}}>Save another request</button></div> : <form className="intent-form" onSubmit={submit} aria-busy={status==="saving"}>
      <fieldset disabled={status==="saving"}><legend className="sr-only">Workout request details</legend>
        <label>Training goal<select value={goal} onChange={e=>setGoal(e.target.value as WorkoutIntentRequest["goal"])}><option value="general-fitness">General fitness</option><option value="strength">Strength</option><option value="hypertrophy">Hypertrophy</option><option value="endurance">Endurance</option><option value="mobility">Mobility</option></select></label>
        <label>Available time (minutes)<input type="number" min={15} max={180} step={1} required value={minutes} onChange={e=>setMinutes(e.target.valueAsNumber)} /></label>
        <label>Experience level<select value={level} onChange={e=>setLevel(e.target.value as WorkoutIntentRequest["experienceLevel"])}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label>
        <fieldset className="muscle-choices"><legend>Muscle focus (optional, up to three)</legend>{groupsError ? <p role="status">Muscle options could not load. You can still save a request without a muscle focus.</p> : !groups.length ? <p>No muscle options available.</p> : groups.map(group=><label key={group.slug}><input type="checkbox" checked={selected.includes(group.slug)} disabled={!selected.includes(group.slug)&&selected.length>=3} onChange={e=>setSelected(current=>e.target.checked?[...current,group.slug]:current.filter(slug=>slug!==group.slug))} />{group.name}</label>)}</fieldset>
        <label>Contact email (optional)<input type="email" autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} aria-describedby="email-help" /></label><p id="email-help">Only provide an email if you want it stored with this request for a possible response. It does not subscribe you to emails.</p>
        <label className="consent"><input type="checkbox" required checked={consent} onChange={e=>setConsent(e.target.checked)} />I agree to store my workout preferences and optional email in Lift Lab’s content system for reviewing this request.</label>
        {error && <p role="alert">{error}</p>}<button type="submit">{status==="saving"?"Saving…":"Save workout request"}</button>
      </fieldset>
    </form>}
  </section>;
}
