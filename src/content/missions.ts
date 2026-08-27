import type { CareOptionId, CareSymbolId, PlanningStage } from '../domain/careTypes';
import type { GarmentMission, MissionId, VirtualGarment } from '../domain/missionTypes';

const materialBoundary =
  '재료 특성은 학습용 재료 모형에만 해당하며 실제 의류의 성능이나 관리 결과를 보장하지 않아요.';

type StageOptions = Readonly<Record<PlanningStage, readonly CareOptionId[]>>;

function stageOptions(
  wash: readonly CareOptionId[],
  dry: readonly CareOptionId[],
  iron: readonly CareOptionId[],
): StageOptions {
  return { wash, dry, iron };
}

function garment(
  id: string,
  name: string,
  materialModel: string,
  contaminationScenario: string,
  symbolIds: readonly CareSymbolId[],
  materialAllowedOptionIdsByStage: StageOptions,
): VirtualGarment {
  return {
    id,
    name,
    materialModel,
    materialBoundary,
    contaminationScenario,
    symbolIds,
    materialAllowedOptionIdsByStage,
  };
}

const basicTShirt = garment(
  'basic-t-shirt',
  '면 중심 기본 티셔츠',
  '면 중심 재료 모형',
  '흙먼지가 조금 묻은 가상 상황이에요. 실제 오염 세기를 재는 활동은 아니에요.',
  ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low'],
  stageOptions(
    ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
    ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'],
  ),
);

const softScarf = garment(
  'soft-scarf',
  '부드러운 섬유 모형 목도리',
  '부드럽고 민감한 섬유 재료 모형',
  '향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 판정하지 않아요.',
  ['care-professional', 'care-flat-dry', 'care-no-tumble', 'care-no-iron'],
  stageOptions(
    ['plan-wash-pause-and-ask'],
    ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-pause-and-ask'],
  ),
);

const sportswear = garment(
  'sportswear',
  '합성 섬유 모형 운동복',
  '합성 섬유 재료 모형',
  '운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 흡수량이나 기능을 측정하지 않아요.',
  ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low', 'care-iron-low'],
  stageOptions(
    ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
    ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'],
  ),
);

const decoratedTop = garment(
  'decorated-top',
  '장식이 붙은 가상 상의',
  '장식 부착 재료 모형',
  '장식 주변에 먼지가 묻었다고 가정한 가상 상황이에요. 실제 접착력이나 손상을 시험하지 않아요.',
  ['care-no-bleach', 'care-no-tumble', 'care-flat-dry', 'care-no-iron'],
  stageOptions(
    ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
    ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-pause-and-ask'],
  ),
);

const mixedCottonShirt = garment(
  'mixed-cotton-shirt',
  '혼합 적재용 면 중심 셔츠',
  '면 중심 재료 모형',
  '가벼운 흙먼지가 묻은 가상 상황이에요. 실제 오염 정도는 판단하지 않아요.',
  ['care-wash-30-gentle', 'care-no-bleach', 'care-no-tumble'],
  stageOptions(
    ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
    ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'],
  ),
);

const mixedSportswear = garment(
  'mixed-synthetic-sportswear',
  '혼합 적재용 합성 섬유 운동복',
  '합성 섬유 재료 모형',
  '운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 기능이나 흡수량을 보장하지 않아요.',
  ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low', 'care-no-iron'],
  stageOptions(
    ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
    ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'],
  ),
);

const mixedDelicateScarf = garment(
  'mixed-delicate-scarf',
  '혼합 적재용 민감한 목도리',
  '민감한 섬유 재료 모형',
  '향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 확인하지 않아요.',
  ['care-professional', 'care-flat-dry', 'care-no-tumble', 'care-no-iron'],
  stageOptions(
    ['plan-wash-pause-and-ask'],
    ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'],
    ['plan-iron-none', 'plan-iron-pause-and-ask'],
  ),
);

export const missions = [
  {
    id: 'basic-t-shirt',
    order: 1,
    title: '기본 티셔츠의 세탁·건조 표시 읽기',
    learningFocus: '세탁 표시와 건조 표시를 함께 읽고, 두 단계의 조건을 연결해 봐요.',
    garments: [basicTShirt],
    requiresGrouping: false,
    openingPrompt: '티셔츠의 세탁 표시와 건조 표시를 모두 살펴보고 관리 순서를 골라 보세요.',
  },
  {
    id: 'soft-scarf',
    order: 2,
    title: '부드러운 목도리의 강한 세탁·열 피하기',
    learningFocus: '강한 세탁과 열을 피하고, 전문 관리나 도움 요청이 필요한 근거를 찾아봐요.',
    garments: [softScarf],
    requiresGrouping: false,
    openingPrompt: '민감한 재료 모형의 표시에서 열과 세탁 제한의 근거를 찾아보세요.',
  },
  {
    id: 'sportswear',
    order: 3,
    title: '운동복의 낮은 열 조건 비교',
    learningFocus: '합성 섬유 재료 모형에서 자연 건조와 낮은 열 조건을 비교해 봐요.',
    garments: [sportswear],
    requiresGrouping: false,
    openingPrompt: '운동복 표시를 읽고 자연 건조와 낮은 열 조건을 비교해 보세요.',
  },
  {
    id: 'decorated-top',
    order: 4,
    title: '장식이 붙은 상의의 제한 찾기',
    learningFocus: '장식 손상 가능성과 여러 제한 표시를 확인해 가장 조심스러운 조건을 찾아봐요.',
    garments: [decoratedTop],
    requiresGrouping: false,
    openingPrompt: '장식이 손상될 수 있다는 가상 상황을 생각하며 제한 표시를 모두 찾아보세요.',
  },
  {
    id: 'mixed-load',
    order: 5,
    title: '서로 다른 세 벌의 함께 관리하기',
    learningFocus: '공통으로 허용할 수 있는 범위를 찾고, 따로 확인할 물품과 근거 표시를 정해 봐요.',
    garments: [mixedCottonShirt, mixedSportswear, mixedDelicateScarf],
    requiresGrouping: true,
    openingPrompt: '세 벌의 표시를 비교해 함께 살펴볼 옷과 따로 확인할 옷을 나누어 보세요.',
  },
] as const satisfies readonly GarmentMission[];

export const missionById = new Map<MissionId, GarmentMission>(
  missions.map((mission) => [mission.id, mission] as const),
);
