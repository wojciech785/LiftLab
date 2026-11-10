/**
 * Adds an optional, localized list of common form mistakes to Exercise.
 * First change made through the development → master environment workflow
 * (docs/environments.md). Non-breaking: optional field, no migration value.
 */
export function scheduleExerciseCommonMistakes(client) {
  client.createSimpleField({
    parentApiId: "Exercise",
    apiId: "commonMistakes",
    type: "STRING",
    displayName: "Common Mistakes",
    description: "Short form faults to avoid, one per item (e.g. 'Knees cave inward').",
    isList: true,
    isLocalized: true,
    validations: { String: { characters: { min: 3, max: 140 } } },
  });
}
