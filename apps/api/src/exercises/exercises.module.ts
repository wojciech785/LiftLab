import { BadRequestException, Controller, Get, Header, Headers, Injectable, Module, NotFoundException, Param, Query } from "@nestjs/common";
import type { ExerciseDetail, ExerciseSummary, MuscleGroupOption } from "@lift-lab/shared-types";

import { HygraphModule, HygraphService } from "../hygraph/hygraph.module";

import { GetExerciseDocument, GetExercisePreviewDocument, ListExercisesDocument, ListMuscleGroupsDocument } from "../hygraph/generated/operations";
import type { GetExerciseQuery, ListExercisesQuery, Locale } from "../hygraph/generated/operations";
type ContentExerciseDetail = NonNullable<GetExerciseQuery["exercise"]>;
type ContentExercise = ListExercisesQuery["exercises"][number];
const summary = (entry: ContentExercise): ExerciseSummary => ({
  title: entry.title, slug: entry.slug,
  difficulty: entry.difficulty.toLowerCase() as ExerciseSummary["difficulty"],
  primaryMuscle: entry.primaryMuscles[0]?.slug ?? "",
});
function locales(locale = "en"): Locale[] {
  if (locale !== "en" && locale !== "cs") throw new BadRequestException("locale must be en or cs.");
  return locale === "cs" ? ["cs", "en"] : ["en"];
}
/** Segment names map to lowercase audience keys ("Beginner" -> "beginner"). */
const audienceKey = (segment: string) => segment.trim().toLowerCase().replace(/\s+/g, "-");
function audienceParam(audience?: string): string | null {
  if (audience === undefined || audience === "") return null;
  if (!/^[a-z][a-z0-9-]{0,39}$/.test(audience)) throw new BadRequestException("audience must be a lowercase segment key.");
  return audience;
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
    const data = await this.hygraph.query(ListExercisesDocument, variables);
    return data.exercises.map(summary);
  }
  async muscleGroups(locale?: string): Promise<MuscleGroupOption[]> {
    const result: MuscleGroupOption[] = [];
    const selectedLocales = locales(locale);
    for (let skip = 0; ; skip += 100) {
      const data = await this.hygraph.query(ListMuscleGroupsDocument, { locales: selectedLocales, skip });
      result.push(...data.muscleGroups.map(({ name, slug, meshId, illustration }) => ({ name, slug, meshId, illustration: illustration ?? null })));
      if (data.muscleGroups.length < 100) return result;
    }
  }
  /** previewSecret is set only for Live Preview requests; they read DRAFT content and expose the entry id. */
  async get(slug: string, locale?: string, audience?: string, previewSecret?: string): Promise<ExerciseDetail> {
    const requested = audienceParam(audience);
    const variables = { slug, locales: locales(locale) };
    let exercise: ContentExerciseDetail | null | undefined;
    let entryId: string | undefined;
    if (previewSecret === undefined) {
      exercise = (await this.hygraph.query(GetExerciseDocument, variables)).exercise;
    } else {
      const draft = (await this.hygraph.preview(previewSecret, GetExercisePreviewDocument, variables)).exercise;
      exercise = draft;
      entryId = draft?.id;
    }
    if (!exercise) throw new NotFoundException("Exercise not found.");
    // Variants override only their variant-enabled fields (summary, commonMistakes);
    // an unknown audience falls back to the base entry instead of failing.
    const variants = exercise.variants.flatMap(variant => variant.segments.flatMap(segment => segment ? [{ key: audienceKey(segment.name), variant }] : []));
    const match = requested ? variants.find(item => item.key === requested) : undefined;
    const mistakes = match?.variant.commonMistakes.filter((item): item is string => !!item) ?? [];
    return { ...summary(exercise), summary: match?.variant.summary ?? exercise.summary, instructions: exercise.instructions.raw ?? null,
      modality: exercise.modality.toLowerCase(), durationMinutes: exercise.durationMinutes,
      primaryMuscles: exercise.primaryMuscles, equipment: exercise.equipment,
      commonMistakes: mistakes.length ? mistakes : exercise.commonMistakes ?? [],
      audience: match ? requested : null, audiences: [...new Set(variants.map(item => item.key))],
      ...(entryId ? { entryId } : {}) };
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
  @Get(":slug") @Header("Cache-Control", "no-store")
  get(@Param("slug") slug: string, @Query("locale") locale?: string, @Query("audience") audience?: string,
    @Headers("x-lift-lab-preview") previewSecret?: string) {
    return this.exercises.get(slug, locale, audience, previewSecret);
  }
}

@Module({ imports: [HygraphModule], controllers: [ExercisesController, MuscleGroupsController], providers: [ExercisesService] })
export class ExercisesModule {}
