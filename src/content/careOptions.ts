import type { CareOptionId, DamageRiskId } from '../domain/careTypes';
import type { CareOption } from '../domain/missionTypes';

const noRisks: readonly DamageRiskId[] = [];
const washRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation', 'color-change'];
const dryRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation'];
const tumbleRisks: readonly DamageRiskId[] = ['shrinkage', 'deformation', 'heat-damage'];
const ironRisks: readonly DamageRiskId[] = ['heat-damage', 'deformation'];
const comparisonNotice =
  '학습에서 조건 차이를 비교하는 카드이며, 실제 기기 조작이나 제품별 관리 지시가 아니에요.';
const adultCheck = '실제 도구나 의류는 보호자·교사와 먼저 확인해요.';

export const careOptions = [
  {
    id: 'plan-wash-gentle-30',
    stage: 'wash',
    label: '약한 세탁 조건 살펴보기',
    learningDescription: '표시와 재료 모형을 보고 약한 세탁 조건을 고르는 카드예요.',
    requiresAdult: false,
    waterUse: 'medium',
    energyUse: 'medium',
    riskIds: washRisks,
  },
  {
    id: 'plan-wash-strong-40',
    stage: 'wash',
    label: '더 강한 세탁 조건 오해 카드',
    learningDescription: `강한 조건을 고른 오해를 비교해 보는 카드예요. ${comparisonNotice}`,
    requiresAdult: false,
    waterUse: 'medium',
    energyUse: 'medium',
    riskIds: [...washRisks, 'heat-damage'],
  },
  {
    id: 'plan-wash-pause-and-ask',
    stage: 'wash',
    label: '잠깐 멈추고 도움 요청하기',
    learningDescription: '표시나 재료가 헷갈릴 때 판단을 멈추고 보호자·교사에게 물어보는 카드예요.',
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: noRisks,
  },
  {
    id: 'plan-dry-flat',
    stage: 'dry',
    label: '평평하게 자연 건조 비교하기',
    learningDescription: '옷을 평평하게 두는 자연 건조 조건을 재료 모형과 비교하는 카드예요.',
    requiresAdult: false,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: dryRisks,
  },
  {
    id: 'plan-dry-line',
    stage: 'dry',
    label: '걸어서 자연 건조 비교하기',
    learningDescription: '걸어서 자연 건조하는 조건을 재료 모형과 비교하는 카드예요.',
    requiresAdult: false,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: dryRisks,
  },
  {
    id: 'plan-dry-tumble-low',
    stage: 'dry',
    label: '낮은 열 회전 건조 비교하기',
    learningDescription: '낮은 열의 회전 건조 조건을 표시와 재료 모형으로 비교하는 카드예요.',
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'medium',
    riskIds: tumbleRisks,
  },
  {
    id: 'plan-dry-tumble-high',
    stage: 'dry',
    label: '더 높은 열 건조 오해 카드',
    learningDescription: `높은 열 조건을 괜찮다고 여기는 오해를 비교해 보는 카드예요. ${comparisonNotice}`,
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'higher',
    riskIds: [...tumbleRisks, 'decoration-damage'],
  },
  {
    id: 'plan-dry-pause-and-ask',
    stage: 'dry',
    label: '잠깐 멈추고 건조 도움 요청하기',
    learningDescription: '건조 방법이 헷갈리거나 열이 걱정될 때 보호자·교사에게 확인하는 카드예요.',
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: noRisks,
  },
  {
    id: 'plan-iron-none',
    stage: 'iron',
    label: '다림질하지 않는 조건 비교하기',
    learningDescription: `다림질하지 않는 선택을 표시와 비교하는 카드예요. ${adultCheck}`,
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: noRisks,
  },
  {
    id: 'plan-iron-low-with-adult',
    stage: 'iron',
    label: '보호자와 낮은 열 범위 확인하기',
    learningDescription: `낮은 열 범위를 보호자와 확인하는 비교 카드예요. 학생이 실제 도구를 조작하라는 안내가 아니에요. ${adultCheck}`,
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'medium',
    riskIds: ironRisks,
  },
  {
    id: 'plan-iron-high-with-adult',
    stage: 'iron',
    label: '높은 열도 괜찮다는 오해 카드',
    learningDescription: `높은 열도 괜찮다고 여기는 오해를 비교해 보는 카드예요. ${comparisonNotice} ${adultCheck}`,
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'higher',
    riskIds: [...ironRisks, 'decoration-damage'],
  },
  {
    id: 'plan-iron-pause-and-ask',
    stage: 'iron',
    label: '다림질 판단을 멈추고 도움 요청하기',
    learningDescription: `다림질이 필요한지 헷갈리면 판단을 멈추고 도움을 요청하는 카드예요. ${adultCheck}`,
    requiresAdult: true,
    waterUse: 'lower',
    energyUse: 'lower',
    riskIds: noRisks,
  },
] as const satisfies readonly CareOption[];

export const careOptionById = new Map(
  careOptions.map((option) => [option.id, option] as const),
);

export const careOptionIds = careOptions.map(({ id }) => id) as readonly CareOptionId[];
