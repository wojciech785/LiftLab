import { ArrayMaxSize, ArrayUnique, Equals, IsArray, IsBoolean, IsEmail, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min } from "class-validator";
import type { WorkoutIntentRequest } from "@lift-lab/shared-types";

export class CreateWorkoutIntentDto {
  @IsIn(["strength", "hypertrophy", "endurance", "mobility", "general-fitness"])
  goal!: WorkoutIntentRequest["goal"];

  @IsInt() @Min(15) @Max(180)
  availableMinutes!: number;

  @IsIn(["beginner", "intermediate", "advanced"])
  experienceLevel!: WorkoutIntentRequest["experienceLevel"];

  @IsArray() @ArrayMaxSize(3) @ArrayUnique() @IsString({each:true}) @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {each:true}) @MaxLength(100,{each:true})
  selectedMuscles!: string[];

  @IsBoolean() @Equals(true, {message:"Consent is required to store a workout request."})
  consent!: boolean;

  @IsEmail() @MaxLength(254) @IsOptional()
  contactEmail?: string;
}
