/**
 * Core programme and editorial models plus the cross-model training taxonomy.
 * Modular Article blocks and DAM asset fields follow in a separate migration.
 */

const slug = (titleField) => ({
  type: "STRING",
  isRequired: true,
  isUnique: true,
  formRenderer: "GCMS_SLUG",
  formConfig: { isLowercase: true, shouldGenerateAutomatically: true, automaticSlug: `{${titleField}}` },
  validations: { String: { matches: { regex: "^[a-z0-9]+(?:[-/][a-z0-9]+)*$", flags: [], errorMessage: "Use lowercase URL-safe text." } } },
});

/** Schedule programme, article, and taxonomy operations on a Management SDK client. */
export function scheduleProgrammeAndArticleCore(client) {
  for (const model of [
    { apiId: "WorkoutProgramme", apiIdPlural: "WorkoutProgrammes", displayName: "Workout Programme", description: "A publishable multi-week training plan." },
    { apiId: "WorkoutSession", apiIdPlural: "WorkoutSessions", displayName: "Workout Session", description: "A reusable planned training session." },
    { apiId: "ExerciseSet", apiIdPlural: "ExerciseSets", displayName: "Exercise Set", description: "A structured exercise prescription within a session." },
    { apiId: "Article", apiIdPlural: "Articles", displayName: "Article", description: "Editorial learning content." },
  ]) client.createModel(model);

  client.createTaxonomy({
    apiId: "TrainingAttributes",
    displayName: "Training attributes",
    description: "Cross-model discovery tags. These complement, rather than replace, strict enum fields.",
    rootNode: {
      apiId: "TrainingAttributes",
      displayName: "Training attributes",
      children: [
        { apiId: "Experience", displayName: "Experience", children: [{ apiId: "BeginnerFriendly", displayName: "Beginner-friendly" }, { apiId: "TechniqueFirst", displayName: "Technique-first" }] },
        { apiId: "TrainingStyle", displayName: "Training style", children: [{ apiId: "Compound", displayName: "Compound" }, { apiId: "Isolation", displayName: "Isolation" }, { apiId: "Unilateral", displayName: "Unilateral" }, { apiId: "Circuit", displayName: "Circuit" }] },
        { apiId: "Location", displayName: "Location", children: [{ apiId: "HomeGym", displayName: "Home gym" }, { apiId: "CommercialGym", displayName: "Commercial gym" }, { apiId: "Outdoors", displayName: "Outdoors" }] },
        { apiId: "Focus", displayName: "Focus", children: [{ apiId: "Posture", displayName: "Posture" }, { apiId: "Core", displayName: "Core" }, { apiId: "Mobility", displayName: "Mobility" }, { apiId: "Recovery", displayName: "Recovery" }] },
      ],
    },
  });

  const simple = (parentApiId, apiId, type, displayName, options = {}) => client.createSimpleField({ parentApiId, apiId, type, displayName, ...options });
  const enumerable = (parentApiId, apiId, enumerationApiId, displayName, options = {}) => client.createEnumerableField({ parentApiId, apiId, enumerationApiId, displayName, ...options });

  simple("WorkoutProgramme", "title", "STRING", "Title", { isRequired: true, isTitle: true, isLocalized: true });
  simple("WorkoutProgramme", "slug", "STRING", "Slug", slug("title"));
  enumerable("WorkoutProgramme", "goal", "TrainingGoal", "Training Goal", { isRequired: true });
  enumerable("WorkoutProgramme", "level", "Difficulty", "Level", { isRequired: true });
  simple("WorkoutProgramme", "durationWeeks", "INT", "Duration (weeks)", { isRequired: true });
  simple("WorkoutProgramme", "sessionsPerWeek", "INT", "Sessions per week", { isRequired: true });
  simple("WorkoutProgramme", "overview", "RICHTEXT", "Overview", { isLocalized: true });

  simple("WorkoutSession", "title", "STRING", "Title", { isRequired: true, isTitle: true, isLocalized: true });
  simple("WorkoutSession", "order", "INT", "Order", { isRequired: true });
  simple("WorkoutSession", "estimatedMinutes", "INT", "Estimated minutes", { isRequired: true });
  simple("WorkoutSession", "warmup", "RICHTEXT", "Warm-up", { isLocalized: true });
  simple("WorkoutSession", "cooldown", "RICHTEXT", "Cool-down", { isLocalized: true });

  simple("ExerciseSet", "order", "INT", "Order", { isRequired: true });
  simple("ExerciseSet", "sets", "INT", "Sets", { isRequired: true });
  simple("ExerciseSet", "repRange", "STRING", "Rep range", { isRequired: true, description: "For example, 8–12." });
  simple("ExerciseSet", "tempo", "STRING", "Tempo", { description: "For example, 3-1-1-0." });
  simple("ExerciseSet", "restSeconds", "INT", "Rest (seconds)");
  simple("ExerciseSet", "coachNote", "RICHTEXT", "Coach note", { isLocalized: true });

  simple("Article", "title", "STRING", "Title", { isRequired: true, isTitle: true, isLocalized: true });
  simple("Article", "slug", "STRING", "Slug", slug("title"));
  simple("Article", "excerpt", "STRING", "Excerpt", { isRequired: true, isLocalized: true, formRenderer: "GCMS_MULTI_LINE" });

  client.createComponentField({ apiId: "seo", parentApiId: "WorkoutProgramme", componentApiId: "SeoMetadata", displayName: "SEO Metadata", description: "Search and sharing metadata." });
  client.createComponentField({ apiId: "seo", parentApiId: "Article", componentApiId: "SeoMetadata", displayName: "SEO Metadata", description: "Search and sharing metadata." });

  const relation = (apiId, parentApiId, displayName, isList, reverseField, description) => client.createRelationalField({ apiId, parentApiId, type: "RELATION", displayName, isList, reverseField, description });
  relation("sessions", "WorkoutProgramme", "Sessions", true, { apiId: "programme", modelApiId: "WorkoutSession", displayName: "Programme", isList: false }, "Ordered sessions in this programme.");
  relation("coach", "WorkoutProgramme", "Coach", false, { apiId: "programmes", modelApiId: "Coach", displayName: "Programmes", isList: true }, "Coach responsible for the programme.");
  relation("exerciseSets", "WorkoutSession", "Exercise Sets", true, { apiId: "session", modelApiId: "ExerciseSet", displayName: "Session", isList: false }, "Structured prescriptions in this session.");
  relation("exercise", "ExerciseSet", "Exercise", false, { apiId: "exerciseSets", modelApiId: "Exercise", displayName: "Exercise Sets", isList: true }, "The exercise prescribed by this set.");
  relation("author", "Article", "Author", false, { apiId: "articles", modelApiId: "Coach", displayName: "Articles", isList: true }, "Coach or editor responsible for the article.");
  relation("relatedExercises", "Article", "Related Exercises", true, { apiId: "relatedArticles", modelApiId: "Exercise", displayName: "Related Articles", isList: true }, "Exercises referenced by this article.");
  relation("relatedProgrammes", "Article", "Related Programmes", true, { apiId: "relatedArticles", modelApiId: "WorkoutProgramme", displayName: "Related Articles", isList: true }, "Programmes referenced by this article.");

  for (const parentApiId of ["Exercise", "WorkoutProgramme", "Article"]) {
    client.createTaxonomyField({ apiId: "trainingAttributes", parentApiId, taxonomyApiId: "TrainingAttributes", displayName: "Training Attributes", description: "Cross-model discovery tags.", isList: true });
  }
}
