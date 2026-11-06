import { BadRequestException, Controller, Get, Injectable, Module, NotFoundException, Param, Query } from "@nestjs/common";
import type { ArticleBlock, ArticleDetail, ArticleSummary, ProgrammeDetail, ProgrammeSummary, RichContent } from "@lift-lab/shared-types";
import { HygraphModule, HygraphService } from "../hygraph/hygraph.module";
import { ArticleDetailDocument, ArticleListDocument, ProgrammeDetailDocument, ProgrammeListDocument } from "../hygraph/generated/operations";
import type { ArticleDetailQuery, Locale } from "../hygraph/generated/operations";
type CmsBlock = NonNullable<ArticleDetailQuery["article"]>["contentBlocks"][number];
type RichField = {raw:RichContent} | null;

function locales(locale = "en"): Locale[] {
  if (locale !== "en" && locale !== "cs") throw new BadRequestException("locale must be en or cs.");
  return locale === "cs" ? ["cs", "en"] : ["en"];
}
function pagination(value: string | undefined, fallback: number, min: number, max: number) {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value)) || Number(value) < min || Number(value) > max) throw new BadRequestException("Invalid pagination.");
  return Number(value);
}
const rich = (field: RichField | undefined): RichContent => field?.raw ?? null;
function block(b: CmsBlock): ArticleBlock {
  switch (b.__typename) {
    case "RichTextBlock": return {kind:"richText",body:rich(b.body)};
    case "ExerciseCarouselBlock": return {kind:"exercises",heading:b.heading ?? null,exercises:b.exercises ?? []};
    case "MuscleMapBlock": return {kind:"muscles",heading:b.heading ?? null,body:rich(b.body),muscleGroups:b.muscleGroups ?? []};
    case "ComparisonTableBlock": return {kind:"table",caption:b.caption ?? null,columnHeadings:b.columnHeadings ?? [],rows:(b.rows ?? []).map(r=>r.cells)};
    case "CoachQuoteBlock": return {kind:"quote",quote:b.quote ?? null,coach:b.coach ?? null};
    case "CalloutBlock": return b.callout ? {kind:"callout",tone:b.callout.tone.toLowerCase(),heading:b.callout.heading,body:rich(b.callout.body),destination:b.callout.destination} : {kind:"unsupported"};
    case "ImageGalleryBlock": return {kind:"gallery",heading:b.heading ?? null,items:b.items ?? []};
    default: return {kind:"unsupported"};
  }
}

@Injectable()
export class EditorialService {
  constructor(private readonly hygraph: HygraphService) {}
  async programmes(locale?: string, limit?: string, offset?: string): Promise<ProgrammeSummary[]> {
    const data = await this.hygraph.query(ProgrammeListDocument,{locales:locales(locale),first:pagination(limit,12,1,100),skip:pagination(offset,0,0,10000)});
    return data.workoutProgrammes.map(p=>({title:p.title,slug:p.slug,goal:p.goal.toLowerCase(),level:p.level.toLowerCase(),durationWeeks:p.durationWeeks,sessionsPerWeek:p.sessionsPerWeek}));
  }
  async programme(slug: string, locale?: string): Promise<ProgrammeDetail> {
    const {workoutProgramme:p} = await this.hygraph.query(ProgrammeDetailDocument,{slug,locales:locales(locale)});
    if (!p) throw new NotFoundException("Programme not found.");
    return {title:p.title,slug:p.slug,goal:p.goal.toLowerCase(),level:p.level.toLowerCase(),durationWeeks:p.durationWeeks,sessionsPerWeek:p.sessionsPerWeek,
      overview:rich(p.overview),coach:p.coach,heroAsset:p.heroAsset,
      sessions:p.sessions.map(s=>({title:s.title,order:s.order,estimatedMinutes:s.estimatedMinutes,warmup:rich(s.warmup),cooldown:rich(s.cooldown),
        exerciseSets:s.exerciseSets.map(e=>({order:e.order,sets:e.sets,repRange:e.repRange,tempo:e.tempo,restSeconds:e.restSeconds,coachNote:rich(e.coachNote),exercise:e.exercise}))}))};
  }
  async articles(locale?: string, limit?: string, offset?: string): Promise<ArticleSummary[]> {
    const {articles} = await this.hygraph.query(ArticleListDocument,{locales:locales(locale),first:pagination(limit,12,1,100),skip:pagination(offset,0,0,10000)});
    return articles.map(a=>({title:a.title,slug:a.slug,excerpt:a.excerpt}));
  }
  async article(slug: string, locale?: string): Promise<ArticleDetail> {
    const {article:a} = await this.hygraph.query(ArticleDetailDocument,{slug,locales:locales(locale)});
    if (!a) throw new NotFoundException("Article not found.");
    return {title:a.title,slug:a.slug,excerpt:a.excerpt,author:a.author,heroAsset:a.heroAsset,relatedExercises:a.relatedExercises,relatedProgrammes:a.relatedProgrammes,contentBlocks:a.contentBlocks.map(block)};
  }
}
@Controller("programmes")
export class ProgrammesController {
  constructor(private readonly editorial: EditorialService) {}
  @Get() list(@Query("locale") locale?: string,@Query("limit") limit?: string,@Query("offset") offset?: string) {return this.editorial.programmes(locale,limit,offset);}
  @Get(":slug") get(@Param("slug") slug:string,@Query("locale") locale?:string) {return this.editorial.programme(slug,locale);}
}
@Controller("articles")
export class ArticlesController {
  constructor(private readonly editorial: EditorialService) {}
  @Get() list(@Query("locale") locale?: string,@Query("limit") limit?: string,@Query("offset") offset?: string) {return this.editorial.articles(locale,limit,offset);}
  @Get(":slug") get(@Param("slug") slug:string,@Query("locale") locale?:string) {return this.editorial.article(slug,locale);}
}
@Module({imports:[HygraphModule],providers:[EditorialService],controllers:[ProgrammesController,ArticlesController]})
export class EditorialModule {}
