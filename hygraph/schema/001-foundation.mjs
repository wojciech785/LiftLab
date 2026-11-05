/**
 * Lift Lab's initial Hygraph schema.
 *
 * This migration intentionally contains only create operations, so it is for
 * provisioning a blank environment. Follow-on changes belong in a new,
 * sequentially numbered migration rather than editing this file.
 */

const slug = (titleField) => ({
  type: "STRING",
  isRequired: true,
  isUnique: true,
  formRenderer: "GCMS_SLUG",
  formConfig: {
    isLowercase: true,
    shouldGenerateAutomatically: true,
    automaticSlug: `{${titleField}}`,
  },
  validations: {
    String: {
      matches: {
        regex: "^[a-z0-9]+(?:[-/][a-z0-9]+)*$",
        flags: [],
        errorMessage: "Use lowercase URL-safe text.",
      },
    },
  },
});

const visibilityForModality = (value) => ({
  baseField: "modality",
  operator: "IS",
  enumerationValues: [value],
});

/** Schedule the foundation operations on a Management SDK client. */
export function scheduleFoundation(client) {
  for (const [apiId, displayName, values] of [
    ["Difficulty", "Difficulty", [["BEGINNER", "Beginner"], ["INTERMEDIATE", "Intermediate"], ["ADVANCED", "Advanced"]]],
    ["TrainingGoal", "Training Goal", [["STRENGTH", "Strength"], ["HYPERTROPHY", "Hypertrophy"], ["ENDURANCE", "Endurance"], ["MOBILITY", "Mobility"], ["GENERAL_FITNESS", "General Fitness"]]],
    ["ExerciseModality", "Exercise Modality", [["BARBELL", "Barbell"], ["DUMBBELL", "Dumbbell"], ["CABLE", "Cable"], ["MACHINE", "Machine"], ["BODYWEIGHT", "Bodyweight"], ["KETTLEBELL", "Kettlebell"], ["CARDIO", "Cardio"]]],
    ["EquipmentCategory", "Equipment Category", [["FREE_WEIGHTS", "Free Weights"], ["MACHINE", "Machine"], ["CABLE", "Cable"], ["BODYWEIGHT", "Bodyweight"], ["CARDIO", "Cardio"], ["ACCESSORY", "Accessory"]]],
    ["WorkoutIntentStatus", "Workout Intent Status", [["NEW", "New"], ["REVIEWED", "Reviewed"], ["ARCHIVED", "Archived"]]],
    ["CalloutTone", "Callout Tone", [["TIP", "Tip"], ["CAUTION", "Caution"], ["PROGRESSION", "Progression"], ["RECOVERY", "Recovery"]]],
  ]) {
    client.createEnumeration({ apiId, displayName, values: values.map(([valueApiId, valueDisplayName]) => ({ apiId: valueApiId, displayName: valueDisplayName })) });
  }

  for (const component of [
    { apiId: "SeoMetadata", apiIdPlural: "SeoMetadatas", displayName: "SEO Metadata", description: "Reusable metadata for search and sharing." },
    { apiId: "Callout", apiIdPlural: "Callouts", displayName: "Callout", description: "Reusable editorial guidance callout." },
    { apiId: "MediaWithCaption", apiIdPlural: "MediaWithCaptions", displayName: "Media With Caption", description: "Caption and accessibility metadata for editorial media." },
    { apiId: "CTA", apiIdPlural: "CTAs", displayName: "Call to Action", description: "Reusable call-to-action link." },
  ]) client.createComponent(component);

  for (const model of [
    { apiId: "MuscleGroup", apiIdPlural: "MuscleGroups", displayName: "Muscle Group", description: "Anatomical group mapped to the interactive explorer." },
    { apiId: "Equipment", apiIdPlural: "EquipmentItems", displayName: "Equipment", description: "Equipment used by exercises." },
    { apiId: "Coach", apiIdPlural: "Coaches", displayName: "Coach", description: "Coach authorship and credibility profile." },
    { apiId: "Exercise", apiIdPlural: "Exercises", displayName: "Exercise", description: "Canonical unit of strength-training knowledge." },
  ]) client.createModel(model);

  const simple = (parentApiId, apiId, type, displayName, options = {}) => client.createSimpleField({ parentApiId, apiId, type, displayName, ...options });
  const enumerable = (parentApiId, apiId, enumerationApiId, displayName, options = {}) => client.createEnumerableField({ parentApiId, apiId, enumerationApiId, displayName, ...options });

  simple("SeoMetadata", "title", "STRING", "SEO Title", { description: "Search-result title override." });
  simple("SeoMetadata", "description", "STRING", "SEO Description", { description: "Search-result description.", formRenderer: "GCMS_MULTI_LINE" });
  simple("SeoMetadata", "noIndex", "BOOLEAN", "No Index", { description: "Prevent search-engine indexing.", initialValue: "false" });
  enumerable("Callout", "tone", "CalloutTone", "Tone", { isRequired: true, initialValue: "TIP" });
  simple("Callout", "heading", "STRING", "Heading", { isRequired: true });
  simple("Callout", "body", "RICHTEXT", "Body", { isRequired: true });
  simple("Callout", "destination", "STRING", "Destination", { description: "Optional internal or external URL." });
  simple("MediaWithCaption", "caption", "STRING", "Caption", { formRenderer: "GCMS_MULTI_LINE" });
  simple("MediaWithCaption", "altTextOverride", "STRING", "Alt Text Override", { description: "Use only when the connected asset alt text needs a contextual override.", formRenderer: "GCMS_MULTI_LINE" });
  simple("MediaWithCaption", "focalPoint", "STRING", "Focal Point", { description: "Optional human-readable focal point guidance." });
  simple("CTA", "label", "STRING", "Label", { isRequired: true });
  simple("CTA", "destination", "STRING", "Destination", { isRequired: true, description: "Internal path or absolute URL." });
  simple("CTA", "style", "STRING", "Style", { description: "Presentation token such as primary, secondary, or text.", initialValue: "primary" });

  simple("MuscleGroup", "name", "STRING", "Name", { isRequired: true, isTitle: true });
  simple("MuscleGroup", "slug", "STRING", "Slug", slug("name"));
  simple("MuscleGroup", "bodyRegion", "STRING", "Body Region", { isRequired: true, description: "High-level anatomical region for filtering and grouping." });
  simple("MuscleGroup", "description", "RICHTEXT", "Description", { description: "Editor-facing anatomical and training context." });
  simple("MuscleGroup", "meshId", "STRING", "3D Mesh ID", { isRequired: true, isUnique: true, description: "Stable mesh or group identifier validated by the application." });

  simple("Equipment", "name", "STRING", "Name", { isRequired: true, isTitle: true });
  simple("Equipment", "slug", "STRING", "Slug", slug("name"));
  enumerable("Equipment", "category", "EquipmentCategory", "Category", { isRequired: true });
  simple("Equipment", "description", "RICHTEXT", "Description", { description: "Setup notes and suitable alternatives." });

  simple("Coach", "name", "STRING", "Name", { isRequired: true, isTitle: true });
  simple("Coach", "slug", "STRING", "Slug", slug("name"));
  simple("Coach", "role", "STRING", "Role", { isRequired: true, description: "Public professional role." });
  simple("Coach", "biography", "RICHTEXT", "Biography");
  simple("Coach", "credentials", "STRING", "Credentials", { isList: true, description: "Qualifications and relevant certifications." });
  simple("Coach", "socialLinks", "JSON", "Social Links", { description: "Structured public social/profile links." });

  simple("Exercise", "title", "STRING", "Title", { isRequired: true, isTitle: true });
  simple("Exercise", "slug", "STRING", "Slug", slug("title"));
  simple("Exercise", "summary", "STRING", "Summary", { isRequired: true, formRenderer: "GCMS_MULTI_LINE", description: "Short training-focused overview." });
  simple("Exercise", "instructions", "RICHTEXT", "Instructions", { isRequired: true, description: "Long-form form, safety, and coaching instructions." });
  enumerable("Exercise", "difficulty", "Difficulty", "Difficulty", { isRequired: true });
  enumerable("Exercise", "modality", "ExerciseModality", "Modality", { isRequired: true });
  simple("Exercise", "durationMinutes", "INT", "Estimated Duration (minutes)", { description: "Typical time to complete the exercise." });
  simple("Exercise", "barbellSetup", "STRING", "Barbell Setup", { formRenderer: "GCMS_MULTI_LINE", description: "Used for barbell exercises.", visibilityCondition: visibilityForModality("BARBELL") });
  simple("Exercise", "rackHeight", "STRING", "Rack Height", { description: "Used for barbell exercises.", visibilityCondition: visibilityForModality("BARBELL") });
  simple("Exercise", "safetyPinsRequired", "BOOLEAN", "Safety Pins Required", { description: "Used for barbell exercises.", visibilityCondition: visibilityForModality("BARBELL") });
  simple("Exercise", "machineSetup", "STRING", "Machine Setup", { formRenderer: "GCMS_MULTI_LINE", description: "Used for machine exercises.", visibilityCondition: visibilityForModality("MACHINE") });
  simple("Exercise", "seatPosition", "STRING", "Seat Position", { description: "Used for machine exercises.", visibilityCondition: visibilityForModality("MACHINE") });
  simple("Exercise", "machineAlternative", "STRING", "Machine Alternative", { description: "Used for machine exercises.", visibilityCondition: visibilityForModality("MACHINE") });
  simple("Exercise", "progressionLevel", "STRING", "Progression Level", { description: "Used for bodyweight exercises.", visibilityCondition: visibilityForModality("BODYWEIGHT") });
  simple("Exercise", "youtubeVideoId", "STRING", "YouTube Video ID", { description: "Local-development fallback for an approved tutorial." });
  simple("Exercise", "videoTranscript", "RICHTEXT", "Video Transcript", { description: "Accessible, localizable transcript when a tutorial is set." });

  client.createComponentField({ apiId: "seo", parentApiId: "Exercise", componentApiId: "SeoMetadata", displayName: "SEO Metadata", description: "Search and sharing metadata." });

  const relation = (apiId, parentApiId, displayName, isList, reverseField, description) => client.createRelationalField({ apiId, parentApiId, type: "RELATION", displayName, isList, reverseField, description });
  relation("primaryMuscles", "Exercise", "Primary Muscles", true, { apiId: "primaryExercises", modelApiId: "MuscleGroup", displayName: "Primary Exercises", isList: true }, "Main muscles trained.");
  relation("secondaryMuscles", "Exercise", "Secondary Muscles", true, { apiId: "secondaryExercises", modelApiId: "MuscleGroup", displayName: "Secondary Exercises", isList: true }, "Supporting muscles trained.");
  relation("equipment", "Exercise", "Equipment", true, { apiId: "exercises", modelApiId: "Equipment", displayName: "Exercises", isList: true }, "Equipment required or useful for the exercise.");
  relation("coach", "Exercise", "Coach", false, { apiId: "exercises", modelApiId: "Coach", displayName: "Exercises", isList: true }, "Coach responsible for the guidance.");
  relation("substitutions", "Exercise", "Substitutions", true, { apiId: "substitutedBy", modelApiId: "Exercise", displayName: "Substituted By", isList: true }, "Suitable alternatives or substitutions.");
  relation("alternatives", "Equipment", "Alternatives", true, { apiId: "alternativeTo", modelApiId: "Equipment", displayName: "Alternative To", isList: true }, "Alternative equipment that serves a comparable purpose.");
}
