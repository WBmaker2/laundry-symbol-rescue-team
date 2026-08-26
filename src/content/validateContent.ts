import type {
  CareSymbol,
  ContentValidationIssue,
  DisplayKind,
  SourceRecord,
} from '../domain/careTypes';

const PUBLISHED_SYMBOL_COUNT = 8;
const DISPLAY_KINDS: readonly DisplayKind[] = ['official-standard-symbol', 'learning-icon'];

function issue(
  code: ContentValidationIssue['code'],
  message: string,
  symbolId?: CareSymbol['id'],
): ContentValidationIssue {
  return symbolId === undefined ? { code, message } : { code, symbolId, message };
}

export function validatePublishedContent(input: {
  sources: readonly SourceRecord[];
  symbols: readonly CareSymbol[];
}): readonly ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];
  const { sources: sourceRecords, symbols } = input;

  if (symbols.length !== PUBLISHED_SYMBOL_COUNT) {
    issues.push(
      issue(
        'symbol-count',
        `공개 심볼은 정확히 ${PUBLISHED_SYMBOL_COUNT}개여야 하지만 ${symbols.length}개입니다.`,
      ),
    );
  }

  const seenIds = new Set<string>();
  const sourceById = new Map(sourceRecords.map((source) => [source.id, source]));

  for (const symbol of symbols) {
    if (seenIds.has(symbol.id)) {
      issues.push(issue('duplicate-symbol-id', `심볼 ID가 중복됩니다: ${symbol.id}`, symbol.id));
    }
    seenIds.add(symbol.id);

    const sourceIds: readonly string[] = Array.isArray(symbol.sourceIds) ? symbol.sourceIds : [];
    const linkedSources = sourceIds.map((sourceId) => sourceById.get(sourceId));
    for (const [index, source] of linkedSources.entries()) {
      const sourceId = sourceIds[index];
      if (source === undefined) {
        issues.push(
          issue('missing-source', `승인 출처를 찾을 수 없습니다: ${sourceId}`, symbol.id),
        );
        continue;
      }
      if (
        source.status !== 'approved' ||
        typeof source.officialUrl !== 'string' ||
        !source.officialUrl.startsWith('https://')
      ) {
        issues.push(
          issue(
            'unapproved-source',
            `출처가 승인되지 않았거나 HTTPS가 아닙니다: ${source.id}`,
            symbol.id,
          ),
        );
      }
      if (source.reviewedAt !== symbol.reviewedAt) {
        issues.push(
          issue(
            'review-date-mismatch',
            `심볼과 출처의 검수일이 다릅니다: ${symbol.reviewedAt} / ${source.reviewedAt}`,
            symbol.id,
          ),
        );
      }
    }

    if (sourceIds.length === 0) {
      issues.push(issue('missing-source', '심볼에 연결된 출처가 없습니다.', symbol.id));
    }
    const accessibleDescription =
      typeof symbol.accessibleDescription === 'string' ? symbol.accessibleDescription : '';
    const shortDescription = typeof symbol.shortDescription === 'string' ? symbol.shortDescription : '';
    if (accessibleDescription.trim() === '' || shortDescription.trim() === '') {
      issues.push(issue('missing-accessible-text', '문자 대체 설명이 비어 있습니다.', symbol.id));
    }
    if (!DISPLAY_KINDS.includes(symbol.displayKind)) {
      issues.push(issue('missing-display-kind', '표시 구분 라벨이 없습니다.', symbol.id));
    }

    const meaningOptions = Array.isArray(symbol.meaningOptions) ? symbol.meaningOptions : [];
    const meaningIds = new Set(meaningOptions.map(({ id }) => id));
    const correctMeaningOptionId =
      typeof symbol.correctMeaningOptionId === 'string' ? symbol.correctMeaningOptionId : '';
    if (correctMeaningOptionId.trim() === '' || !meaningIds.has(correctMeaningOptionId)) {
      issues.push(
        issue('missing-correct-choice', '정답 의미가 보이는 선택지에 포함되지 않습니다.', symbol.id),
      );
    }

    if (
      (!Array.isArray(symbol.allowedOptionIds) || symbol.allowedOptionIds.length === 0) &&
      (!Array.isArray(symbol.forbiddenOptionIds) || symbol.forbiddenOptionIds.length === 0) &&
      !symbol.requiresAcknowledgement
    ) {
      issues.push(issue('empty-constraint-set', '허용·금지·추가 확인 제약이 없습니다.', symbol.id));
    }
  }

  return issues;
}
