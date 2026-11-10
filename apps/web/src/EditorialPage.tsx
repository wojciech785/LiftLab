import { useEffect, useState } from "react";
import type { ArticleBlock, ArticleDetail, ArticleSummary, ContentLink, ProgrammeDetail, ProgrammeSummary } from "@lift-lab/shared-types";
import { getArticle, getArticles, getProgramme, getProgrammes, PAGE_SIZE, type ContentLocale } from "./api/client";
import { Media, RichText, safeUrl } from "./components/RichText";
import { BodyMap } from "./components/body-map/BodyMap";

const href = (section: string, slug: string) => `#/${section}/${encodeURIComponent(slug)}`;
function Links({items, section}: {items: ContentLink[]; section: string}) {
  return <ul className="content-links">{items.map(item => <li key={item.slug}><a href={href(section,item.slug)}>{item.title}</a></li>)}</ul>;
}
export function Block({block}: {block: ArticleBlock}) {
  switch (block.kind) {
    case "richText": return <RichText value={block.body} />;
    case "exercises": return <section className="article-block">{block.heading && <h2>{block.heading}</h2>}<Links items={block.exercises} section="exercises" /></section>;
    case "muscles": return <section className="article-block">{block.heading && <h2>{block.heading}</h2>}<RichText value={block.body} /><div className="muscle-block"><BodyMap groups={block.muscleGroups} highlighted={block.muscleGroups.map(group=>group.slug)} /><ul>{block.muscleGroups.map(group=><li key={group.slug}>{group.name}</li>)}</ul></div></section>;
    case "table": return <div className="table-scroll"><table>{block.caption && <caption>{block.caption}</caption>}<thead><tr>{block.columnHeadings.map((heading,i)=><th key={i} scope="col">{heading}</th>)}</tr></thead><tbody>{block.rows.map((row,i)=><tr key={i}>{block.columnHeadings.map((_,j)=><td key={j}>{row[j] ?? "—"}</td>)}</tr>)}</tbody></table></div>;
    case "quote": return <blockquote><p>{block.quote}</p>{block.coach && <footer>{block.coach.name} · {block.coach.role}</footer>}</blockquote>;
    case "callout": return <aside className="callout"><p className="eyebrow">{block.tone}</p><h2>{block.heading}</h2><RichText value={block.body} />{safeUrl(block.destination) && <a href={safeUrl(block.destination)}>Read more</a>}</aside>;
    case "gallery": return <section className="article-block">{block.heading && <h2>{block.heading}</h2>}<div className="image-gallery">{block.items.map((item,i)=><div key={i}><Media asset={item.asset} alt={item.altTextOverride} />{item.caption && <p>{item.caption}</p>}</div>)}</div></section>;
    default: return <p className="notice">This content block is not available in this view.</p>;
  }
}
function Programme({value:p}: {value: ProgrammeDetail}) {
  return <article className="editorial-detail"><h1>{p.title}</h1><p className="content-meta">{p.level} · {p.durationWeeks} weeks · {p.sessionsPerWeek} sessions / week · {p.goal.replaceAll("_"," ")}</p>{p.coach && <p>{p.coach.name} · {p.coach.role}</p>}{p.heroAsset && <Media asset={p.heroAsset} />}<RichText value={p.overview} />
    {p.sessions.length ? p.sessions.map((session,i)=><section className="session" key={i}><h2>{session.order}. {session.title}</h2><p>About {session.estimatedMinutes} minutes</p>{session.warmup && <><h3>Warm-up</h3><RichText value={session.warmup} /></>}
      <ol className="prescriptions">{session.exerciseSets.map((set,j)=><li key={j}><h3>{set.exercise ? <a href={href("exercises",set.exercise.slug)}>{set.exercise.title}</a> : "Exercise unavailable"}</h3><p>{set.sets} sets × {set.repRange}{set.restSeconds !== null && ` · ${set.restSeconds}s rest`}{set.tempo && ` · Tempo ${set.tempo}`}</p><RichText value={set.coachNote} /></li>)}</ol>{session.cooldown && <><h3>Cool-down</h3><RichText value={session.cooldown} /></>}
    </section>) : <p>No sessions are available yet.</p>}
  </article>;
}
function Article({value:a}: {value: ArticleDetail}) {
  return <article className="editorial-detail"><h1>{a.title}</h1><p className="article-excerpt">{a.excerpt}</p>{a.author && <p className="content-meta">{a.author.name} · {a.author.role}</p>}{a.heroAsset && <Media asset={a.heroAsset} />}
    {a.contentBlocks.map((block,i)=><Block key={i} block={block} />)}
    {!!a.relatedExercises.length && <section><h2>Related exercises</h2><Links items={a.relatedExercises} section="exercises" /></section>}
    {!!a.relatedProgrammes.length && <section><h2>Related programmes</h2><Links items={a.relatedProgrammes} section="programmes" /></section>}
  </article>;
}
type Data = ProgrammeSummary[] | ArticleSummary[] | ProgrammeDetail | ArticleDetail;
export function EditorialPage({section,slug,locale}: {section: "programmes" | "articles"; slug: string; locale: ContentLocale}) {
  const [state,setState] = useState<{key:string;data:Data | null;error:string}>({key:"",data:null,error:""});
  const [offset,setOffset] = useState(0);
  const [retry,setRetry] = useState(0);
  const key = `${section}/${slug}/${locale}/${offset}/${retry}`;
  useEffect(()=>{
    const controller = new AbortController();
    const request = section === "programmes" ? (slug ? getProgramme(slug,locale,controller.signal) : getProgrammes(locale,offset,controller.signal)) : (slug ? getArticle(slug,locale,controller.signal) : getArticles(locale,offset,controller.signal));
    request.then(data=>{if(!controller.signal.aborted)setState({key,data,error:""});}).catch(error=>{if(!controller.signal.aborted)setState({key,data:null,error:error instanceof Error ? error.message : "Could not load content."});});
    return ()=>controller.abort();
  },[section,slug,locale,offset,retry,key]);
  const data = state.key === key ? state.data : null;
  const error = state.key === key ? state.error : "";
  return <section className="explore editorial-page">
    {slug && <a className="back-link" href={`#/${section}`}>← All {section}</a>}
    <div aria-live="polite" aria-busy={!data && !error}>
      {error ? <div className="notice" role="alert"><h1>Content unavailable</h1><p>{error}</p><button onClick={()=>setRetry(n=>n+1)}>Try again</button></div> : !data ? <p className="notice">Loading {section}…</p> : Array.isArray(data) ? <>
        <p className="eyebrow">{section === "programmes" ? "TRAIN WITH STRUCTURE" : "LEARN THE MOVEMENTS"}</p><h1>{section === "programmes" ? "Programmes" : "Articles"}</h1>
        {!data.length ? <p className="notice">No {section} are available yet.</p> : <div className="cards">{data.slice(0,PAGE_SIZE).map(item=><article key={item.slug}><h2><a href={href(section,item.slug)}>{item.title}</a></h2>{"excerpt" in item ? <p className="card-description">{item.excerpt}</p> : <p>{item.level} · {item.durationWeeks} weeks · {item.sessionsPerWeek} sessions / week</p>}</article>)}</div>}
        <nav className="pagination" aria-label={`${section} pages`}><button disabled={offset===0} onClick={()=>setOffset(Math.max(0,offset-PAGE_SIZE))}>Previous</button><span>Page {offset/PAGE_SIZE+1}</span><button disabled={data.length<=PAGE_SIZE || offset+PAGE_SIZE>10000} onClick={()=>setOffset(offset+PAGE_SIZE)}>Next</button></nav>
      </> : "contentBlocks" in data ? <Article value={data} /> : <Programme value={data} />}
    </div>
  </section>;
}
