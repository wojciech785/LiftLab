import type { ExerciseSummary } from "@lift-lab/shared-types";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

export async function getExercises(): Promise<ExerciseSummary[]> {
  const response = await fetch(`${apiUrl}/exercises`);
  if (!response.ok) throw new Error("Could not load exercises from the API.");
  return response.json() as Promise<ExerciseSummary[]>;
}

export async function getApiStatus(): Promise<{ hygraphConfigured: boolean }> {
  const response = await fetch(`${apiUrl}/content-status`);
  if (!response.ok) throw new Error("Could not reach the API.");
  return response.json() as Promise<{ hygraphConfigured: boolean }>;
}
