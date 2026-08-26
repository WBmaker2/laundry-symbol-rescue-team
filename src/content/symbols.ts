import type {
  CareSymbol,
  CareSymbolId,
  CareOptionId,
  DamageRiskId,
} from '../domain/careTypes';

export const careSymbolIds = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
] as const satisfies readonly CareSymbolId[];

const reviewedAt = '2026-08-26';
const commonSourceIds = [
  'iso-3758-2023',
  'ginetex-care-symbols',
  'ks-k-0021-2024',
  'katri-care-label-cardnews',
  'katri-iso-3758-press',
] as const;
const professionalSourceIds = [...commonSourceIds, 'ginetex-care-symbols-guide'] as const;
const learningIconNotice = '학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.';
const provenanceNotes = 'ISO 3758:2023와 국내 공신력 출처를 대조한 학습용 자료예요.';

const wash30Allowed: readonly CareOptionId[] = [
  'plan-wash-gentle-30',
  'plan-wash-pause-and-ask',
];
const wash30Forbidden: readonly CareOptionId[] = ['plan-wash-strong-40'];
const flatDryAllowed: readonly CareOptionId[] = ['plan-dry-flat', 'plan-dry-pause-and-ask'];
const flatDryForbidden: readonly CareOptionId[] = [
  'plan-dry-line',
  'plan-dry-tumble-low',
  'plan-dry-tumble-high',
];
const tumbleLowAllowed: readonly CareOptionId[] = [
  'plan-dry-tumble-low',
  'plan-dry-pause-and-ask',
];
const tumbleLowForbidden: readonly CareOptionId[] = ['plan-dry-tumble-high'];
const noTumbleAllowed: readonly CareOptionId[] = [
  'plan-dry-flat',
  'plan-dry-line',
  'plan-dry-pause-and-ask',
];
const noTumbleForbidden: readonly CareOptionId[] = [
  'plan-dry-tumble-low',
  'plan-dry-tumble-high',
];
const lowIronAllowed: readonly CareOptionId[] = [
  'plan-iron-low-with-adult',
  'plan-iron-pause-and-ask',
];
const lowIronForbidden: readonly CareOptionId[] = ['plan-iron-high-with-adult'];
const noIronAllowed: readonly CareOptionId[] = ['plan-iron-none', 'plan-iron-pause-and-ask'];
const noIronForbidden: readonly CareOptionId[] = [
  'plan-iron-low-with-adult',
  'plan-iron-high-with-adult',
];

const washRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation', 'color-change'];
const bleachRisks: readonly DamageRiskId[] = ['color-change'];
const dryRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation'];
const tumbleRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation', 'heat-damage'];
const ironRisks: readonly DamageRiskId[] = ['heat-damage', 'deformation'];

export const careSymbols = [
  {
    id: 'care-wash-30-gentle',
    category: 'wash',
    displayKind: 'learning-icon',
    name: '30°C 약한 세탁',
    categoryHint: '세탁 · 물세탁',
    shortDescription: `30°C와 한 줄은 약한 세탁을 뜻해요. ${learningIconNotice}`,
    accessibleDescription:
      '세탁통 안에 30이 있고 아래에 한 줄이 있는 그림입니다. 30°C의 약한 세탁을 뜻합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-wash-30-gentle.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-wash-30-gentle', label: '30°C의 약한 과정으로 세탁하기' },
      { id: 'meaning-wash-40-normal', label: '40°C의 보통 과정으로 세탁하기' },
      { id: 'meaning-wash-forbidden', label: '물세탁하지 않기' },
    ],
    correctMeaningOptionId: 'meaning-wash-30-gentle',
    allowedOptionIds: wash30Allowed,
    forbiddenOptionIds: wash30Forbidden,
    riskIds: washRisks,
    requiresAcknowledgement: false,
  },
  {
    id: 'care-no-bleach',
    category: 'bleach',
    displayKind: 'learning-icon',
    name: '표백 금지',
    categoryHint: '표백 · 금지',
    shortDescription: `표백하지 않는다는 뜻이에요. ${learningIconNotice}`,
    accessibleDescription:
      '삼각형 안에 엑스가 있는 그림입니다. 표백 처리를 하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-no-bleach.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-no-bleach', label: '표백하지 않기' },
      { id: 'meaning-oxygen-bleach', label: '산소계 표백만 허용하기' },
      { id: 'meaning-any-bleach', label: '모든 표백을 허용하기' },
    ],
    correctMeaningOptionId: 'meaning-no-bleach',
    allowedOptionIds: [],
    forbiddenOptionIds: [],
    riskIds: bleachRisks,
    requiresAcknowledgement: true,
  },
  {
    id: 'care-flat-dry',
    category: 'dry',
    displayKind: 'learning-icon',
    name: '평평하게 자연 건조',
    categoryHint: '건조 · 자연 건조',
    shortDescription: `네모 안 가로선은 평평하게 펴서 자연 건조하는 뜻이에요. ${learningIconNotice}`,
    accessibleDescription:
      '네모 안에 가로선 하나가 있는 그림입니다. 옷을 평평하게 펴서 자연 건조하는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-flat-dry.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-flat-dry', label: '평평하게 펴서 자연 건조하기' },
      { id: 'meaning-line-dry', label: '옷걸이에 걸어 자연 건조하기' },
      { id: 'meaning-tumble-low', label: '회전식 건조기의 낮은 열로 건조하기' },
    ],
    correctMeaningOptionId: 'meaning-flat-dry',
    allowedOptionIds: flatDryAllowed,
    forbiddenOptionIds: flatDryForbidden,
    riskIds: dryRisks,
    requiresAcknowledgement: false,
  },
  {
    id: 'care-tumble-low',
    category: 'dry',
    displayKind: 'learning-icon',
    name: '낮은 열 회전식 건조',
    categoryHint: '건조 · 회전식 건조',
    shortDescription: `네모 안 원과 점 하나는 낮은 열의 회전식 건조를 뜻해요. ${learningIconNotice}`,
    accessibleDescription:
      '네모 안 원에 점 하나가 있는 그림입니다. 낮은 열의 회전식 건조 범위를 뜻합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-tumble-low.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-tumble-low', label: '회전식 건조기의 낮은 열로 건조하기' },
      { id: 'meaning-flat-dry', label: '평평하게 펴서 자연 건조하기' },
      { id: 'meaning-no-tumble', label: '회전식 건조하지 않기' },
    ],
    correctMeaningOptionId: 'meaning-tumble-low',
    allowedOptionIds: tumbleLowAllowed,
    forbiddenOptionIds: tumbleLowForbidden,
    riskIds: tumbleRisks,
    requiresAcknowledgement: true,
  },
  {
    id: 'care-no-tumble',
    category: 'dry',
    displayKind: 'learning-icon',
    name: '회전식 건조 금지',
    categoryHint: '건조 · 금지',
    shortDescription: `네모 안 원에 엑스가 있으면 회전식 건조를 하지 않아요. ${learningIconNotice}`,
    accessibleDescription:
      '네모 안 원에 엑스가 있는 그림입니다. 회전식 건조기를 사용하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-no-tumble.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-no-tumble', label: '회전식 건조하지 않기' },
      { id: 'meaning-tumble-low', label: '회전식 건조기의 낮은 열로 건조하기' },
      { id: 'meaning-line-dry', label: '옷걸이에 걸어 자연 건조하기' },
    ],
    correctMeaningOptionId: 'meaning-no-tumble',
    allowedOptionIds: noTumbleAllowed,
    forbiddenOptionIds: noTumbleForbidden,
    riskIds: tumbleRisks,
    requiresAcknowledgement: true,
  },
  {
    id: 'care-iron-low',
    category: 'iron',
    displayKind: 'learning-icon',
    name: '낮은 온도 다림질',
    categoryHint: '다림질 · 낮은 열',
    shortDescription: `점 하나의 다리미는 낮은 온도 범위예요. 실제 다림질은 보호자와 확인해요. ${learningIconNotice}`,
    accessibleDescription:
      '다리미 모양 안에 점 하나가 있는 그림입니다. 낮은 온도 범위에서 다림질할 수 있다는 뜻이며, 실제 도구는 보호자와 확인해야 합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-iron-low.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-iron-low', label: '보호자와 낮은 온도 범위 확인하기' },
      { id: 'meaning-iron-high', label: '높은 온도도 괜찮다는 오해' },
      { id: 'meaning-no-iron', label: '다림질하지 않기' },
    ],
    correctMeaningOptionId: 'meaning-iron-low',
    allowedOptionIds: lowIronAllowed,
    forbiddenOptionIds: lowIronForbidden,
    riskIds: ironRisks,
    requiresAcknowledgement: true,
  },
  {
    id: 'care-no-iron',
    category: 'iron',
    displayKind: 'learning-icon',
    name: '다림질 금지',
    categoryHint: '다림질 · 금지',
    shortDescription: `다리미에 엑스가 있으면 다림질하지 않아요. ${learningIconNotice}`,
    accessibleDescription:
      '다리미 모양에 엑스가 있는 그림입니다. 다림질하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-no-iron.svg',
    sourceIds: commonSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-no-iron', label: '다림질하지 않기' },
      { id: 'meaning-iron-low', label: '보호자와 낮은 온도 범위 확인하기' },
      { id: 'meaning-iron-high', label: '높은 온도도 괜찮다는 오해' },
    ],
    correctMeaningOptionId: 'meaning-no-iron',
    allowedOptionIds: noIronAllowed,
    forbiddenOptionIds: noIronForbidden,
    riskIds: ['heat-damage', 'decoration-damage'],
    requiresAcknowledgement: true,
  },
  {
    id: 'care-professional',
    category: 'professional',
    displayKind: 'learning-icon',
    name: '전문 섬유 관리 확인',
    categoryHint: '전문 관리 · 도움 요청',
    shortDescription: `원 안의 표시는 전문 관리 범위를 확인하는 정보예요. 먼저 보호자·전문가에게 물어봐요. ${learningIconNotice}`,
    accessibleDescription:
      '원 안에 P 글자가 있는 단순화한 그림입니다. 가정에서 바로 처리하기 전에 보호자나 전문 관리 전문가에게 범위를 확인하는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.',
    provenanceNotes,
    assetPath: '/symbols/care-professional.svg',
    sourceIds: professionalSourceIds,
    reviewedAt,
    meaningOptions: [
      { id: 'meaning-professional-check', label: '보호자·전문가와 관리 범위 확인하기' },
      { id: 'meaning-home-wash-direct', label: '가정 세탁기로 바로 처리하기' },
      { id: 'meaning-ignore-label', label: '표시를 확인하지 않고 처리하기' },
    ],
    correctMeaningOptionId: 'meaning-professional-check',
    allowedOptionIds: [],
    forbiddenOptionIds: [],
    riskIds: ['deformation', 'color-change', 'decoration-damage'],
    requiresAcknowledgement: true,
  },
] as const satisfies readonly CareSymbol[];

export const careSymbolById = new Map(
  careSymbols.map((symbol) => [symbol.id, symbol] as const),
);
