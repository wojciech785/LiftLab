import { Controller, Get, Module } from "@nestjs/common";
import type { ExerciseSummary } from "@lift-lab/shared-types";

const skeletonExercises: ExerciseSummary[] = [
  { title: "Barbell Bench Press", slug: "barbell-bench-press", difficulty: "intermediate", primaryMuscle: "chest" },
  { title: "Lat Pulldown", slug: "lat-pulldown", difficulty: "beginner", primaryMuscle: "back" },
  { title: "Goblet Squat", slug: "goblet-squat", difficulty: "beginner", primaryMuscle: "legs" }
];

@Controller("exercises")
class ExercisesController {
  @Get() list(): ExerciseSummary[] {
    // Replace with a typed Hygraph Content API query in Phase 3.
    return skeletonExercises;
  }
}

@Module({ controllers: [ExercisesController] })
export class ExercisesModule {}
