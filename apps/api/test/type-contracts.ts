// Compile-time regression checks only. This function is never executed.
import type { HygraphService } from "../src/hygraph/hygraph.module";
import { ArticleDetailDocument, GetExerciseDocument, SaveWorkoutIntentDocument } from "../src/hygraph/generated/operations";

async function contracts(client: HygraphService) {
  const result = await client.query(GetExerciseDocument, {slug:"squat",locales:["cs","en"]});
  if (result.exercise) {
    const title: string = result.exercise.title;
    void title;
    // @ts-expect-error A CMS field not selected in the operation is unavailable.
    result.exercise.id;
  }
  // @ts-expect-error A slug is required by GetExercise.
  await client.query(GetExerciseDocument, {locales:["en"]});
  // @ts-expect-error Unconfigured locales are not part of the schema.
  await client.query(GetExerciseDocument, {slug:"squat",locales:["de"]});
  // @ts-expect-error Wrong scalar type for a slug.
  await client.query(GetExerciseDocument, {slug:42,locales:["en"]});
  // @ts-expect-error A typed operation cannot be replaced with an unchecked string.
  await client.query("query { exercises { id } }", {});
  // @ts-expect-error Required workout-intent input fields cannot be omitted.
  await client.mutate(SaveWorkoutIntentDocument, {data:{goal:"GENERAL_FITNESS"}});
  const article = await client.query(ArticleDetailDocument,{slug:"guide",locales:["en"]});
  if (article.article) for (const block of article.article.contentBlocks) {
    if (block.__typename === "ComparisonTableBlock") {
      const rows: string[][] = block.rows.map(row=>row.cells);
      void rows;
      // @ts-expect-error The discriminated table block has no exercise relation.
      block.exercises;
    }
  }
}
void contracts;
