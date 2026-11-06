import { BadRequestException, Controller, Get, Injectable, Module, NotFoundException, Param, Query } from "@nestjs/common";
import type { ExerciseDetail, ExerciseSummary, MuscleGroupSummary } from "@lift-lab/shared-types";

import { HygraphModule, HygraphService } from "../hygraph/hygraph.module";

const FIELDS = `title slug difficulty primaryMuscles { name slug }`;
export const LIST_EXERCISES = `query ListExercises($locales: [Locale!]!, $first: Int!, $skip: Int!, $where: ExerciseWhereInput!) {
  exercises(stage: PUBLISHED, locales: $locales, first: $first, skip: $skip, orderBy: slug_ASC, where: $where) { ${FIELDS} }
}`;
export const GET_EXERCISE = `query GetExercise($slug: String!, $locales: [Locale!]!) {
  exercise(where: {slug: $slug}, stage: PUBLISHED, locales: $locales) {
    ${FIELDS} summary instructions { text } modality durationMinutes equipment { name slug }
  }
}`;
export const LIST_MUSCLE_GROUPS = `query ListMuscleGroups($locales: [Locale!]!, $skip: Int!) {
  muscleGroups(stage: PUBLISHED, locales: $locales, first: 100, skip: $skip, orderBy: slug_ASC) { name slug }
}`;
type ContentExercise = {
  title: string; slug: string; difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  primaryMuscles: { name: string; slug: string }[];
};
type ContentDetail = ContentExercise & {
  summary: string; instructions: { text: string }; modality: string;
  durationMinutes: number | null; equipment: { name: string; slug: string }[];
};
const summary = (entry: ContentExercise): ExerciseSummary => ({
  title: entry.title, slug: entry.slug,
  difficulty: entry.difficulty.toLowerCase() as ExerciseSummary["difficulty"],
  primaryMuscle: entry.primaryMuscles[0]?.slug ?? "",
});
function locales(locale = "en"): string[] {
  if (locale !== "en" && locale !== "cs") throw new BadRequestException("locale must be en or cs.");
  return locale === "cs" ? ["cs", "en"] : ["en"];
}
function integer(value: string | undefined, fallback: number, min: number, max: number): number {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < min || Number(value) > max) {
    throw new BadRequestException(`Pagination must be an integer from ${min} to ${max}.`);
  }
  return Number(value);
}
@Injectable()
export class ExercisesService {
  constructor(private readonly hygraph: HygraphService) {}
  async list(locale?: string, muscle?: string, limit?: string, offset?: string): Promise<ExerciseSummary[]> {
    const variables = { locales: locales(locale), first: integer(limit, 30, 1, 100), skip: integer(offset, 0, 0, 10000),
      where: muscle ? { primaryMuscles_some: { slug: muscle } } : {} };
    const data = await this.hygraph.query<{ exercises: ContentExercise[] }>(LIST_EXERCISES, variables);
    return data.exercises.map(summary);
  }
  async muscleGroups(locale?: string): Promise<MuscleGroupSummary[]> {
    const result: MuscleGroupSummary[] = [];
    const selectedLocales = locales(locale);
    for (let skip = 0; ; skip += 100) {
      const data = await this.hygraph.query<{ muscleGroups: MuscleGroupSummary[] }>(LIST_MUSCLE_GROUPS, { locales: selectedLocales, skip });
      result.push(...data.muscleGroups);
      if (data.muscleGroups.length < 100) return result;
    }
  }
  async get(slug: string, locale?: string): Promise<ExerciseDetail> {
    const { exercise } = await this.hygraph.query<{ exercise: ContentDetail | null }>(GET_EXERCISE, { slug, locales: locales(locale) });
    if (!exercise) throw new NotFoundException("Exercise not found.");
    return { ...summary(exercise), summary: exercise.summary, instructions: exercise.instructions.text,
      modality: exercise.modality.toLowerCase(), durationMinutes: exercise.durationMinutes,
      primaryMuscles: exercise.primaryMuscles, equipment: exercise.equipment };
  }
}

@Controller("muscle-groups")
export class MuscleGroupsController {
  constructor(private readonly exercises: ExercisesService) {}
  @Get() list(@Query("locale") locale?: string) { return this.exercises.muscleGroups(locale); }
}

@Controller("exercises")
export class ExercisesController {
  constructor(private readonly exercises: ExercisesService) {}
  @Get() list(@Query("locale") locale?: string, @Query("muscle") muscle?: string, @Query("limit") limit?: string, @Query("offset") offset?: string) {
    return this.exercises.list(locale, muscle, limit, offset);
  }
  @Get(":slug") get(@Param("slug") slug: string, @Query("locale") locale?: string) {
    return this.exercises.get(slug, locale);
  }
}

@Module({ imports: [HygraphModule], controllers: [ExercisesController, MuscleGroupsController], providers: [ExercisesService] })
export class ExercisesModule {}
