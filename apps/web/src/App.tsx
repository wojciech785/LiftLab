import { useEffect, useRef, useState } from "react";
import type { ContentLocale } from "./api/client";
import ExercisesPage from "./ExercisesPage";
import { EditorialPage } from "./EditorialPage";
import { WorkoutIntentPage } from "./WorkoutIntentPage";
import "./styles/intents.css";
import "./styles/editorial.css";

function route() {
  const match = window.location.hash.match(/^#\/(exercises|programmes|articles|request)(?:\/([^/]+))?$/);
  let slug = "";
  try { slug = decodeURIComponent(match?.[2] ?? ""); } catch { /* Invalid URL renders the list. */ }
  return { section: (match?.[1] ?? "exercises") as "exercises" | "programmes" | "articles" | "request", slug };
}
export default function App() {
  const [current, setCurrent] = useState(route);
  const [locale, setLocale] = useState<ContentLocale>("en");
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const change = () => { if (!window.location.hash.startsWith("#/")) return; setCurrent(route()); content.current?.focus(); };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  return <>
    <a className="skip-link" href="#page-content">Skip to content</a>
    <header><a className="wordmark" href="#/exercises">LIFT LAB</a><nav className="site-nav" aria-label="Main navigation">
      {(["exercises", "programmes", "articles", "request"] as const).map(section => <a key={section} href={`#/${section}`} aria-current={current.section === section ? "page" : undefined}>{section === "request" ? "Workout request" : section}</a>)}
    </nav><label className="locale-picker">Content language <select value={locale} onChange={event => setLocale(event.target.value as ContentLocale)}><option value="en">English</option><option value="cs">Čeština</option></select></label></header>
    <main>
      {current.section === "exercises" && !current.slug && <section className="hero"><div><p className="eyebrow">STRENGTH, EXPLAINED</p><h1>Train with<br /><em>intention.</em></h1><p className="intro">Explore exercises, find your focus, and learn the movements behind your next session.</p><a className="browse-link" href="#library">Explore the library ↓</a></div><aside className="hero-note"><span className="eyebrow">YOUR NEXT MOVEMENT</span><p>Start with a muscle.<br />Find your exercise.<br /><em>Make it count.</em></p></aside></section>}
      <div id="page-content" ref={content} tabIndex={-1}>
        {current.section === "request" ? <WorkoutIntentPage locale={locale} /> : current.section === "exercises" ? <ExercisesPage key={current.slug} locale={locale} initialSlug={current.slug} /> : <EditorialPage key={`${current.section}/${current.slug}`} section={current.section} slug={current.slug} locale={locale} />}
      </div>
    </main>
  </>;
}
