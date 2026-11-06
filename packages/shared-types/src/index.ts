export type ExerciseSummary = {
  title: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  primaryMuscle: string;
};

export type MuscleGroupSummary = { name: string; slug: string };

export type ExerciseDetail = ExerciseSummary & {
  summary: string;
  instructions: string;
  modality: string;
  durationMinutes: number | null;
  primaryMuscles: MuscleGroupSummary[];
  equipment: { name: string; slug: string }[];
};
