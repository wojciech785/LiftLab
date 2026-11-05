import { Body, Controller, Module, Post } from "@nestjs/common";
import { CreateWorkoutIntentDto } from "./dto/create-workout-intent.dto";

@Controller("workout-intents")
class WorkoutIntentsController {
  @Post()
  create(@Body() intent: CreateWorkoutIntentDto) {
    // Future: validate consent then create a WorkoutIntent entry through Hygraph's mutation API.
    return { accepted: true, intent };
  }
}

@Module({ controllers: [WorkoutIntentsController] })
export class WorkoutIntentsModule {}
