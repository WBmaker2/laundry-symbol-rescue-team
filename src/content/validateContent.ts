import type {
  CareOptionId,
  CareSymbol,
  CareSymbolId,
  ContentValidationIssue,
  SourceRecord,
} from '../domain/careTypes';

const PUBLISHED_SYMBOL_COUNT = 8;
const REQUIRED_SYMBOL_IDS = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
] as const satisfies readonly CareSymbolId[];
const REQUIRED_SYMBOL_ID_SET = new Set<string>(REQUIRED_SYMBOL_IDS);
const ISO_SOURCE_ID = 'iso-3758-2023';
const DOMESTIC_SOURCE_IDS = new Set([
  'ks-k-0021-2024',
  'katri-care-label-cardnews',
  'katri-iso-3758-press',
]);
const CARE_OPTION_IDS = [
  'plan-wash-gentle-30',
  'plan-wash-strong-40',
  'plan-wash-pause-and-ask',
  'plan-dry-flat',
  'plan-dry-line',
  'plan-dry-tumble-low',
  'plan-dry-tumble-high',
  'plan-dry-pause-and-ask',
  'plan-iron-none',
  'plan-iron-low-with-adult',
  'plan-iron-high-with-adult',
  'plan-iron-pause-and-ask',
] as const satisfies readonly CareOptionId[];
const CARE_OPTION_ID_SET = new Set<string>(CARE_OPTION_IDS);
const PLACEHOLDER_PATTERN = /(?:^|[\s_./:-])(?:x{2,}|tbd|todo|placeholder|unknown|n[./-]?a|not[\s_-]*available)(?:$|[\s_./:-])/i;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function issue(
  code: ContentValidationIssue['code'],
  message: string,
  symbolId?: CareSymbol['id'],
): ContentValidationIssue {
  return symbolId === undefined ? { code, message } : { code, symbolId, message };
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : undefined;
}

function hasUsableText(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '' && !PLACEHOLDER_PATTERN.test(value);
}

function hasValidIsoDate(value: unknown): value is string {
  if (typeof value !== 'string' || !ISO_DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
}

function hasApprovedHttpsUrl(value: unknown): value is string {
  if (!hasUsableText(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' && parsed.hostname !== '';
  } catch {
    return false;
  }
}

function isCareSymbolId(value: string): value is CareSymbolId {
  return REQUIRED_SYMBOL_ID_SET.has(value);
}

function symbolIssueId(value: string): CareSymbolId | undefined {
  return isCareSymbolId(value) ? value : undefined;
}

function isApprovedSource(source: SourceRecord): boolean {
  const record = asRecord(source);
  return record?.status === 'approved' && hasApprovedHttpsUrl(record.officialUrl);
}

function validateSourceRecords(
  sourceRecords: readonly unknown[],
  issues: ContentValidationIssue[],
): Map<string, SourceRecord> {
  const sourceById = new Map<string, SourceRecord>();
  const sourceFields = [
    'publisher',
    'title',
    'standardOrDocumentId',
    'editionOrPublishedAt',
    'accessedAt',
    'reviewedAt',
    'coverage',
  ] as const;

  for (const source of sourceRecords) {
    const record = asRecord(source);
    if (record === undefined) {
      issues.push(issue('invalid-source-record', '출처 레코드가 객체가 아닙니다.'));
      continue;
    }

    const sourceId = typeof record.id === 'string' ? record.id.trim() : '';
    const sourceLabel = sourceId || '<missing-source-id>';
    if (!hasUsableText(sourceId)) {
      issues.push(issue('invalid-source-record', `출처 ID가 비어 있거나 placeholder입니다: ${sourceLabel}`));
    }
    if (sourceId !== '' && sourceById.has(sourceId)) {
      issues.push(issue('duplicate-source-id', `출처 ID가 중복됩니다: ${sourceId}`));
    } else if (sourceId !== '') {
      sourceById.set(sourceId, source as SourceRecord);
    }

    for (const field of sourceFields) {
      if (!hasUsableText(record[field])) {
        issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 ${field}가 비어 있거나 placeholder입니다.`));
      }
    }
    if (!hasValidIsoDate(record.accessedAt) || !hasValidIsoDate(record.reviewedAt)) {
      issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 접근일 또는 검수일이 YYYY-MM-DD가 아닙니다.`));
    }
    if (!hasApprovedHttpsUrl(record.officialUrl)) {
      issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 공식 URL이 유효한 HTTPS URL이 아닙니다.`));
    }
    if (record.status !== 'approved') {
      issues.push(issue('unapproved-source', `출처가 approved 상태가 아닙니다: ${sourceLabel}`));
    }
  }

  return sourceById;
}

function validateMeaningOptions(
  symbolRecord: Record<string, unknown>,
  symbolId: CareSymbolId | undefined,
  issues: ContentValidationIssue[],
): Set<string> {
  const meaningOptions = Array.isArray(symbolRecord.meaningOptions) ? symbolRecord.meaningOptions : [];
  if (meaningOptions.length !== 3) {
    issues.push(issue('meaning-choice-count', '보이는 의미 선택지는 정확히 3개여야 합니다.', symbolId));
  }

  const meaningIds = new Set<string>();
  const meaningLabels = new Set<string>();
  for (const option of meaningOptions) {
    const record = asRecord(option);
    const optionId = typeof record?.id === 'string' ? record.id.trim() : '';
    const label = typeof record?.label === 'string' ? record.label.trim() : '';
    if (!hasUsableText(optionId) || !hasUsableText(label)) {
      issues.push(issue('invalid-meaning-choice', '의미 선택지의 ID와 문구는 비어 있지 않아야 합니다.', symbolId));
      continue;
    }
    if (meaningIds.has(optionId) || meaningLabels.has(label)) {
      issues.push(issue('invalid-meaning-choice', '의미 선택지의 ID와 문구는 서로 중복되지 않아야 합니다.', symbolId));
    }
    meaningIds.add(optionId);
    meaningLabels.add(label);
  }
  return meaningIds;
}

function validateConstraintIds(
  symbolRecord: Record<string, unknown>,
  key: 'allowedOptionIds' | 'forbiddenOptionIds',
  symbolId: CareSymbolId | undefined,
  issues: ContentValidationIssue[],
): string[] {
  const values = symbolRecord[key];
  if (!Array.isArray(values)) {
    issues.push(issue('invalid-constraint-id', `${key}는 CareOptionId 배열이어야 합니다.`, symbolId));
    return [];
  }
  const validIds: string[] = [];
  for (const value of values) {
    if (typeof value !== 'string' || !CARE_OPTION_ID_SET.has(value)) {
      issues.push(issue('invalid-constraint-id', `${key}에 알 수 없는 CareOptionId가 있습니다: ${String(value)}`, symbolId));
    } else {
      validIds.push(value);
    }
  }
  return validIds;
}

export function validatePublishedContent(input: {
  sources: readonly SourceRecord[];
  symbols: readonly CareSymbol[];
}): readonly ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];
  const runtimeInput = input as unknown as { sources?: unknown; symbols?: unknown } | null | undefined;
  const sourceRecords: readonly unknown[] = Array.isArray(runtimeInput?.sources) ? runtimeInput.sources : [];
  const symbols: readonly unknown[] = Array.isArray(runtimeInput?.symbols) ? runtimeInput.symbols : [];
  const sourceById = validateSourceRecords(sourceRecords, issues);

  if (symbols.length !== PUBLISHED_SYMBOL_COUNT) {
    issues.push(
      issue(
        'symbol-count',
        `공개 심볼은 정확히 ${PUBLISHED_SYMBOL_COUNT}개여야 하지만 ${symbols.length}개입니다.`,
      ),
    );
  }

  const seenIds = new Set<string>();
  for (const rawSymbol of symbols) {
    const symbolRecord = asRecord(rawSymbol);
    const rawId = typeof symbolRecord?.id === 'string' ? symbolRecord.id.trim() : '';
    const currentSymbolId = symbolIssueId(rawId);
    if (rawId !== '' && seenIds.has(rawId)) {
      issues.push(issue('duplicate-symbol-id', `심볼 ID가 중복됩니다: ${rawId}`, currentSymbolId));
    }
    if (rawId !== '') seenIds.add(rawId);
    if (!REQUIRED_SYMBOL_ID_SET.has(rawId)) {
      issues.push(issue('unexpected-symbol-id', `요구된 8개 목록에 없는 심볼 ID입니다: ${rawId || '<missing-symbol-id>'}`, currentSymbolId));
    }

    if (symbolRecord === undefined) {
      issues.push(issue('missing-accessible-text', '심볼 레코드가 객체가 아닙니다.'));
      continue;
    }

    const sourceIdsUnknown = Array.isArray(symbolRecord.sourceIds) ? symbolRecord.sourceIds : [];
    const linkedSources: SourceRecord[] = [];
    if (sourceIdsUnknown.length === 0) {
      issues.push(issue('missing-source', '심볼에 연결된 출처가 없습니다.', currentSymbolId));
    }
    for (const rawSourceId of sourceIdsUnknown) {
      if (typeof rawSourceId !== 'string' || rawSourceId.trim() === '') {
        issues.push(issue('missing-source', '출처 ID가 비어 있거나 문자열이 아닙니다.', currentSymbolId));
        continue;
      }
      const sourceId = rawSourceId.trim();
      const source = sourceById.get(sourceId);
      if (source === undefined) {
        issues.push(issue('missing-source', `승인 출처를 찾을 수 없습니다: ${sourceId}`, currentSymbolId));
        continue;
      }
      linkedSources.push(source);
      if (!isApprovedSource(source)) {
        issues.push(issue('unapproved-source', `출처가 승인되지 않았거나 HTTPS가 아닙니다: ${sourceId}`, currentSymbolId));
      }
      const symbolReviewedAt = symbolRecord.reviewedAt;
      if (source.reviewedAt !== symbolReviewedAt) {
        issues.push(
          issue(
            'review-date-mismatch',
            `심볼과 출처의 검수일이 다릅니다: ${String(symbolReviewedAt)} / ${String(source.reviewedAt)}`,
            currentSymbolId,
          ),
        );
      }
    }

    const approvedLinkedIds = new Set(
      linkedSources.filter(isApprovedSource).map((source) => source.id),
    );
    if (!approvedLinkedIds.has(ISO_SOURCE_ID) || ![...approvedLinkedIds].some((id) => DOMESTIC_SOURCE_IDS.has(id))) {
      issues.push(
        issue(
          'missing-required-provenance',
          '각 심볼은 승인된 ISO 3758 출처와 국내 공신력 출처를 모두 연결해야 합니다.',
          currentSymbolId,
        ),
      );
    }

    if (!hasValidIsoDate(symbolRecord.reviewedAt)) {
      issues.push(issue('review-date-mismatch', '심볼 검수일이 유효한 YYYY-MM-DD가 아닙니다.', currentSymbolId));
    }

    if (!hasUsableText(symbolRecord.accessibleDescription) || !hasUsableText(symbolRecord.shortDescription)) {
      issues.push(issue('missing-accessible-text', '문자 대체 설명이 비어 있거나 placeholder입니다.', currentSymbolId));
    }

    if (symbolRecord.displayKind === 'official-standard-symbol') {
      issues.push(
        issue(
          'unlicensed-display-kind',
          '검증된 자산 이용권 증거가 없어 official-standard-symbol을 공개할 수 없습니다.',
          currentSymbolId,
        ),
      );
    } else if (symbolRecord.displayKind !== 'learning-icon') {
      issues.push(issue('missing-display-kind', '표시 구분 라벨이 없습니다.', currentSymbolId));
    }

    const meaningIds = validateMeaningOptions(symbolRecord, currentSymbolId, issues);
    const correctMeaningOptionId =
      typeof symbolRecord.correctMeaningOptionId === 'string'
        ? symbolRecord.correctMeaningOptionId.trim()
        : '';
    if (!hasUsableText(correctMeaningOptionId) || !meaningIds.has(correctMeaningOptionId)) {
      issues.push(
        issue('missing-correct-choice', '정답 의미가 보이는 선택지에 포함되지 않습니다.', currentSymbolId),
      );
    }

    const allowedOptionIds = validateConstraintIds(symbolRecord, 'allowedOptionIds', currentSymbolId, issues);
    const forbiddenOptionIds = validateConstraintIds(symbolRecord, 'forbiddenOptionIds', currentSymbolId, issues);
    const requiresAcknowledgement = symbolRecord.requiresAcknowledgement;
    if (typeof requiresAcknowledgement !== 'boolean') {
      issues.push(issue('invalid-acknowledgement', 'requiresAcknowledgement는 boolean이어야 합니다.', currentSymbolId));
    }
    if (allowedOptionIds.length === 0 && forbiddenOptionIds.length === 0 && requiresAcknowledgement !== true) {
      issues.push(issue('empty-constraint-set', '허용·금지·추가 확인 제약이 없습니다.', currentSymbolId));
    }
  }

  for (const requiredId of REQUIRED_SYMBOL_IDS) {
    if (!seenIds.has(requiredId)) {
      issues.push(issue('missing-required-symbol-id', `필수 심볼 ID가 없습니다: ${requiredId}`));
    }
  }

  return issues;
}
