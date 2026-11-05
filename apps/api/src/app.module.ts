import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ExercisesModule } from "./exercises/exercises.module";
import { HealthModule } from "./health/health.module";
import { HygraphModule } from "./hygraph/hygraph.module";
import { WebhooksModule } from "./webhooks/webhooks.module";
import { WorkoutIntentsModule } from "./workout-intents/workout-intents.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HealthModule, HygraphModule, ExercisesModule, WorkoutIntentsModule, WebhooksModule]
})
export class AppModule {}
