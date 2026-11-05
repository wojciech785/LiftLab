export type ExerciseSummary = {
  title: string;
  slug: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  primaryMuscle: string;
};
