/**
 * Adds Lift Lab's editorial review stage and Czech practice locale.
 *
 * This follows 001-foundation and is safe only after that migration has been
 * applied. It also reconciles the modality-specific editor visibility rules.
 */

const modalityCondition = (value) => ({
  baseField: "modality",
  operator: "IS",
  enumerationValues: [value],
});

const localizedSimpleFields = {
  SeoMetadata: ["title", "description"],
  Callout: ["heading", "body"],
  MediaWithCaption: ["caption", "altTextOverride"],
  CTA: ["label"],
  MuscleGroup: ["name", "description"],
  Equipment: ["name", "description"],
  Coach: ["role", "biography", "credentials"],
  Exercise: [
    "title",
    "summary",
    "instructions",
    "barbellSetup",
    "rackHeight",
    "machineSetup",
    "seatPosition",
    "machineAlternative",
    "progressionLevel",
    "videoTranscript",
  ],
};

/** Schedule the workflow and localization operations on a Management SDK client. */
export function scheduleWorkflowAndLocalization(client) {
  client.createStage({
    apiId: "REVIEW",
    displayName: "Review",
    color: "YELLOW",
    description: "Coach review for form, safety, and training guidance.",
    position: 1,
  });

  client.createLocale({
    apiId: "cs",
    displayName: "Czech",
    description: "Czech practice locale for localized coaching language and units.",
  });

  for (const [parentApiId, fieldApiIds] of Object.entries(localizedSimpleFields)) {
    for (const apiId of fieldApiIds) {
      client.updateSimpleField({ parentApiId, apiId, isLocalized: true });
    }
  }

  for (const [apiId, modality] of [
    ["barbellSetup", "BARBELL"],
    ["rackHeight", "BARBELL"],
    ["safetyPinsRequired", "BARBELL"],
    ["machineSetup", "MACHINE"],
    ["seatPosition", "MACHINE"],
    ["machineAlternative", "MACHINE"],
    ["progressionLevel", "BODYWEIGHT"],
  ]) {
    client.updateSimpleField({
      parentApiId: "Exercise",
      apiId,
      visibilityCondition: modalityCondition(modality),
    });
  }
}
