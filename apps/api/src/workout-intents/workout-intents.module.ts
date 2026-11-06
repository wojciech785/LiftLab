import { BadRequestException, Body, CanActivate, Controller, ExecutionContext, ForbiddenException, Injectable, Module, Post, ServiceUnavailableException, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import type { Request } from "express";
import { HygraphModule, HygraphService } from "../hygraph/hygraph.module";
import { CreateWorkoutIntentDto } from "./dto/create-workout-intent.dto";

export const SAVE_WORKOUT_INTENT = `mutation SaveWorkoutIntent($data:WorkoutIntentCreateInput!) { createWorkoutIntent(data:$data) { id } }`;
@Injectable()
export class WorkoutIntentOriginGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const allowed = new Set([this.config.get<string>("WEB_ORIGIN") ?? "http://localhost:5173"]);
    // The local Vite frontend can be opened using either loopback hostname.
    for (const origin of [...allowed]) {
      try { const u = new URL(origin); if (["localhost","127.0.0.1"].includes(u.hostname)) { u.hostname = u.hostname === "localhost" ? "127.0.0.1" : "localhost"; allowed.add(u.origin); } } catch { /* Invalid config permits no additional origins. */ }
    }
    if (!request.headers.origin || !allowed.has(request.headers.origin)) throw new ForbiddenException("Workout requests must come from the configured frontend.");
    if (!request.is("application/json")) throw new ForbiddenException("Use application/json.");
    return true;
  }
}
@Injectable()
export class WorkoutIntentsService {
  constructor(private readonly hygraph: HygraphService) {}
  async create(intent: CreateWorkoutIntentDto): Promise<{accepted:true}> {
    // Validate relation targets against published content before any write.
    const selected = intent.selectedMuscles;
    if (selected.length) {
      const {muscleGroups} = await this.hygraph.query<{muscleGroups:{slug:string}[]}>(`query IntentMuscles($slugs:[String!]!) {muscleGroups(stage:PUBLISHED,where:{slug_in:$slugs},first:3) {slug}}`,{slugs:selected});
      if (muscleGroups.length !== selected.length || selected.some(slug=>!muscleGroups.some(g=>g.slug===slug))) throw new BadRequestException("Select published muscle groups from the library.");
    }
    const data = {goal:intent.goal.toUpperCase().replaceAll("-","_"),availableMinutes:intent.availableMinutes,
      experienceLevel:intent.experienceLevel.toUpperCase(),consent:true,intentStatus:"NEW",
      ...(intent.contactEmail ? {contactEmail:intent.contactEmail} : {}),
      ...(selected.length ? {selectedMuscles:{connect:selected.map(slug=>({slug}))}} : {})};
    const result = await this.hygraph.mutate<{createWorkoutIntent:{id:string} | null}>(SAVE_WORKOUT_INTENT,{data});
    if (!result.createWorkoutIntent?.id) throw new ServiceUnavailableException("Workout request could not be saved.");
    return {accepted:true};
  }
}
@Controller("workout-intents")
@UseGuards(WorkoutIntentOriginGuard, ThrottlerGuard)
export class WorkoutIntentsController {
  constructor(private readonly intents: WorkoutIntentsService) {}
  @Post()
  create(@Body() intent: CreateWorkoutIntentDto) {
    return this.intents.create(intent);
  }
}

@Module({ imports:[HygraphModule,ThrottlerModule.forRoot([{ttl:60000,limit:5}])],controllers:[WorkoutIntentsController],providers:[WorkoutIntentsService,WorkoutIntentOriginGuard] })
export class WorkoutIntentsModule {}
