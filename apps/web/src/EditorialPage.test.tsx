// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Block, EditorialPage } from "./EditorialPage";
import { Media, RichText, safeUrl } from "./components/RichText";
import { getArticle, getArticles, getProgramme, getProgrammes } from "./api/client";

vi.mock("./api/client",()=>({getArticle:vi.fn(),getArticles:vi.fn(),getProgramme:vi.fn(),getProgrammes:vi.fn(),PAGE_SIZE:12}));
const rich = {children:[{type:'paragraph',children:[{text:'Practice notes',bold:true}]}]};
beforeEach(()=>{
  vi.mocked(getArticles).mockResolvedValue([{title:'Guide',slug:'guide',excerpt:'Learn the movements'}]);
  vi.mocked(getProgrammes).mockResolvedValue([]);
  vi.mocked(getProgramme).mockResolvedValue({title:'Practice',slug:'practice',goal:'general_fitness',level:'beginner',durationWeeks:2,sessionsPerWeek:3,overview:rich,coach:null,heroAsset:null,
    sessions:[{title:'First session',order:1,estimatedMinutes:20,warmup:rich,cooldown:null,exerciseSets:[{order:1,sets:2,repRange:'6–8',restSeconds:90,tempo:null,coachNote:null,exercise:{title:'Squat',slug:'squat'}}]}]});
});
afterEach(()=>{cleanup();vi.resetAllMocks();});

it('lists article links with refreshable hash URLs',async()=>{
  render(<EditorialPage section="articles" slug="" locale="en" />);
  expect((await screen.findByRole('link',{name:'Guide'})).getAttribute('href')).toBe('#/articles/guide');
});
it('shows ordered prescriptions and links to exercise details',async()=>{
  render(<EditorialPage section="programmes" slug="practice" locale="en" />);
  await screen.findByRole('heading',{name:'Practice',level:1});
  expect(screen.getByRole('heading',{name:'1. First session'})).toBeTruthy();
  expect(screen.getByText('2 sets × 6–8 · 90s rest')).toBeTruthy();
  expect(screen.getByRole('link',{name:'Squat'}).getAttribute('href')).toBe('#/exercises/squat');
});
it('recovers from detail failure and reloads localized content',async()=>{
  const user = userEvent.setup();
  vi.mocked(getProgramme).mockRejectedValueOnce(new Error('Temporarily unavailable'));
  const {rerender} = render(<EditorialPage section="programmes" slug="practice" locale="en" />);
  await screen.findByRole('alert');
  await user.click(screen.getByRole('button',{name:'Try again'}));
  await screen.findByRole('heading',{name:'Practice',level:1});
  rerender(<EditorialPage section="programmes" slug="practice" locale="cs" />);
  await waitFor(()=>expect(getProgramme).toHaveBeenLastCalledWith('practice','cs',expect.any(AbortSignal)));
});
it('renders modular tables and missing gallery media without broken images',()=>{
  render(<><Block block={{kind:'table',caption:'Comparison',columnHeadings:['Option','Setup'],rows:[['Bodyweight','Floor']]}} /><Block block={{kind:'gallery',heading:'Gallery',items:[{asset:null,caption:'Pending',altTextOverride:null}]}} /></>);
  expect(screen.getByRole('table',{name:'Comparison'})).toBeTruthy();
  expect(screen.getAllByRole('columnheader').length).toBe(2);
  expect(screen.queryByRole('img')).toBeNull();
  expect(screen.getByText(/awaiting accessibility/)).toBeTruthy();
});
it('renders formatted rich text as React nodes and strips executable URLs',()=>{
  render(<RichText value={{children:[{type:'paragraph',children:[{text:'Bold',bold:true},{type:'link',href:'javascript:alert(1)',children:[{text:'Unsafe'}]},{type:'link',href:'https://example.com',children:[{text:'Safe'}]}]}]}} />);
  expect(screen.getByText('Bold').tagName).toBe('STRONG');
  expect(screen.queryByRole('link',{name:'Unsafe'})).toBeNull();
  expect(screen.getByRole('link',{name:'Safe'}).getAttribute('href')).toBe('https://example.com');
  for(const url of ['//example.com','data:text/html,test','java\nscript:alert(1)','\\evil.test']) expect(safeUrl(url)).toBeUndefined();
});
it('shows licensed images with alt text and attribution',()=>{
  render(<Media asset={{url:'https://example.com/image.jpg',altText:'Dumbbells',rightsSource:'Example, CC0'}} />);
  expect(screen.getByRole('img',{name:'Dumbbells'})).toBeTruthy();
  expect(screen.getByText('Source / rights: Example, CC0')).toBeTruthy();
});
it('shows an empty programme list',async()=>{
  render(<EditorialPage section="programmes" slug="" locale="en" />);
  expect(await screen.findByText('No programmes are available yet.')).toBeTruthy();
});
it('renders article blocks in CMS order',async()=>{
  vi.mocked(getArticle).mockResolvedValue({title:'Guide',slug:'guide',excerpt:'Overview',author:null,heroAsset:null,relatedExercises:[],relatedProgrammes:[],contentBlocks:[{kind:'richText',body:rich},{kind:'callout',tone:'tip',heading:'Remember',body:rich,destination:null}]});
  render(<EditorialPage section="articles" slug="guide" locale="en" />);
  await screen.findByRole('heading',{name:'Guide',level:1});
  expect(screen.getByRole('heading',{name:'Remember',level:2})).toBeTruthy();
});
