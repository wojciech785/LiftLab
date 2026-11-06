import type { ArticleDetail, ArticleSummary, ExerciseDetail, ExerciseSummary, MuscleGroupSummary, ProgrammeDetail, ProgrammeSummary } from "@lift-lab/shared-types";

const apiUrl = import.meta.env.VITE_API_URL ?? "/api";

export type ContentLocale = "en" | "cs";
export const PAGE_SIZE = 12;

export async function getExercises(locale: ContentLocale, muscle: string, offset: number, signal: AbortSignal): Promise<ExerciseSummary[]> {
  const params = new URLSearchParams({ locale, limit: String(PAGE_SIZE + 1), offset: String(offset) });
  if (muscle) params.set("muscle", muscle);
  const response = await fetch(`${apiUrl}/exercises?${params}`, { signal });
  if (!response.ok) throw new Error("Could not load exercises from the API.");
  return response.json() as Promise<ExerciseSummary[]>;
}

export async function getMuscleGroups(locale: ContentLocale, signal: AbortSignal): Promise<MuscleGroupSummary[]> {
  const response = await fetch(`${apiUrl}/muscle-groups?locale=${locale}`, { signal });
  if (!response.ok) throw new Error("Could not load muscle groups.");
  return response.json() as Promise<MuscleGroupSummary[]>;
}

export async function getExercise(slug: string, locale: ContentLocale, signal: AbortSignal): Promise<ExerciseDetail> {
  const response = await fetch(`${apiUrl}/exercises/${encodeURIComponent(slug)}?locale=${locale}`, { signal });
  if (!response.ok) throw new Error(response.status === 404 ? "This exercise is no longer available." : "Could not load exercise details.");
  return response.json() as Promise<ExerciseDetail>;
}

export async function getApiStatus(): Promise<{ hygraphConfigured: boolean }> {
  const response = await fetch(`${apiUrl}/content-status`);
  if (!response.ok) throw new Error("Could not reach the API.");
  return response.json() as Promise<{ hygraphConfigured: boolean }>;
}

async function content<T>(path: string, locale: ContentLocale, signal: AbortSignal, offset?: number): Promise<T> {
  const params = new URLSearchParams({locale});
  if (offset !== undefined) { params.set("offset", String(offset)); params.set("limit", String(PAGE_SIZE + 1)); }
  const response = await fetch(`${apiUrl}/${path}?${params}`, {signal});
  if (!response.ok) throw new Error(response.status === 404 ? "This content is no longer available." : "Could not load this content. Please try again.");
  return response.json() as Promise<T>;
}
export const getProgrammes = (locale: ContentLocale, offset: number, signal: AbortSignal) => content<ProgrammeSummary[]>("programmes",locale,signal,offset);
export const getProgramme = (slug: string, locale: ContentLocale, signal: AbortSignal) => content<ProgrammeDetail>(`programmes/${encodeURIComponent(slug)}`,locale,signal);
export const getArticles = (locale: ContentLocale, offset: number, signal: AbortSignal) => content<ArticleSummary[]>("articles",locale,signal,offset);
export const getArticle = (slug: string, locale: ContentLocale, signal: AbortSignal) => content<ArticleDetail>(`articles/${encodeURIComponent(slug)}`,locale,signal);
