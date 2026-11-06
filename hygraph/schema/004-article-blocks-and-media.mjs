/** Additive migration after 003: modular articles and DAM references. */
export function scheduleArticleBlocksAndMedia(client) {
  const blocks = [
    ["RichTextBlock", "Rich Text Block"],
    ["ExerciseCarouselBlock", "Exercise Carousel Block"],
    ["MuscleMapBlock", "Muscle Map Block"],
    ["ComparisonTableBlock", "Comparison Table Block"],
    ["CoachQuoteBlock", "Coach Quote Block"],
    ["CalloutBlock", "Callout Block"],
    ["ImageGalleryBlock", "Image Gallery Block"],
  ];
  for (const [apiId, displayName] of [...blocks, ["ComparisonTableRow", "Comparison Table Row"]]) {
    client.createComponent({ apiId, apiIdPlural: `${apiId}s`, displayName });
  }

  const copy = (parentApiId, apiId, type, displayName, options = {}) => client.createSimpleField({
    parentApiId, apiId, type, displayName, isLocalized: true, ...options,
  });
  const component = (parentApiId, apiId, componentApiId, displayName, isList = false) => client.createComponentField({
    parentApiId, apiId, componentApiId, displayName, isList,
  });
  // One-way references keep component usage out of the main content editor.
  // Reverse lists allow reconnecting an entry to an existing component instance.
  const reference = (parentApiId, apiId, target, displayName, isList = false, type = "RELATION") => client.createRelationalField({
    parentApiId, apiId, type, displayName, isList,
    reverseField: {
      apiId: `${parentApiId[0].toLowerCase()}${parentApiId.slice(1)}${apiId[0].toUpperCase()}${apiId.slice(1)}Uses`,
      modelApiId: target, displayName: `${parentApiId} ${displayName} Uses`,
      isList: true, isUnidirectional: true, position: -1,
    },
  });

  copy("RichTextBlock", "body", "RICHTEXT", "Body");
  copy("ExerciseCarouselBlock", "heading", "STRING", "Heading");
  reference("ExerciseCarouselBlock", "exercises", "Exercise", "Exercises", true);
  copy("MuscleMapBlock", "heading", "STRING", "Heading");
  copy("MuscleMapBlock", "body", "RICHTEXT", "Explanatory Copy");
  reference("MuscleMapBlock", "muscleGroups", "MuscleGroup", "Muscle Groups", true);
  copy("ComparisonTableBlock", "caption", "STRING", "Caption");
  copy("ComparisonTableBlock", "columnHeadings", "STRING", "Column Headings", { isList: true });
  copy("ComparisonTableRow", "cells", "STRING", "Cells", { isList: true, description: "One cell per column, in the same order as the table headings." });
  component("ComparisonTableBlock", "rows", "ComparisonTableRow", "Rows", true);
  copy("CoachQuoteBlock", "quote", "STRING", "Quote", { formRenderer: "GCMS_MULTI_LINE" });
  reference("CoachQuoteBlock", "coach", "Coach", "Coach");
  component("CalloutBlock", "callout", "Callout", "Callout");
  copy("ImageGalleryBlock", "heading", "STRING", "Heading");
  component("ImageGalleryBlock", "items", "MediaWithCaption", "Images", true);
  client.createComponentUnionField({
    parentApiId: "Article", apiId: "contentBlocks", displayName: "Content Blocks", isList: true,
    componentApiIds: blocks.map(([apiId]) => apiId),
    description: "Ordered article composition. Shared block structure with localized copy inside each block.",
  });

  for (const [parent, field, label, list] of [
    ["SeoMetadata", "socialImage", "Social Image", false],
    ["MediaWithCaption", "asset", "Asset", false],
    ["Exercise", "gallery", "Gallery", true],
    ["Exercise", "videoPoster", "Video Poster", false],
    ["MuscleGroup", "illustration", "Illustration", false],
    ["Equipment", "image", "Image", false],
    ["Coach", "photo", "Photo", false],
    ["WorkoutProgramme", "heroAsset", "Hero Asset", false],
    ["Article", "heroAsset", "Hero Asset", false],
  ]) reference(parent, field, "Asset", label, list, "ASSET");

  // Optional metadata preserves existing uploads; publication checks remain editorial.
  copy("Asset", "altText", "STRING", "Alt Text", { description: "Meaningful description for accessibility; empty for deliberately decorative images." });
  client.createSimpleField({ parentApiId: "Asset", apiId: "rightsSource", type: "STRING", displayName: "Rights / Source", formRenderer: "GCMS_MULTI_LINE", description: "Creator, license, and original source URL. Confirm rights before publication." });
}
