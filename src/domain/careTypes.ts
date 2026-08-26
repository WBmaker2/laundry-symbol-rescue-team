export type CareStage = 'wash' | 'bleach' | 'dry' | 'iron' | 'professional';

export type PlanningStage = 'wash' | 'dry' | 'iron';

export type RelativeLevel = 'lower' | 'medium' | 'higher';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export type DisplayKind = 'official-standard-symbol' | 'learning-icon';

export type CareSymbolId =
  | 'care-wash-30-gentle'
  | 'care-no-bleach'
  | 'care-flat-dry'
  | 'care-tumble-low'
  | 'care-no-tumble'
  | 'care-iron-low'
  | 'care-no-iron'
  | 'care-professional';

export type CareOptionId =
  | 'plan-wash-gentle-30'
  | 'plan-wash-strong-40'
  | 'plan-wash-pause-and-ask'
  | 'plan-dry-flat'
  | 'plan-dry-line'
  | 'plan-dry-tumble-low'
  | 'plan-dry-tumble-high'
  | 'plan-dry-pause-and-ask'
  | 'plan-iron-none'
  | 'plan-iron-low-with-adult'
  | 'plan-iron-high-with-adult'
  | 'plan-iron-pause-and-ask';

export type DamageRiskId =
  | 'shrinkage'
  | 'deformation'
  | 'color-change'
  | 'decoration-damage'
  | 'heat-damage';

export interface SourceRecord {
  id: string;
  publisher: string;
  title: string;
  officialUrl: string;
  standardOrDocumentId: string;
  editionOrPublishedAt: string;
  accessedAt: string;
  reviewedAt: string;
  coverage: string;
  status: ReviewStatus;
}

export interface MeaningOption {
  id: string;
  label: string;
}

export interface CareSymbol {
  id: CareSymbolId;
  category: CareStage;
  displayKind: DisplayKind;
  name: string;
  categoryHint: string;
  shortDescription: string;
  accessibleDescription: string;
  provenanceNotes: string;
  assetPath: `/symbols/${string}.svg`;
  sourceIds: readonly string[];
  reviewedAt: string;
  meaningOptions: readonly MeaningOption[];
  correctMeaningOptionId: string;
  allowedOptionIds: readonly CareOptionId[];
  forbiddenOptionIds: readonly CareOptionId[];
  riskIds: readonly DamageRiskId[];
  requiresAcknowledgement: boolean;
}

export type ContentValidationCode =
  | 'symbol-count'
  | 'duplicate-symbol-id'
  | 'missing-required-symbol-id'
  | 'unexpected-symbol-id'
  | 'missing-source'
  | 'unapproved-source'
  | 'invalid-source-record'
  | 'duplicate-source-id'
  | 'missing-required-provenance'
  | 'review-date-mismatch'
  | 'missing-accessible-text'
  | 'missing-display-kind'
  | 'unlicensed-display-kind'
  | 'meaning-choice-count'
  | 'invalid-meaning-choice'
  | 'missing-correct-choice'
  | 'invalid-constraint-id'
  | 'invalid-acknowledgement'
  | 'empty-constraint-set'
  | 'invalid-symbol-field';

export interface ContentValidationIssue {
  code: ContentValidationCode;
  symbolId?: CareSymbolId;
  message: string;
}
