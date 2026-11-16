/**
 * Enables content variants (Enterprise) on the Exercise fields whose wording
 * should change per audience segment (e.g. Beginner vs Advanced lifters).
 * Fields without variants keep one shared value; a variant only overrides the
 * fields switched on here. Non-breaking: existing values become the base entry.
 * Segments themselves are content (created in Studio), not schema.
 *
 * progressionLevel is excluded: it has a visibility condition on `modality`,
 * and Hygraph only allows variants on a conditional field when the field it
 * depends on is variant-enabled too. Modality should stay shared, so no.
 */
export function scheduleExerciseVariants(client) {
  for (const apiId of ["summary", "commonMistakes"]) {
    client.updateSimpleField({ parentApiId: "Exercise", apiId, isVariantEnabled: true });
  }
}
