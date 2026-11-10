export type ExerciseSummary = {
  title: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  primaryMuscle: string;
};

export type MuscleGroupSummary = { name: string; slug: string };
/** Muscle-group filter option; the illustration is a CMS asset (original Lift Lab artwork). */
export type MuscleGroupOption = MuscleGroupSummary & { meshId?: string | null; illustration?: MediaAsset | null };

export type ExerciseDetail = ExerciseSummary & {
  summary: string;
  /** Structured rich text (paragraphs, formatting, links); render with the web RichText component. */
  instructions: RichContent;
  modality: string;
  durationMinutes: number | null;
  primaryMuscles: MuscleGroupSummary[];
  equipment: { name: string; slug: string }[];
  /** Localized form faults to avoid; empty when the editor has not added any. */
  commonMistakes: string[];
};

export type ContentLink = { title: string; slug: string };
export type RichNode = {
  type?: string; text?: string; children?: RichNode[]; href?: string;
  bold?: boolean; italic?: boolean; underline?: boolean; strikeThrough?: boolean; code?: boolean;
};
export type RichContent = { children: RichNode[] } | null;
export type MediaAsset = { url: string; altText: string | null; rightsSource: string | null };
export type EditorialProfile = { name: string; role: string };
export type ProgrammeSummary = ContentLink & { goal: string; level: string; durationWeeks: number; sessionsPerWeek: number };
export type ProgrammeDetail = ProgrammeSummary & {
  overview: RichContent; coach: EditorialProfile | null; heroAsset: MediaAsset | null;
  sessions: { title: string; order: number; estimatedMinutes: number; warmup: RichContent; cooldown: RichContent;
    exerciseSets: { order: number; sets: number; repRange: string; tempo: string | null; restSeconds: number | null;
      coachNote: RichContent; exercise: ContentLink | null }[] }[];
};
export type ArticleSummary = ContentLink & { excerpt: string };
export type ArticleBlock =
  | { kind: "richText"; body: RichContent }
  | { kind: "exercises"; heading: string | null; exercises: ContentLink[] }
  | { kind: "muscles"; heading: string | null; body: RichContent; muscleGroups: MuscleGroupOption[] }
  | { kind: "table"; caption: string | null; columnHeadings: string[]; rows: string[][] }
  | { kind: "quote"; quote: string | null; coach: EditorialProfile | null }
  | { kind: "callout"; tone: string; heading: string; body: RichContent; destination: string | null }
  | { kind: "gallery"; heading: string | null; items: { caption: string | null; altTextOverride: string | null; asset: MediaAsset | null }[] }
  | { kind: "unsupported" };
export type ArticleDetail = ArticleSummary & {
  author: EditorialProfile | null; heroAsset: MediaAsset | null; contentBlocks: ArticleBlock[];
  relatedExercises: ContentLink[]; relatedProgrammes: ContentLink[];
};

export type WorkoutIntentRequest = {
  goal: "strength" | "hypertrophy" | "endurance" | "mobility" | "general-fitness";
  availableMinutes: number;
  experienceLevel: "beginner" | "intermediate" | "advanced";
  selectedMuscles: string[];
  consent: boolean;
  contactEmail?: string;
};
