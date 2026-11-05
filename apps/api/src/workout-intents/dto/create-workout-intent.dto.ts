import { IsEmail, IsIn, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateWorkoutIntentDto {
  @IsIn(["strength", "hypertrophy", "endurance", "mobility", "general-fitness"])
  goal!: string;

  @IsInt() @Min(15) @Max(180)
  availableMinutes!: number;

  @IsString() @IsOptional()
  selectedMuscle?: string;

  @IsEmail() @IsOptional()
  contactEmail?: string;
}
