/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { RichContent } from '@lift-lab/shared-types';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ArticleCreateInput = {
  author?: CoachCreateOneInlineInput | null | undefined;
  contentBlocks?: ArticlecontentBlocksUnionCreateManyInlineInput | null | undefined;
  createdAt?: string | null | undefined;
  /** excerpt input for default locale (en) */
  excerpt: string;
  heroAsset?: AssetCreateOneInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ArticleCreateLocalizationsInput | null | undefined;
  relatedExercises?: ExerciseCreateManyInlineInput | null | undefined;
  relatedProgrammes?: WorkoutProgrammeCreateManyInlineInput | null | undefined;
  seo?: SeoMetadataCreateOneInlineInput | null | undefined;
  slug: string;
  /** title input for default locale (en) */
  title: string;
  trainingAttributes?: Array<TaxonomyNodeInput> | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ArticleCreateLocalizationDataInput = {
  createdAt?: string | null | undefined;
  excerpt: string;
  title: string;
  updatedAt?: string | null | undefined;
};

export type ArticleCreateLocalizationInput = {
  /** Localization input */
  data: ArticleCreateLocalizationDataInput;
  locale: Locale;
};

export type ArticleCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ArticleCreateLocalizationInput> | null | undefined;
};

export type ArticleCreateManyInlineInput = {
  /** Connect multiple existing Article documents */
  connect?: Array<ArticleWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Article documents */
  create?: Array<ArticleCreateInput> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type ArticleWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type ArticleWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ArticleWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ArticleWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ArticleWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  author?: CoachWhereInput | null | undefined;
  /** All values in which the union is empty. */
  contentBlocks_empty?: boolean | null | undefined;
  /** Matches if the modular component contains at least one connection to the item provided to the filter */
  contentBlocks_some?: ArticlecontentBlocksUnionWhereInput | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: ArticleWhereStageInput | null | undefined;
  documentInStages_none?: ArticleWhereStageInput | null | undefined;
  documentInStages_some?: ArticleWhereStageInput | null | undefined;
  excerpt?: string | null | undefined;
  /** All values containing the given string. */
  excerpt_contains?: string | null | undefined;
  /** All values ending with the given string. */
  excerpt_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  excerpt_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  excerpt_not?: string | null | undefined;
  /** All values not containing the given string. */
  excerpt_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  excerpt_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  excerpt_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  excerpt_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  excerpt_starts_with?: string | null | undefined;
  heroAsset?: AssetWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  relatedExercises_every?: ExerciseWhereInput | null | undefined;
  relatedExercises_none?: ExerciseWhereInput | null | undefined;
  relatedExercises_some?: ExerciseWhereInput | null | undefined;
  relatedProgrammes_every?: WorkoutProgrammeWhereInput | null | undefined;
  relatedProgrammes_none?: WorkoutProgrammeWhereInput | null | undefined;
  relatedProgrammes_some?: WorkoutProgrammeWhereInput | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  seo?: SeoMetadataWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  trainingAttributes?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  trainingAttributes_contains_all?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  trainingAttributes_contains_none?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  trainingAttributes_contains_some?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains any item that is a descendant of the provided taxonomy nodes */
  trainingAttributes_descendants_of?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  trainingAttributes_not?: Array<TaxonomyNodeWhereInput> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ArticleWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ArticleWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ArticleWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ArticleWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: ArticleWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References Article record uniquely */
export type ArticleWhereUniqueInput = {
  id?: string | number | null | undefined;
  slug?: string | null | undefined;
};

export type ArticlecontentBlocksUnionCreateInput = {
  CalloutBlock?: CalloutBlockCreateInput | null | undefined;
  CoachQuoteBlock?: CoachQuoteBlockCreateInput | null | undefined;
  ComparisonTableBlock?: ComparisonTableBlockCreateInput | null | undefined;
  ExerciseCarouselBlock?: ExerciseCarouselBlockCreateInput | null | undefined;
  ImageGalleryBlock?: ImageGalleryBlockCreateInput | null | undefined;
  MuscleMapBlock?: MuscleMapBlockCreateInput | null | undefined;
  RichTextBlock?: RichTextBlockCreateInput | null | undefined;
};

export type ArticlecontentBlocksUnionCreateManyInlineInput = {
  /** Create and connect multiple existing ArticlecontentBlocksUnion documents */
  create?: Array<ArticlecontentBlocksUnionCreateInput> | null | undefined;
};

export type ArticlecontentBlocksUnionWhereInput = {
  CalloutBlock?: CalloutBlockWhereInput | null | undefined;
  CoachQuoteBlock?: CoachQuoteBlockWhereInput | null | undefined;
  ComparisonTableBlock?: ComparisonTableBlockWhereInput | null | undefined;
  ExerciseCarouselBlock?: ExerciseCarouselBlockWhereInput | null | undefined;
  ImageGalleryBlock?: ImageGalleryBlockWhereInput | null | undefined;
  MuscleMapBlock?: MuscleMapBlockWhereInput | null | undefined;
  RichTextBlock?: RichTextBlockWhereInput | null | undefined;
};

export type AssetCreateInput = {
  /** altText input for default locale (en) */
  altText?: string | null | undefined;
  articleHeroAssetUses?: ArticleCreateManyInlineInput | null | undefined;
  coachPhotoUses?: CoachCreateManyInlineInput | null | undefined;
  createdAt?: string | null | undefined;
  equipmentImageUses?: EquipmentCreateManyInlineInput | null | undefined;
  exerciseGalleryUses?: ExerciseCreateManyInlineInput | null | undefined;
  exerciseVideoPosterUses?: ExerciseCreateManyInlineInput | null | undefined;
  fileName?: string | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: AssetCreateLocalizationsInput | null | undefined;
  mediaWithCaptionAssetUses?: MediaWithCaptionCreateManyInlineInput | null | undefined;
  muscleGroupIllustrationUses?: MuscleGroupCreateManyInlineInput | null | undefined;
  rightsSource?: string | null | undefined;
  seoMetadataSocialImageUses?: SeoMetadataCreateManyInlineInput | null | undefined;
  updatedAt?: string | null | undefined;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: string | null | undefined;
  workoutProgrammeHeroAssetUses?: WorkoutProgrammeCreateManyInlineInput | null | undefined;
};

export type AssetCreateLocalizationDataInput = {
  altText?: string | null | undefined;
  createdAt?: string | null | undefined;
  fileName?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: string | null | undefined;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<AssetCreateLocalizationInput> | null | undefined;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: Array<AssetWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Asset documents */
  create?: Array<AssetCreateInput> | null | undefined;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: AssetWhereUniqueInput | null | undefined;
  /** Create and connect one Asset document */
  create?: AssetCreateInput | null | undefined;
};

/** System Asset Upload Status */
export type AssetUploadStatus =
  | 'ASSET_CREATE_PENDING'
  | 'ASSET_ERROR_UPLOAD'
  | 'ASSET_UPDATE_PENDING'
  | 'ASSET_UPLOAD_COMPLETE';

/** Identifies documents */
export type AssetUploadWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<AssetUploadWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<AssetUploadWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<AssetUploadWhereInput> | null | undefined;
  expiresAt?: string | null | undefined;
  /** All values greater than the given value. */
  expiresAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  expiresAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  expiresAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  expiresAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: Array<string | null | undefined> | null | undefined;
  status?: AssetUploadStatus | null | undefined;
  /** All values that are contained in given list. */
  status_in?: Array<AssetUploadStatus | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: AssetUploadStatus | null | undefined;
  /** All values that are not contained in given list. */
  status_not_in?: Array<AssetUploadStatus | null | undefined> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<AssetWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<AssetWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<AssetWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  altText?: string | null | undefined;
  /** All values containing the given string. */
  altText_contains?: string | null | undefined;
  /** All values ending with the given string. */
  altText_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  altText_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  altText_not?: string | null | undefined;
  /** All values not containing the given string. */
  altText_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  altText_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  altText_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  altText_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  altText_starts_with?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: AssetWhereStageInput | null | undefined;
  documentInStages_none?: AssetWhereStageInput | null | undefined;
  documentInStages_some?: AssetWhereStageInput | null | undefined;
  fileName?: string | null | undefined;
  /** All values containing the given string. */
  fileName_contains?: string | null | undefined;
  /** All values ending with the given string. */
  fileName_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  fileName_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: string | null | undefined;
  /** All values not containing the given string. */
  fileName_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  fileName_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  fileName_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  fileName_starts_with?: string | null | undefined;
  handle?: string | null | undefined;
  /** All values containing the given string. */
  handle_contains?: string | null | undefined;
  /** All values ending with the given string. */
  handle_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  handle_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: string | null | undefined;
  /** All values not containing the given string. */
  handle_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  handle_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  handle_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  handle_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  handle_starts_with?: string | null | undefined;
  height?: number | null | undefined;
  /** All values greater than the given value. */
  height_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  height_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  height_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  height_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  height_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  height_not_in?: Array<number | null | undefined> | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  mimeType?: string | null | undefined;
  /** All values containing the given string. */
  mimeType_contains?: string | null | undefined;
  /** All values ending with the given string. */
  mimeType_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  mimeType_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: string | null | undefined;
  /** All values not containing the given string. */
  mimeType_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  mimeType_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  mimeType_starts_with?: string | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  rightsSource?: string | null | undefined;
  /** All values containing the given string. */
  rightsSource_contains?: string | null | undefined;
  /** All values ending with the given string. */
  rightsSource_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  rightsSource_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  rightsSource_not?: string | null | undefined;
  /** All values not containing the given string. */
  rightsSource_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  rightsSource_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  rightsSource_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  rightsSource_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  rightsSource_starts_with?: string | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  size?: number | null | undefined;
  /** All values greater than the given value. */
  size_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  size_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  size_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  size_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  size_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  size_not_in?: Array<number | null | undefined> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
  upload?: AssetUploadWhereInput | null | undefined;
  width?: number | null | undefined;
  /** All values greater than the given value. */
  width_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  width_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  width_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  width_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  width_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  width_not_in?: Array<number | null | undefined> | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<AssetWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<AssetWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<AssetWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: AssetWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type CalloutBlockCreateInput = {
  callout?: CalloutCreateOneInlineInput | null | undefined;
  updatedAt?: string | null | undefined;
};

/** Identifies documents */
export type CalloutBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<CalloutBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<CalloutBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<CalloutBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  callout?: CalloutWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type CalloutCreateInput = {
  /** body input for default locale (en) */
  body: RichContent;
  destination?: string | null | undefined;
  /** heading input for default locale (en) */
  heading: string;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: CalloutCreateLocalizationsInput | null | undefined;
  tone: CalloutTone;
  updatedAt?: string | null | undefined;
};

export type CalloutCreateLocalizationDataInput = {
  body: RichContent;
  heading: string;
  updatedAt?: string | null | undefined;
};

export type CalloutCreateLocalizationInput = {
  /** Localization input */
  data: CalloutCreateLocalizationDataInput;
  locale: Locale;
};

export type CalloutCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<CalloutCreateLocalizationInput> | null | undefined;
};

export type CalloutCreateOneInlineInput = {
  /** Create and connect one Callout document */
  create?: CalloutCreateInput | null | undefined;
};

export type CalloutTone =
  | 'CAUTION'
  | 'PROGRESSION'
  | 'RECOVERY'
  | 'TIP';

/** Identifies documents */
export type CalloutWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<CalloutWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<CalloutWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<CalloutWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  destination?: string | null | undefined;
  /** All values containing the given string. */
  destination_contains?: string | null | undefined;
  /** All values ending with the given string. */
  destination_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  destination_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  destination_not?: string | null | undefined;
  /** All values not containing the given string. */
  destination_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  destination_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  destination_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  destination_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  destination_starts_with?: string | null | undefined;
  heading?: string | null | undefined;
  /** All values containing the given string. */
  heading_contains?: string | null | undefined;
  /** All values ending with the given string. */
  heading_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  heading_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  heading_not?: string | null | undefined;
  /** All values not containing the given string. */
  heading_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  heading_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  heading_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  heading_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  heading_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  tone?: CalloutTone | null | undefined;
  /** All values that are contained in given list. */
  tone_in?: Array<CalloutTone | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  tone_not?: CalloutTone | null | undefined;
  /** All values that are not contained in given list. */
  tone_not_in?: Array<CalloutTone | null | undefined> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type CoachCreateInput = {
  articles?: ArticleCreateManyInlineInput | null | undefined;
  /** biography input for default locale (en) */
  biography?: RichContent | null | undefined;
  coachQuoteBlockCoachUses?: CoachQuoteBlockCreateManyInlineInput | null | undefined;
  createdAt?: string | null | undefined;
  /** credentials input for default locale (en) */
  credentials?: Array<string> | null | undefined;
  exercises?: ExerciseCreateManyInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: CoachCreateLocalizationsInput | null | undefined;
  name: string;
  photo?: AssetCreateOneInlineInput | null | undefined;
  programmes?: WorkoutProgrammeCreateManyInlineInput | null | undefined;
  /** role input for default locale (en) */
  role: string;
  slug: string;
  socialLinks?: unknown;
  updatedAt?: string | null | undefined;
};

export type CoachCreateLocalizationDataInput = {
  biography?: RichContent | null | undefined;
  createdAt?: string | null | undefined;
  credentials?: Array<string> | null | undefined;
  role: string;
  updatedAt?: string | null | undefined;
};

export type CoachCreateLocalizationInput = {
  /** Localization input */
  data: CoachCreateLocalizationDataInput;
  locale: Locale;
};

export type CoachCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<CoachCreateLocalizationInput> | null | undefined;
};

export type CoachCreateManyInlineInput = {
  /** Connect multiple existing Coach documents */
  connect?: Array<CoachWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Coach documents */
  create?: Array<CoachCreateInput> | null | undefined;
};

export type CoachCreateOneInlineInput = {
  /** Connect one existing Coach document */
  connect?: CoachWhereUniqueInput | null | undefined;
  /** Create and connect one Coach document */
  create?: CoachCreateInput | null | undefined;
};

export type CoachQuoteBlockCreateInput = {
  coach?: CoachCreateOneInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: CoachQuoteBlockCreateLocalizationsInput | null | undefined;
  /** quote input for default locale (en) */
  quote?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type CoachQuoteBlockCreateLocalizationDataInput = {
  quote?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type CoachQuoteBlockCreateLocalizationInput = {
  /** Localization input */
  data: CoachQuoteBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type CoachQuoteBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<CoachQuoteBlockCreateLocalizationInput> | null | undefined;
};

export type CoachQuoteBlockCreateManyInlineInput = {
  /** Create and connect multiple existing CoachQuoteBlock documents */
  create?: Array<CoachQuoteBlockCreateInput> | null | undefined;
};

/** Identifies documents */
export type CoachQuoteBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<CoachQuoteBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<CoachQuoteBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<CoachQuoteBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  coach?: CoachWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  quote?: string | null | undefined;
  /** All values containing the given string. */
  quote_contains?: string | null | undefined;
  /** All values ending with the given string. */
  quote_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  quote_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  quote_not?: string | null | undefined;
  /** All values not containing the given string. */
  quote_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  quote_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  quote_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  quote_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  quote_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type CoachWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type CoachWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<CoachWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<CoachWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<CoachWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  articles_every?: ArticleWhereInput | null | undefined;
  articles_none?: ArticleWhereInput | null | undefined;
  articles_some?: ArticleWhereInput | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  credentials?: Array<string> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  credentials_contains_all?: Array<string> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  credentials_contains_none?: Array<string> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  credentials_contains_some?: Array<string> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  credentials_not?: Array<string> | null | undefined;
  documentInStages_every?: CoachWhereStageInput | null | undefined;
  documentInStages_none?: CoachWhereStageInput | null | undefined;
  documentInStages_some?: CoachWhereStageInput | null | undefined;
  exercises_every?: ExerciseWhereInput | null | undefined;
  exercises_none?: ExerciseWhereInput | null | undefined;
  exercises_some?: ExerciseWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  name?: string | null | undefined;
  /** All values containing the given string. */
  name_contains?: string | null | undefined;
  /** All values ending with the given string. */
  name_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  name_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: string | null | undefined;
  /** All values not containing the given string. */
  name_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  name_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  name_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  name_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  name_starts_with?: string | null | undefined;
  photo?: AssetWhereInput | null | undefined;
  programmes_every?: WorkoutProgrammeWhereInput | null | undefined;
  programmes_none?: WorkoutProgrammeWhereInput | null | undefined;
  programmes_some?: WorkoutProgrammeWhereInput | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  role?: string | null | undefined;
  /** All values containing the given string. */
  role_contains?: string | null | undefined;
  /** All values ending with the given string. */
  role_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  role_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  role_not?: string | null | undefined;
  /** All values not containing the given string. */
  role_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  role_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  role_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  role_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  role_starts_with?: string | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  /** All values containing the given json path. */
  socialLinks_json_path_exists?: string | null | undefined;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  socialLinks_value_recursive?: unknown;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CoachWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<CoachWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<CoachWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<CoachWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: CoachWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References Coach record uniquely */
export type CoachWhereUniqueInput = {
  id?: string | number | null | undefined;
  slug?: string | null | undefined;
};

export type ComparisonTableBlockCreateInput = {
  /** caption input for default locale (en) */
  caption?: string | null | undefined;
  /** columnHeadings input for default locale (en) */
  columnHeadings?: Array<string> | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ComparisonTableBlockCreateLocalizationsInput | null | undefined;
  rows?: ComparisonTableRowCreateManyInlineInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ComparisonTableBlockCreateLocalizationDataInput = {
  caption?: string | null | undefined;
  columnHeadings?: Array<string> | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ComparisonTableBlockCreateLocalizationInput = {
  /** Localization input */
  data: ComparisonTableBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type ComparisonTableBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ComparisonTableBlockCreateLocalizationInput> | null | undefined;
};

/** Identifies documents */
export type ComparisonTableBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ComparisonTableBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ComparisonTableBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ComparisonTableBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  caption?: string | null | undefined;
  /** All values containing the given string. */
  caption_contains?: string | null | undefined;
  /** All values ending with the given string. */
  caption_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  caption_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  caption_not?: string | null | undefined;
  /** All values not containing the given string. */
  caption_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  caption_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  caption_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  caption_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  caption_starts_with?: string | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  columnHeadings?: Array<string> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  columnHeadings_contains_all?: Array<string> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  columnHeadings_contains_none?: Array<string> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  columnHeadings_contains_some?: Array<string> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  columnHeadings_not?: Array<string> | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  rows_every?: ComparisonTableRowWhereInput | null | undefined;
  rows_none?: ComparisonTableRowWhereInput | null | undefined;
  rows_some?: ComparisonTableRowWhereInput | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type ComparisonTableRowCreateInput = {
  /** cells input for default locale (en) */
  cells?: Array<string> | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ComparisonTableRowCreateLocalizationsInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ComparisonTableRowCreateLocalizationDataInput = {
  cells?: Array<string> | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ComparisonTableRowCreateLocalizationInput = {
  /** Localization input */
  data: ComparisonTableRowCreateLocalizationDataInput;
  locale: Locale;
};

export type ComparisonTableRowCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ComparisonTableRowCreateLocalizationInput> | null | undefined;
};

export type ComparisonTableRowCreateManyInlineInput = {
  /** Create and connect multiple existing ComparisonTableRow documents */
  create?: Array<ComparisonTableRowCreateInput> | null | undefined;
};

/** Identifies documents */
export type ComparisonTableRowWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ComparisonTableRowWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ComparisonTableRowWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ComparisonTableRowWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  cells?: Array<string> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  cells_contains_all?: Array<string> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  cells_contains_none?: Array<string> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  cells_contains_some?: Array<string> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  cells_not?: Array<string> | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type Difficulty =
  | 'ADVANCED'
  | 'BEGINNER'
  | 'INTERMEDIATE';

export type EquipmentCategory =
  | 'ACCESSORY'
  | 'BODYWEIGHT'
  | 'CABLE'
  | 'CARDIO'
  | 'FREE_WEIGHTS'
  | 'MACHINE';

export type EquipmentCreateInput = {
  alternativeTo?: EquipmentCreateManyInlineInput | null | undefined;
  alternatives?: EquipmentCreateManyInlineInput | null | undefined;
  category: EquipmentCategory;
  createdAt?: string | null | undefined;
  /** description input for default locale (en) */
  description?: RichContent | null | undefined;
  exercises?: ExerciseCreateManyInlineInput | null | undefined;
  image?: AssetCreateOneInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: EquipmentCreateLocalizationsInput | null | undefined;
  /** name input for default locale (en) */
  name: string;
  slug: string;
  updatedAt?: string | null | undefined;
};

export type EquipmentCreateLocalizationDataInput = {
  createdAt?: string | null | undefined;
  description?: RichContent | null | undefined;
  name: string;
  updatedAt?: string | null | undefined;
};

export type EquipmentCreateLocalizationInput = {
  /** Localization input */
  data: EquipmentCreateLocalizationDataInput;
  locale: Locale;
};

export type EquipmentCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<EquipmentCreateLocalizationInput> | null | undefined;
};

export type EquipmentCreateManyInlineInput = {
  /** Connect multiple existing Equipment documents */
  connect?: Array<EquipmentWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Equipment documents */
  create?: Array<EquipmentCreateInput> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type EquipmentWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type EquipmentWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<EquipmentWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<EquipmentWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<EquipmentWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  alternativeTo_every?: EquipmentWhereInput | null | undefined;
  alternativeTo_none?: EquipmentWhereInput | null | undefined;
  alternativeTo_some?: EquipmentWhereInput | null | undefined;
  alternatives_every?: EquipmentWhereInput | null | undefined;
  alternatives_none?: EquipmentWhereInput | null | undefined;
  alternatives_some?: EquipmentWhereInput | null | undefined;
  category?: EquipmentCategory | null | undefined;
  /** All values that are contained in given list. */
  category_in?: Array<EquipmentCategory | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  category_not?: EquipmentCategory | null | undefined;
  /** All values that are not contained in given list. */
  category_not_in?: Array<EquipmentCategory | null | undefined> | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: EquipmentWhereStageInput | null | undefined;
  documentInStages_none?: EquipmentWhereStageInput | null | undefined;
  documentInStages_some?: EquipmentWhereStageInput | null | undefined;
  exercises_every?: ExerciseWhereInput | null | undefined;
  exercises_none?: ExerciseWhereInput | null | undefined;
  exercises_some?: ExerciseWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  image?: AssetWhereInput | null | undefined;
  name?: string | null | undefined;
  /** All values containing the given string. */
  name_contains?: string | null | undefined;
  /** All values ending with the given string. */
  name_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  name_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: string | null | undefined;
  /** All values not containing the given string. */
  name_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  name_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  name_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  name_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  name_starts_with?: string | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type EquipmentWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<EquipmentWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<EquipmentWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<EquipmentWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: EquipmentWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References Equipment record uniquely */
export type EquipmentWhereUniqueInput = {
  id?: string | number | null | undefined;
  slug?: string | null | undefined;
};

export type ExerciseCarouselBlockCreateInput = {
  exercises?: ExerciseCreateManyInlineInput | null | undefined;
  /** heading input for default locale (en) */
  heading?: string | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ExerciseCarouselBlockCreateLocalizationsInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ExerciseCarouselBlockCreateLocalizationDataInput = {
  heading?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ExerciseCarouselBlockCreateLocalizationInput = {
  /** Localization input */
  data: ExerciseCarouselBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type ExerciseCarouselBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ExerciseCarouselBlockCreateLocalizationInput> | null | undefined;
};

export type ExerciseCarouselBlockCreateManyInlineInput = {
  /** Create and connect multiple existing ExerciseCarouselBlock documents */
  create?: Array<ExerciseCarouselBlockCreateInput> | null | undefined;
};

/** Identifies documents */
export type ExerciseCarouselBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ExerciseCarouselBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ExerciseCarouselBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ExerciseCarouselBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  exercises_every?: ExerciseWhereInput | null | undefined;
  exercises_none?: ExerciseWhereInput | null | undefined;
  exercises_some?: ExerciseWhereInput | null | undefined;
  heading?: string | null | undefined;
  /** All values containing the given string. */
  heading_contains?: string | null | undefined;
  /** All values ending with the given string. */
  heading_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  heading_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  heading_not?: string | null | undefined;
  /** All values not containing the given string. */
  heading_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  heading_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  heading_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  heading_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  heading_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type ExerciseCreateInput = {
  /** barbellSetup input for default locale (en) */
  barbellSetup?: string | null | undefined;
  coach?: CoachCreateOneInlineInput | null | undefined;
  createdAt?: string | null | undefined;
  difficulty: Difficulty;
  durationMinutes?: number | null | undefined;
  equipment?: EquipmentCreateManyInlineInput | null | undefined;
  exerciseCarouselBlockExercisesUses?: ExerciseCarouselBlockCreateManyInlineInput | null | undefined;
  exerciseSets?: ExerciseSetCreateManyInlineInput | null | undefined;
  gallery?: AssetCreateManyInlineInput | null | undefined;
  /** instructions input for default locale (en) */
  instructions: RichContent;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ExerciseCreateLocalizationsInput | null | undefined;
  /** machineAlternative input for default locale (en) */
  machineAlternative?: string | null | undefined;
  /** machineSetup input for default locale (en) */
  machineSetup?: string | null | undefined;
  modality: ExerciseModality;
  primaryMuscles?: MuscleGroupCreateManyInlineInput | null | undefined;
  /** progressionLevel input for default locale (en) */
  progressionLevel?: string | null | undefined;
  /** rackHeight input for default locale (en) */
  rackHeight?: string | null | undefined;
  relatedArticles?: ArticleCreateManyInlineInput | null | undefined;
  safetyPinsRequired?: boolean | null | undefined;
  /** seatPosition input for default locale (en) */
  seatPosition?: string | null | undefined;
  secondaryMuscles?: MuscleGroupCreateManyInlineInput | null | undefined;
  seo?: SeoMetadataCreateOneInlineInput | null | undefined;
  slug: string;
  substitutedBy?: ExerciseCreateManyInlineInput | null | undefined;
  substitutions?: ExerciseCreateManyInlineInput | null | undefined;
  /** summary input for default locale (en) */
  summary: string;
  /** title input for default locale (en) */
  title: string;
  trainingAttributes?: Array<TaxonomyNodeInput> | null | undefined;
  updatedAt?: string | null | undefined;
  videoPoster?: AssetCreateOneInlineInput | null | undefined;
  /** videoTranscript input for default locale (en) */
  videoTranscript?: RichContent | null | undefined;
  youtubeVideoId?: string | null | undefined;
};

export type ExerciseCreateLocalizationDataInput = {
  barbellSetup?: string | null | undefined;
  createdAt?: string | null | undefined;
  instructions: RichContent;
  machineAlternative?: string | null | undefined;
  machineSetup?: string | null | undefined;
  progressionLevel?: string | null | undefined;
  rackHeight?: string | null | undefined;
  seatPosition?: string | null | undefined;
  summary: string;
  title: string;
  updatedAt?: string | null | undefined;
  videoTranscript?: RichContent | null | undefined;
};

export type ExerciseCreateLocalizationInput = {
  /** Localization input */
  data: ExerciseCreateLocalizationDataInput;
  locale: Locale;
};

export type ExerciseCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ExerciseCreateLocalizationInput> | null | undefined;
};

export type ExerciseCreateManyInlineInput = {
  /** Connect multiple existing Exercise documents */
  connect?: Array<ExerciseWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing Exercise documents */
  create?: Array<ExerciseCreateInput> | null | undefined;
};

export type ExerciseCreateOneInlineInput = {
  /** Connect one existing Exercise document */
  connect?: ExerciseWhereUniqueInput | null | undefined;
  /** Create and connect one Exercise document */
  create?: ExerciseCreateInput | null | undefined;
};

export type ExerciseModality =
  | 'BARBELL'
  | 'BODYWEIGHT'
  | 'CABLE'
  | 'CARDIO'
  | 'DUMBBELL'
  | 'KETTLEBELL'
  | 'MACHINE';

export type ExerciseSetCreateInput = {
  /** coachNote input for default locale (en) */
  coachNote?: RichContent | null | undefined;
  createdAt?: string | null | undefined;
  exercise?: ExerciseCreateOneInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ExerciseSetCreateLocalizationsInput | null | undefined;
  order: number;
  repRange: string;
  restSeconds?: number | null | undefined;
  session?: WorkoutSessionCreateOneInlineInput | null | undefined;
  sets: number;
  tempo?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ExerciseSetCreateLocalizationDataInput = {
  coachNote?: RichContent | null | undefined;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ExerciseSetCreateLocalizationInput = {
  /** Localization input */
  data: ExerciseSetCreateLocalizationDataInput;
  locale: Locale;
};

export type ExerciseSetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ExerciseSetCreateLocalizationInput> | null | undefined;
};

export type ExerciseSetCreateManyInlineInput = {
  /** Connect multiple existing ExerciseSet documents */
  connect?: Array<ExerciseSetWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing ExerciseSet documents */
  create?: Array<ExerciseSetCreateInput> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type ExerciseSetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type ExerciseSetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ExerciseSetWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ExerciseSetWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ExerciseSetWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: ExerciseSetWhereStageInput | null | undefined;
  documentInStages_none?: ExerciseSetWhereStageInput | null | undefined;
  documentInStages_some?: ExerciseSetWhereStageInput | null | undefined;
  exercise?: ExerciseWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  order?: number | null | undefined;
  /** All values greater than the given value. */
  order_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  order_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  order_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  order_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  order_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  order_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  order_not_in?: Array<number | null | undefined> | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  repRange?: string | null | undefined;
  /** All values containing the given string. */
  repRange_contains?: string | null | undefined;
  /** All values ending with the given string. */
  repRange_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  repRange_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  repRange_not?: string | null | undefined;
  /** All values not containing the given string. */
  repRange_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  repRange_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  repRange_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  repRange_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  repRange_starts_with?: string | null | undefined;
  restSeconds?: number | null | undefined;
  /** All values greater than the given value. */
  restSeconds_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  restSeconds_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  restSeconds_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  restSeconds_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  restSeconds_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  restSeconds_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  restSeconds_not_in?: Array<number | null | undefined> | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  session?: WorkoutSessionWhereInput | null | undefined;
  sets?: number | null | undefined;
  /** All values greater than the given value. */
  sets_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  sets_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  sets_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  sets_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  sets_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  sets_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  sets_not_in?: Array<number | null | undefined> | null | undefined;
  tempo?: string | null | undefined;
  /** All values containing the given string. */
  tempo_contains?: string | null | undefined;
  /** All values ending with the given string. */
  tempo_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  tempo_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  tempo_not?: string | null | undefined;
  /** All values not containing the given string. */
  tempo_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  tempo_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  tempo_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  tempo_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  tempo_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ExerciseSetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ExerciseSetWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ExerciseSetWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ExerciseSetWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: ExerciseSetWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References ExerciseSet record uniquely */
export type ExerciseSetWhereUniqueInput = {
  id?: string | number | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type ExerciseWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type ExerciseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ExerciseWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ExerciseWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ExerciseWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  barbellSetup?: string | null | undefined;
  /** All values containing the given string. */
  barbellSetup_contains?: string | null | undefined;
  /** All values ending with the given string. */
  barbellSetup_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  barbellSetup_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  barbellSetup_not?: string | null | undefined;
  /** All values not containing the given string. */
  barbellSetup_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  barbellSetup_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  barbellSetup_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  barbellSetup_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  barbellSetup_starts_with?: string | null | undefined;
  coach?: CoachWhereInput | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  difficulty?: Difficulty | null | undefined;
  /** All values that are contained in given list. */
  difficulty_in?: Array<Difficulty | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  difficulty_not?: Difficulty | null | undefined;
  /** All values that are not contained in given list. */
  difficulty_not_in?: Array<Difficulty | null | undefined> | null | undefined;
  documentInStages_every?: ExerciseWhereStageInput | null | undefined;
  documentInStages_none?: ExerciseWhereStageInput | null | undefined;
  documentInStages_some?: ExerciseWhereStageInput | null | undefined;
  durationMinutes?: number | null | undefined;
  /** All values greater than the given value. */
  durationMinutes_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  durationMinutes_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  durationMinutes_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  durationMinutes_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  durationMinutes_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  durationMinutes_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  durationMinutes_not_in?: Array<number | null | undefined> | null | undefined;
  equipment_every?: EquipmentWhereInput | null | undefined;
  equipment_none?: EquipmentWhereInput | null | undefined;
  equipment_some?: EquipmentWhereInput | null | undefined;
  exerciseSets_every?: ExerciseSetWhereInput | null | undefined;
  exerciseSets_none?: ExerciseSetWhereInput | null | undefined;
  exerciseSets_some?: ExerciseSetWhereInput | null | undefined;
  gallery_every?: AssetWhereInput | null | undefined;
  gallery_none?: AssetWhereInput | null | undefined;
  gallery_some?: AssetWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  machineAlternative?: string | null | undefined;
  /** All values containing the given string. */
  machineAlternative_contains?: string | null | undefined;
  /** All values ending with the given string. */
  machineAlternative_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  machineAlternative_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  machineAlternative_not?: string | null | undefined;
  /** All values not containing the given string. */
  machineAlternative_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  machineAlternative_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  machineAlternative_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  machineAlternative_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  machineAlternative_starts_with?: string | null | undefined;
  machineSetup?: string | null | undefined;
  /** All values containing the given string. */
  machineSetup_contains?: string | null | undefined;
  /** All values ending with the given string. */
  machineSetup_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  machineSetup_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  machineSetup_not?: string | null | undefined;
  /** All values not containing the given string. */
  machineSetup_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  machineSetup_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  machineSetup_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  machineSetup_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  machineSetup_starts_with?: string | null | undefined;
  modality?: ExerciseModality | null | undefined;
  /** All values that are contained in given list. */
  modality_in?: Array<ExerciseModality | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  modality_not?: ExerciseModality | null | undefined;
  /** All values that are not contained in given list. */
  modality_not_in?: Array<ExerciseModality | null | undefined> | null | undefined;
  primaryMuscles_every?: MuscleGroupWhereInput | null | undefined;
  primaryMuscles_none?: MuscleGroupWhereInput | null | undefined;
  primaryMuscles_some?: MuscleGroupWhereInput | null | undefined;
  progressionLevel?: string | null | undefined;
  /** All values containing the given string. */
  progressionLevel_contains?: string | null | undefined;
  /** All values ending with the given string. */
  progressionLevel_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  progressionLevel_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  progressionLevel_not?: string | null | undefined;
  /** All values not containing the given string. */
  progressionLevel_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  progressionLevel_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  progressionLevel_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  progressionLevel_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  progressionLevel_starts_with?: string | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  rackHeight?: string | null | undefined;
  /** All values containing the given string. */
  rackHeight_contains?: string | null | undefined;
  /** All values ending with the given string. */
  rackHeight_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  rackHeight_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  rackHeight_not?: string | null | undefined;
  /** All values not containing the given string. */
  rackHeight_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  rackHeight_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  rackHeight_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  rackHeight_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  rackHeight_starts_with?: string | null | undefined;
  relatedArticles_every?: ArticleWhereInput | null | undefined;
  relatedArticles_none?: ArticleWhereInput | null | undefined;
  relatedArticles_some?: ArticleWhereInput | null | undefined;
  safetyPinsRequired?: boolean | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  safetyPinsRequired_not?: boolean | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  seatPosition?: string | null | undefined;
  /** All values containing the given string. */
  seatPosition_contains?: string | null | undefined;
  /** All values ending with the given string. */
  seatPosition_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  seatPosition_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  seatPosition_not?: string | null | undefined;
  /** All values not containing the given string. */
  seatPosition_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  seatPosition_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  seatPosition_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  seatPosition_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  seatPosition_starts_with?: string | null | undefined;
  secondaryMuscles_every?: MuscleGroupWhereInput | null | undefined;
  secondaryMuscles_none?: MuscleGroupWhereInput | null | undefined;
  secondaryMuscles_some?: MuscleGroupWhereInput | null | undefined;
  seo?: SeoMetadataWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  substitutedBy_every?: ExerciseWhereInput | null | undefined;
  substitutedBy_none?: ExerciseWhereInput | null | undefined;
  substitutedBy_some?: ExerciseWhereInput | null | undefined;
  substitutions_every?: ExerciseWhereInput | null | undefined;
  substitutions_none?: ExerciseWhereInput | null | undefined;
  substitutions_some?: ExerciseWhereInput | null | undefined;
  summary?: string | null | undefined;
  /** All values containing the given string. */
  summary_contains?: string | null | undefined;
  /** All values ending with the given string. */
  summary_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  summary_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  summary_not?: string | null | undefined;
  /** All values not containing the given string. */
  summary_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  summary_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  summary_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  summary_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  summary_starts_with?: string | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  trainingAttributes?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  trainingAttributes_contains_all?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  trainingAttributes_contains_none?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  trainingAttributes_contains_some?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains any item that is a descendant of the provided taxonomy nodes */
  trainingAttributes_descendants_of?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  trainingAttributes_not?: Array<TaxonomyNodeWhereInput> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
  videoPoster?: AssetWhereInput | null | undefined;
  youtubeVideoId?: string | null | undefined;
  /** All values containing the given string. */
  youtubeVideoId_contains?: string | null | undefined;
  /** All values ending with the given string. */
  youtubeVideoId_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  youtubeVideoId_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  youtubeVideoId_not?: string | null | undefined;
  /** All values not containing the given string. */
  youtubeVideoId_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  youtubeVideoId_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  youtubeVideoId_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  youtubeVideoId_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  youtubeVideoId_starts_with?: string | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ExerciseWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ExerciseWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ExerciseWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ExerciseWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: ExerciseWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References Exercise record uniquely */
export type ExerciseWhereUniqueInput = {
  id?: string | number | null | undefined;
  slug?: string | null | undefined;
};

export type ImageGalleryBlockCreateInput = {
  /** heading input for default locale (en) */
  heading?: string | null | undefined;
  items?: MediaWithCaptionCreateManyInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: ImageGalleryBlockCreateLocalizationsInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ImageGalleryBlockCreateLocalizationDataInput = {
  heading?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type ImageGalleryBlockCreateLocalizationInput = {
  /** Localization input */
  data: ImageGalleryBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type ImageGalleryBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<ImageGalleryBlockCreateLocalizationInput> | null | undefined;
};

/** Identifies documents */
export type ImageGalleryBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ImageGalleryBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ImageGalleryBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ImageGalleryBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  heading?: string | null | undefined;
  /** All values containing the given string. */
  heading_contains?: string | null | undefined;
  /** All values ending with the given string. */
  heading_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  heading_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  heading_not?: string | null | undefined;
  /** All values not containing the given string. */
  heading_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  heading_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  heading_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  heading_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  heading_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  items_every?: MediaWithCaptionWhereInput | null | undefined;
  items_none?: MediaWithCaptionWhereInput | null | undefined;
  items_some?: MediaWithCaptionWhereInput | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

/** Locale system enumeration */
export type Locale =
  /** Czech practice locale for localized coaching language and units. */
  | 'cs'
  /** System locale */
  | 'en';

export type MediaWithCaptionCreateInput = {
  /** altTextOverride input for default locale (en) */
  altTextOverride?: string | null | undefined;
  asset?: AssetCreateOneInlineInput | null | undefined;
  /** caption input for default locale (en) */
  caption?: string | null | undefined;
  focalPoint?: string | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: MediaWithCaptionCreateLocalizationsInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type MediaWithCaptionCreateLocalizationDataInput = {
  altTextOverride?: string | null | undefined;
  caption?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type MediaWithCaptionCreateLocalizationInput = {
  /** Localization input */
  data: MediaWithCaptionCreateLocalizationDataInput;
  locale: Locale;
};

export type MediaWithCaptionCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<MediaWithCaptionCreateLocalizationInput> | null | undefined;
};

export type MediaWithCaptionCreateManyInlineInput = {
  /** Create and connect multiple existing MediaWithCaption documents */
  create?: Array<MediaWithCaptionCreateInput> | null | undefined;
};

/** Identifies documents */
export type MediaWithCaptionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<MediaWithCaptionWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<MediaWithCaptionWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<MediaWithCaptionWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  altTextOverride?: string | null | undefined;
  /** All values containing the given string. */
  altTextOverride_contains?: string | null | undefined;
  /** All values ending with the given string. */
  altTextOverride_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  altTextOverride_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  altTextOverride_not?: string | null | undefined;
  /** All values not containing the given string. */
  altTextOverride_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  altTextOverride_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  altTextOverride_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  altTextOverride_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  altTextOverride_starts_with?: string | null | undefined;
  asset?: AssetWhereInput | null | undefined;
  caption?: string | null | undefined;
  /** All values containing the given string. */
  caption_contains?: string | null | undefined;
  /** All values ending with the given string. */
  caption_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  caption_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  caption_not?: string | null | undefined;
  /** All values not containing the given string. */
  caption_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  caption_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  caption_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  caption_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  caption_starts_with?: string | null | undefined;
  focalPoint?: string | null | undefined;
  /** All values containing the given string. */
  focalPoint_contains?: string | null | undefined;
  /** All values ending with the given string. */
  focalPoint_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  focalPoint_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  focalPoint_not?: string | null | undefined;
  /** All values not containing the given string. */
  focalPoint_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  focalPoint_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  focalPoint_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  focalPoint_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  focalPoint_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type MuscleGroupCreateInput = {
  bodyRegion: string;
  createdAt?: string | null | undefined;
  /** description input for default locale (en) */
  description?: RichContent | null | undefined;
  illustration?: AssetCreateOneInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: MuscleGroupCreateLocalizationsInput | null | undefined;
  meshId: string;
  muscleMapBlockMuscleGroupsUses?: MuscleMapBlockCreateManyInlineInput | null | undefined;
  /** name input for default locale (en) */
  name: string;
  primaryExercises?: ExerciseCreateManyInlineInput | null | undefined;
  secondaryExercises?: ExerciseCreateManyInlineInput | null | undefined;
  slug: string;
  updatedAt?: string | null | undefined;
  workoutIntentMuscleUses?: WorkoutIntentCreateManyInlineInput | null | undefined;
};

export type MuscleGroupCreateLocalizationDataInput = {
  createdAt?: string | null | undefined;
  description?: RichContent | null | undefined;
  name: string;
  updatedAt?: string | null | undefined;
};

export type MuscleGroupCreateLocalizationInput = {
  /** Localization input */
  data: MuscleGroupCreateLocalizationDataInput;
  locale: Locale;
};

export type MuscleGroupCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<MuscleGroupCreateLocalizationInput> | null | undefined;
};

export type MuscleGroupCreateManyInlineInput = {
  /** Connect multiple existing MuscleGroup documents */
  connect?: Array<MuscleGroupWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing MuscleGroup documents */
  create?: Array<MuscleGroupCreateInput> | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type MuscleGroupWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type MuscleGroupWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<MuscleGroupWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<MuscleGroupWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<MuscleGroupWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  bodyRegion?: string | null | undefined;
  /** All values containing the given string. */
  bodyRegion_contains?: string | null | undefined;
  /** All values ending with the given string. */
  bodyRegion_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  bodyRegion_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  bodyRegion_not?: string | null | undefined;
  /** All values not containing the given string. */
  bodyRegion_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  bodyRegion_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  bodyRegion_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  bodyRegion_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  bodyRegion_starts_with?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: MuscleGroupWhereStageInput | null | undefined;
  documentInStages_none?: MuscleGroupWhereStageInput | null | undefined;
  documentInStages_some?: MuscleGroupWhereStageInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  illustration?: AssetWhereInput | null | undefined;
  meshId?: string | null | undefined;
  /** All values containing the given string. */
  meshId_contains?: string | null | undefined;
  /** All values ending with the given string. */
  meshId_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  meshId_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  meshId_not?: string | null | undefined;
  /** All values not containing the given string. */
  meshId_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  meshId_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  meshId_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  meshId_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  meshId_starts_with?: string | null | undefined;
  name?: string | null | undefined;
  /** All values containing the given string. */
  name_contains?: string | null | undefined;
  /** All values ending with the given string. */
  name_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  name_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: string | null | undefined;
  /** All values not containing the given string. */
  name_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  name_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  name_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  name_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  name_starts_with?: string | null | undefined;
  primaryExercises_every?: ExerciseWhereInput | null | undefined;
  primaryExercises_none?: ExerciseWhereInput | null | undefined;
  primaryExercises_some?: ExerciseWhereInput | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  secondaryExercises_every?: ExerciseWhereInput | null | undefined;
  secondaryExercises_none?: ExerciseWhereInput | null | undefined;
  secondaryExercises_some?: ExerciseWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type MuscleGroupWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<MuscleGroupWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<MuscleGroupWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<MuscleGroupWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: MuscleGroupWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References MuscleGroup record uniquely */
export type MuscleGroupWhereUniqueInput = {
  id?: string | number | null | undefined;
  meshId?: string | null | undefined;
  slug?: string | null | undefined;
};

export type MuscleMapBlockCreateInput = {
  /** body input for default locale (en) */
  body?: RichContent | null | undefined;
  /** heading input for default locale (en) */
  heading?: string | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: MuscleMapBlockCreateLocalizationsInput | null | undefined;
  muscleGroups?: MuscleGroupCreateManyInlineInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type MuscleMapBlockCreateLocalizationDataInput = {
  body?: RichContent | null | undefined;
  heading?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type MuscleMapBlockCreateLocalizationInput = {
  /** Localization input */
  data: MuscleMapBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type MuscleMapBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<MuscleMapBlockCreateLocalizationInput> | null | undefined;
};

export type MuscleMapBlockCreateManyInlineInput = {
  /** Create and connect multiple existing MuscleMapBlock documents */
  create?: Array<MuscleMapBlockCreateInput> | null | undefined;
};

/** Identifies documents */
export type MuscleMapBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<MuscleMapBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<MuscleMapBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<MuscleMapBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  heading?: string | null | undefined;
  /** All values containing the given string. */
  heading_contains?: string | null | undefined;
  /** All values ending with the given string. */
  heading_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  heading_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  heading_not?: string | null | undefined;
  /** All values not containing the given string. */
  heading_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  heading_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  heading_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  heading_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  heading_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  muscleGroups_every?: MuscleGroupWhereInput | null | undefined;
  muscleGroups_none?: MuscleGroupWhereInput | null | undefined;
  muscleGroups_some?: MuscleGroupWhereInput | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

export type RichTextBlockCreateInput = {
  /** body input for default locale (en) */
  body?: RichContent | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: RichTextBlockCreateLocalizationsInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type RichTextBlockCreateLocalizationDataInput = {
  body?: RichContent | null | undefined;
  updatedAt?: string | null | undefined;
};

export type RichTextBlockCreateLocalizationInput = {
  /** Localization input */
  data: RichTextBlockCreateLocalizationDataInput;
  locale: Locale;
};

export type RichTextBlockCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<RichTextBlockCreateLocalizationInput> | null | undefined;
};

/** Identifies documents */
export type RichTextBlockWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<RichTextBlockWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<RichTextBlockWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<RichTextBlockWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

/** System Scheduled Operation Status */
export type ScheduledOperationStatus =
  | 'CANCELED'
  | 'COMPLETED'
  | 'FAILED'
  | 'IN_PROGRESS'
  | 'PENDING';

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ScheduledOperationWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ScheduledOperationWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ScheduledOperationWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  description?: string | null | undefined;
  /** All values containing the given string. */
  description_contains?: string | null | undefined;
  /** All values ending with the given string. */
  description_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  description_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: string | null | undefined;
  /** All values not containing the given string. */
  description_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  description_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  description_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  description_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  description_starts_with?: string | null | undefined;
  errorMessage?: string | null | undefined;
  /** All values containing the given string. */
  errorMessage_contains?: string | null | undefined;
  /** All values ending with the given string. */
  errorMessage_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  errorMessage_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: string | null | undefined;
  /** All values not containing the given string. */
  errorMessage_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  errorMessage_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: string | null | undefined;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: unknown;
  release?: ScheduledReleaseWhereInput | null | undefined;
  status?: ScheduledOperationStatus | null | undefined;
  /** All values that are contained in given list. */
  status_in?: Array<ScheduledOperationStatus | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: ScheduledOperationStatus | null | undefined;
  /** All values that are not contained in given list. */
  status_not_in?: Array<ScheduledOperationStatus | null | undefined> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** System Scheduled Release Status */
export type ScheduledReleaseStatus =
  | 'COMPLETED'
  | 'FAILED'
  | 'IN_PROGRESS'
  | 'PENDING';

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<ScheduledReleaseWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<ScheduledReleaseWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<ScheduledReleaseWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  description?: string | null | undefined;
  /** All values containing the given string. */
  description_contains?: string | null | undefined;
  /** All values ending with the given string. */
  description_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  description_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: string | null | undefined;
  /** All values not containing the given string. */
  description_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  description_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  description_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  description_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  description_starts_with?: string | null | undefined;
  errorMessage?: string | null | undefined;
  /** All values containing the given string. */
  errorMessage_contains?: string | null | undefined;
  /** All values ending with the given string. */
  errorMessage_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  errorMessage_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: string | null | undefined;
  /** All values not containing the given string. */
  errorMessage_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  errorMessage_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  isActive?: boolean | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: boolean | null | undefined;
  isImplicit?: boolean | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: boolean | null | undefined;
  operations_every?: ScheduledOperationWhereInput | null | undefined;
  operations_none?: ScheduledOperationWhereInput | null | undefined;
  operations_some?: ScheduledOperationWhereInput | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  releaseAt?: string | null | undefined;
  /** All values greater than the given value. */
  releaseAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  releaseAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  releaseAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  releaseAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: Array<string | null | undefined> | null | undefined;
  status?: ScheduledReleaseStatus | null | undefined;
  /** All values that are contained in given list. */
  status_in?: Array<ScheduledReleaseStatus | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: ScheduledReleaseStatus | null | undefined;
  /** All values that are not contained in given list. */
  status_not_in?: Array<ScheduledReleaseStatus | null | undefined> | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

export type SeoMetadataCreateInput = {
  /** description input for default locale (en) */
  description?: string | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: SeoMetadataCreateLocalizationsInput | null | undefined;
  noIndex?: boolean | null | undefined;
  socialImage?: AssetCreateOneInlineInput | null | undefined;
  /** title input for default locale (en) */
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type SeoMetadataCreateLocalizationDataInput = {
  description?: string | null | undefined;
  title?: string | null | undefined;
  updatedAt?: string | null | undefined;
};

export type SeoMetadataCreateLocalizationInput = {
  /** Localization input */
  data: SeoMetadataCreateLocalizationDataInput;
  locale: Locale;
};

export type SeoMetadataCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<SeoMetadataCreateLocalizationInput> | null | undefined;
};

export type SeoMetadataCreateManyInlineInput = {
  /** Create and connect multiple existing SeoMetadata documents */
  create?: Array<SeoMetadataCreateInput> | null | undefined;
};

export type SeoMetadataCreateOneInlineInput = {
  /** Create and connect one SeoMetadata document */
  create?: SeoMetadataCreateInput | null | undefined;
};

/** Identifies documents */
export type SeoMetadataWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<SeoMetadataWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<SeoMetadataWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<SeoMetadataWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  description?: string | null | undefined;
  /** All values containing the given string. */
  description_contains?: string | null | undefined;
  /** All values ending with the given string. */
  description_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  description_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: string | null | undefined;
  /** All values not containing the given string. */
  description_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  description_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  description_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  description_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  description_starts_with?: string | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  noIndex?: boolean | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  noIndex_not?: boolean | null | undefined;
  socialImage?: AssetWhereInput | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

/** Stage system enumeration */
export type Stage =
  /** The Draft is the default stage for all your content. */
  | 'DRAFT'
  /** The Published stage is where you can publish your content to. */
  | 'PUBLISHED'
  /** Coach review for form, safety, and training guidance. */
  | 'REVIEW';

export type TaxonomyNodeInput = {
  value: string;
};

export type TaxonomyNodeWhereInput = {
  value: string;
};

export type TrainingGoal =
  | 'ENDURANCE'
  | 'GENERAL_FITNESS'
  | 'HYPERTROPHY'
  | 'MOBILITY'
  | 'STRENGTH';

/** System User Kind */
export type UserKind =
  | 'APP_TOKEN'
  | 'MEMBER'
  | 'PAT'
  | 'PUBLIC'
  | 'WEBHOOK';

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<UserWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<UserWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<UserWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  documentInStages_every?: UserWhereStageInput | null | undefined;
  documentInStages_none?: UserWhereStageInput | null | undefined;
  documentInStages_some?: UserWhereStageInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  isActive?: boolean | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: boolean | null | undefined;
  kind?: UserKind | null | undefined;
  /** All values that are contained in given list. */
  kind_in?: Array<UserKind | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: UserKind | null | undefined;
  /** All values that are not contained in given list. */
  kind_not_in?: Array<UserKind | null | undefined> | null | undefined;
  name?: string | null | undefined;
  /** All values containing the given string. */
  name_contains?: string | null | undefined;
  /** All values ending with the given string. */
  name_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  name_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: string | null | undefined;
  /** All values not containing the given string. */
  name_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  name_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  name_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  name_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  name_starts_with?: string | null | undefined;
  picture?: string | null | undefined;
  /** All values containing the given string. */
  picture_contains?: string | null | undefined;
  /** All values ending with the given string. */
  picture_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  picture_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: string | null | undefined;
  /** All values not containing the given string. */
  picture_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  picture_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  picture_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  picture_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  picture_starts_with?: string | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<UserWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<UserWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<UserWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: UserWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

export type WorkoutIntentCreateInput = {
  availableMinutes: number;
  consent: boolean;
  contactEmail?: string | null | undefined;
  createdAt?: string | null | undefined;
  experienceLevel: Difficulty;
  goal: TrainingGoal;
  intentStatus: WorkoutIntentStatus;
  selectedMuscles?: MuscleGroupCreateManyInlineInput | null | undefined;
  updatedAt?: string | null | undefined;
};

export type WorkoutIntentCreateManyInlineInput = {
  /** Connect multiple existing WorkoutIntent documents */
  connect?: Array<WorkoutIntentWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing WorkoutIntent documents */
  create?: Array<WorkoutIntentCreateInput> | null | undefined;
};

export type WorkoutIntentStatus =
  | 'ARCHIVED'
  | 'NEW'
  | 'REVIEWED';

/** References WorkoutIntent record uniquely */
export type WorkoutIntentWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type WorkoutProgrammeCreateInput = {
  coach?: CoachCreateOneInlineInput | null | undefined;
  createdAt?: string | null | undefined;
  durationWeeks: number;
  goal: TrainingGoal;
  heroAsset?: AssetCreateOneInlineInput | null | undefined;
  level: Difficulty;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: WorkoutProgrammeCreateLocalizationsInput | null | undefined;
  /** overview input for default locale (en) */
  overview?: RichContent | null | undefined;
  relatedArticles?: ArticleCreateManyInlineInput | null | undefined;
  seo?: SeoMetadataCreateOneInlineInput | null | undefined;
  sessions?: WorkoutSessionCreateManyInlineInput | null | undefined;
  sessionsPerWeek: number;
  slug: string;
  /** title input for default locale (en) */
  title: string;
  trainingAttributes?: Array<TaxonomyNodeInput> | null | undefined;
  updatedAt?: string | null | undefined;
};

export type WorkoutProgrammeCreateLocalizationDataInput = {
  createdAt?: string | null | undefined;
  overview?: RichContent | null | undefined;
  title: string;
  updatedAt?: string | null | undefined;
};

export type WorkoutProgrammeCreateLocalizationInput = {
  /** Localization input */
  data: WorkoutProgrammeCreateLocalizationDataInput;
  locale: Locale;
};

export type WorkoutProgrammeCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<WorkoutProgrammeCreateLocalizationInput> | null | undefined;
};

export type WorkoutProgrammeCreateManyInlineInput = {
  /** Connect multiple existing WorkoutProgramme documents */
  connect?: Array<WorkoutProgrammeWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing WorkoutProgramme documents */
  create?: Array<WorkoutProgrammeCreateInput> | null | undefined;
};

export type WorkoutProgrammeCreateOneInlineInput = {
  /** Connect one existing WorkoutProgramme document */
  connect?: WorkoutProgrammeWhereUniqueInput | null | undefined;
  /** Create and connect one WorkoutProgramme document */
  create?: WorkoutProgrammeCreateInput | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type WorkoutProgrammeWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type WorkoutProgrammeWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<WorkoutProgrammeWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<WorkoutProgrammeWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<WorkoutProgrammeWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  coach?: CoachWhereInput | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: WorkoutProgrammeWhereStageInput | null | undefined;
  documentInStages_none?: WorkoutProgrammeWhereStageInput | null | undefined;
  documentInStages_some?: WorkoutProgrammeWhereStageInput | null | undefined;
  durationWeeks?: number | null | undefined;
  /** All values greater than the given value. */
  durationWeeks_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  durationWeeks_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  durationWeeks_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  durationWeeks_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  durationWeeks_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  durationWeeks_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  durationWeeks_not_in?: Array<number | null | undefined> | null | undefined;
  goal?: TrainingGoal | null | undefined;
  /** All values that are contained in given list. */
  goal_in?: Array<TrainingGoal | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  goal_not?: TrainingGoal | null | undefined;
  /** All values that are not contained in given list. */
  goal_not_in?: Array<TrainingGoal | null | undefined> | null | undefined;
  heroAsset?: AssetWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  level?: Difficulty | null | undefined;
  /** All values that are contained in given list. */
  level_in?: Array<Difficulty | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  level_not?: Difficulty | null | undefined;
  /** All values that are not contained in given list. */
  level_not_in?: Array<Difficulty | null | undefined> | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  relatedArticles_every?: ArticleWhereInput | null | undefined;
  relatedArticles_none?: ArticleWhereInput | null | undefined;
  relatedArticles_some?: ArticleWhereInput | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  seo?: SeoMetadataWhereInput | null | undefined;
  sessionsPerWeek?: number | null | undefined;
  /** All values greater than the given value. */
  sessionsPerWeek_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  sessionsPerWeek_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  sessionsPerWeek_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  sessionsPerWeek_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  sessionsPerWeek_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  sessionsPerWeek_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  sessionsPerWeek_not_in?: Array<number | null | undefined> | null | undefined;
  sessions_every?: WorkoutSessionWhereInput | null | undefined;
  sessions_none?: WorkoutSessionWhereInput | null | undefined;
  sessions_some?: WorkoutSessionWhereInput | null | undefined;
  slug?: string | null | undefined;
  /** All values containing the given string. */
  slug_contains?: string | null | undefined;
  /** All values ending with the given string. */
  slug_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  slug_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: string | null | undefined;
  /** All values not containing the given string. */
  slug_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  slug_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  slug_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  slug_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  slug_starts_with?: string | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  trainingAttributes?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains *all* items provided to the filter */
  trainingAttributes_contains_all?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contain any of the items provided to the filter */
  trainingAttributes_contains_none?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains at least one item provided to the filter */
  trainingAttributes_contains_some?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array contains any item that is a descendant of the provided taxonomy nodes */
  trainingAttributes_descendants_of?: Array<TaxonomyNodeWhereInput> | null | undefined;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  trainingAttributes_not?: Array<TaxonomyNodeWhereInput> | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type WorkoutProgrammeWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<WorkoutProgrammeWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<WorkoutProgrammeWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<WorkoutProgrammeWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: WorkoutProgrammeWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References WorkoutProgramme record uniquely */
export type WorkoutProgrammeWhereUniqueInput = {
  id?: string | number | null | undefined;
  slug?: string | null | undefined;
};

export type WorkoutSessionCreateInput = {
  /** cooldown input for default locale (en) */
  cooldown?: RichContent | null | undefined;
  createdAt?: string | null | undefined;
  estimatedMinutes: number;
  exerciseSets?: ExerciseSetCreateManyInlineInput | null | undefined;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: WorkoutSessionCreateLocalizationsInput | null | undefined;
  order: number;
  programme?: WorkoutProgrammeCreateOneInlineInput | null | undefined;
  /** title input for default locale (en) */
  title: string;
  updatedAt?: string | null | undefined;
  /** warmup input for default locale (en) */
  warmup?: RichContent | null | undefined;
};

export type WorkoutSessionCreateLocalizationDataInput = {
  cooldown?: RichContent | null | undefined;
  createdAt?: string | null | undefined;
  title: string;
  updatedAt?: string | null | undefined;
  warmup?: RichContent | null | undefined;
};

export type WorkoutSessionCreateLocalizationInput = {
  /** Localization input */
  data: WorkoutSessionCreateLocalizationDataInput;
  locale: Locale;
};

export type WorkoutSessionCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Array<WorkoutSessionCreateLocalizationInput> | null | undefined;
};

export type WorkoutSessionCreateManyInlineInput = {
  /** Connect multiple existing WorkoutSession documents */
  connect?: Array<WorkoutSessionWhereUniqueInput> | null | undefined;
  /** Create and connect multiple existing WorkoutSession documents */
  create?: Array<WorkoutSessionCreateInput> | null | undefined;
};

export type WorkoutSessionCreateOneInlineInput = {
  /** Connect one existing WorkoutSession document */
  connect?: WorkoutSessionWhereUniqueInput | null | undefined;
  /** Create and connect one WorkoutSession document */
  create?: WorkoutSessionCreateInput | null | undefined;
};

/** This contains a set of filters that can be used to compare values internally */
export type WorkoutSessionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: boolean | null | undefined;
};

/** Identifies documents */
export type WorkoutSessionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: Array<WorkoutSessionWhereInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<WorkoutSessionWhereInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<WorkoutSessionWhereInput> | null | undefined;
  /** Contains search across all appropriate fields. */
  _search?: string | null | undefined;
  createdAt?: string | null | undefined;
  /** All values greater than the given value. */
  createdAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  createdAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  createdAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  createdAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  createdAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  createdAt_not_in?: Array<string | null | undefined> | null | undefined;
  createdBy?: UserWhereInput | null | undefined;
  documentInStages_every?: WorkoutSessionWhereStageInput | null | undefined;
  documentInStages_none?: WorkoutSessionWhereStageInput | null | undefined;
  documentInStages_some?: WorkoutSessionWhereStageInput | null | undefined;
  estimatedMinutes?: number | null | undefined;
  /** All values greater than the given value. */
  estimatedMinutes_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  estimatedMinutes_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  estimatedMinutes_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  estimatedMinutes_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  estimatedMinutes_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  estimatedMinutes_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  estimatedMinutes_not_in?: Array<number | null | undefined> | null | undefined;
  exerciseSets_every?: ExerciseSetWhereInput | null | undefined;
  exerciseSets_none?: ExerciseSetWhereInput | null | undefined;
  exerciseSets_some?: ExerciseSetWhereInput | null | undefined;
  id?: string | number | null | undefined;
  /** All values containing the given string. */
  id_contains?: string | number | null | undefined;
  /** All values ending with the given string. */
  id_ends_with?: string | number | null | undefined;
  /** All values that are contained in given list. */
  id_in?: Array<string | number | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: string | number | null | undefined;
  /** All values not containing the given string. */
  id_not_contains?: string | number | null | undefined;
  /** All values not ending with the given string */
  id_not_ends_with?: string | number | null | undefined;
  /** All values that are not contained in given list. */
  id_not_in?: Array<string | number | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  id_not_starts_with?: string | number | null | undefined;
  /** All values starting with the given string. */
  id_starts_with?: string | number | null | undefined;
  order?: number | null | undefined;
  /** All values greater than the given value. */
  order_gt?: number | null | undefined;
  /** All values greater than or equal the given value. */
  order_gte?: number | null | undefined;
  /** All values that are contained in given list. */
  order_in?: Array<number | null | undefined> | null | undefined;
  /** All values less than the given value. */
  order_lt?: number | null | undefined;
  /** All values less than or equal the given value. */
  order_lte?: number | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  order_not?: number | null | undefined;
  /** All values that are not contained in given list. */
  order_not_in?: Array<number | null | undefined> | null | undefined;
  programme?: WorkoutProgrammeWhereInput | null | undefined;
  publishedAt?: string | null | undefined;
  /** All values greater than the given value. */
  publishedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  publishedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  publishedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  publishedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Array<string | null | undefined> | null | undefined;
  publishedBy?: UserWhereInput | null | undefined;
  scheduledIn_every?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_none?: ScheduledOperationWhereInput | null | undefined;
  scheduledIn_some?: ScheduledOperationWhereInput | null | undefined;
  title?: string | null | undefined;
  /** All values containing the given string. */
  title_contains?: string | null | undefined;
  /** All values ending with the given string. */
  title_ends_with?: string | null | undefined;
  /** All values that are contained in given list. */
  title_in?: Array<string | null | undefined> | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: string | null | undefined;
  /** All values not containing the given string. */
  title_not_contains?: string | null | undefined;
  /** All values not ending with the given string */
  title_not_ends_with?: string | null | undefined;
  /** All values that are not contained in given list. */
  title_not_in?: Array<string | null | undefined> | null | undefined;
  /** All values not starting with the given string. */
  title_not_starts_with?: string | null | undefined;
  /** All values starting with the given string. */
  title_starts_with?: string | null | undefined;
  updatedAt?: string | null | undefined;
  /** All values greater than the given value. */
  updatedAt_gt?: string | null | undefined;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: string | null | undefined;
  /** All values that are contained in given list. */
  updatedAt_in?: Array<string | null | undefined> | null | undefined;
  /** All values less than the given value. */
  updatedAt_lt?: string | null | undefined;
  /** All values less than or equal the given value. */
  updatedAt_lte?: string | null | undefined;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: string | null | undefined;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Array<string | null | undefined> | null | undefined;
  updatedBy?: UserWhereInput | null | undefined;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type WorkoutSessionWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: Array<WorkoutSessionWhereStageInput> | null | undefined;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Array<WorkoutSessionWhereStageInput> | null | undefined;
  /** Logical OR on all given filters. */
  OR?: Array<WorkoutSessionWhereStageInput> | null | undefined;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: WorkoutSessionWhereComparatorInput | null | undefined;
  /** Specify the stage to compare with */
  stage?: Stage | null | undefined;
};

/** References WorkoutSession record uniquely */
export type WorkoutSessionWhereUniqueInput = {
  id?: string | number | null | undefined;
};

export type ProgrammeListQueryVariables = Exact<{
  locales: Array<Locale> | Locale;
  first: number;
  skip: number;
}>;


export type ProgrammeListQuery = { workoutProgrammes: Array<{ title: string, slug: string, goal: TrainingGoal, level: Difficulty, durationWeeks: number, sessionsPerWeek: number }> };

export type ArticleListQueryVariables = Exact<{
  locales: Array<Locale> | Locale;
  first: number;
  skip: number;
}>;


export type ArticleListQuery = { articles: Array<{ title: string, slug: string, excerpt: string }> };

export type ProgrammeDetailQueryVariables = Exact<{
  slug: string;
  locales: Array<Locale> | Locale;
}>;


export type ProgrammeDetailQuery = { workoutProgramme: { title: string, slug: string, goal: TrainingGoal, level: Difficulty, durationWeeks: number, sessionsPerWeek: number, overview: { raw: RichContent } | null, coach: { name: string, role: string } | null, heroAsset: { url: string, altText: string | null, rightsSource: string | null } | null, sessions: Array<{ title: string, order: number, estimatedMinutes: number, warmup: { raw: RichContent } | null, cooldown: { raw: RichContent } | null, exerciseSets: Array<{ order: number, sets: number, repRange: string, tempo: string | null, restSeconds: number | null, coachNote: { raw: RichContent } | null, exercise: { title: string, slug: string } | null }> }> } | null };

export type ArticleDetailQueryVariables = Exact<{
  slug: string;
  locales: Array<Locale> | Locale;
}>;


export type ArticleDetailQuery = { article: { title: string, slug: string, excerpt: string, author: { name: string, role: string } | null, heroAsset: { url: string, altText: string | null, rightsSource: string | null } | null, relatedExercises: Array<{ title: string, slug: string }>, relatedProgrammes: Array<{ title: string, slug: string }>, contentBlocks: Array<
      | { __typename: 'CalloutBlock', callout: { tone: CalloutTone, heading: string, destination: string | null, body: { raw: RichContent } } | null }
      | { __typename: 'CoachQuoteBlock', quote: string | null, coach: { name: string, role: string } | null }
      | { __typename: 'ComparisonTableBlock', caption: string | null, columnHeadings: Array<string>, rows: Array<{ cells: Array<string> }> }
      | { __typename: 'ExerciseCarouselBlock', heading: string | null, exercises: Array<{ title: string, slug: string }> }
      | { __typename: 'ImageGalleryBlock', heading: string | null, items: Array<{ caption: string | null, altTextOverride: string | null, asset: { url: string, altText: string | null, rightsSource: string | null } | null }> }
      | { __typename: 'MuscleMapBlock', heading: string | null, body: { raw: RichContent } | null, muscleGroups: Array<{ name: string, slug: string }> }
      | { __typename: 'RichTextBlock', body: { raw: RichContent } | null }
    > } | null };

export type ListExercisesQueryVariables = Exact<{
  locales: Array<Locale> | Locale;
  first: number;
  skip: number;
  where: ExerciseWhereInput;
}>;


export type ListExercisesQuery = { exercises: Array<{ title: string, slug: string, difficulty: Difficulty, primaryMuscles: Array<{ name: string, slug: string }> }> };

export type GetExerciseQueryVariables = Exact<{
  slug: string;
  locales: Array<Locale> | Locale;
}>;


export type GetExerciseQuery = { exercise: { title: string, slug: string, difficulty: Difficulty, summary: string, modality: ExerciseModality, durationMinutes: number | null, primaryMuscles: Array<{ name: string, slug: string }>, instructions: { text: string }, equipment: Array<{ name: string, slug: string }> } | null };

export type ListMuscleGroupsQueryVariables = Exact<{
  locales: Array<Locale> | Locale;
  skip: number;
}>;


export type ListMuscleGroupsQuery = { muscleGroups: Array<{ name: string, slug: string }> };

export type IntentMusclesQueryVariables = Exact<{
  slugs: Array<string> | string;
}>;


export type IntentMusclesQuery = { muscleGroups: Array<{ slug: string }> };

export type SaveWorkoutIntentMutationVariables = Exact<{
  data: WorkoutIntentCreateInput;
}>;


export type SaveWorkoutIntentMutation = { createWorkoutIntent: { id: string } | null };


export const ProgrammeListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProgrammeList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workoutProgrammes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"slug_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"durationWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"sessionsPerWeek"}}]}}]}}]} as unknown as DocumentNode<ProgrammeListQuery, ProgrammeListQueryVariables>;
export const ArticleListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"slug_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}}]}}]} as unknown as DocumentNode<ArticleListQuery, ArticleListQueryVariables>;
export const ProgrammeDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProgrammeDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workoutProgramme"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"durationWeeks"}},{"kind":"Field","name":{"kind":"Name","value":"sessionsPerWeek"}},{"kind":"Field","name":{"kind":"Name","value":"overview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heroAsset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"rightsSource"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"order_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"warmup"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cooldown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exerciseSets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"order_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"sets"}},{"kind":"Field","name":{"kind":"Name","value":"repRange"}},{"kind":"Field","name":{"kind":"Name","value":"tempo"}},{"kind":"Field","name":{"kind":"Name","value":"restSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"coachNote"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exercise"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProgrammeDetailQuery, ProgrammeDetailQueryVariables>;
export const ArticleDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heroAsset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"rightsSource"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedExercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relatedProgrammes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentBlocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RichTextBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseCarouselBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"exercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MuscleMapBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ComparisonTableBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"columnHeadings"}},{"kind":"Field","name":{"kind":"Name","value":"rows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cells"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CoachQuoteBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quote"}},{"kind":"Field","name":{"kind":"Name","value":"coach"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CalloutBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"callout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tone"}},{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"destination"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageGalleryBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heading"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"altTextOverride"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"rightsSource"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArticleDetailQuery, ArticleDetailQueryVariables>;
export const ListExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListExercises"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExerciseWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"slug_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<ListExercisesQuery, ListExercisesQueryVariables>;
export const GetExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exercise"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"primaryMuscles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"modality"}},{"kind":"Field","name":{"kind":"Name","value":"durationMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<GetExerciseQuery, GetExerciseQueryVariables>;
export const ListMuscleGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListMuscleGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locales"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Locale"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"locales"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locales"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"slug_ASC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<ListMuscleGroupsQuery, ListMuscleGroupsQueryVariables>;
export const IntentMusclesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IntentMuscles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slugs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"muscleGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stage"},"value":{"kind":"EnumValue","value":"PUBLISHED"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slugs"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<IntentMusclesQuery, IntentMusclesQueryVariables>;
export const SaveWorkoutIntentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveWorkoutIntent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkoutIntentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createWorkoutIntent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SaveWorkoutIntentMutation, SaveWorkoutIntentMutationVariables>;