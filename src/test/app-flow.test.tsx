import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import { App } from '../App';
import { buildLearnerSessionAtStep, renderAppAtStep } from './renderApp';
import { missions } from '../content/missions';
import { planningStages } from './factories';
import { careSymbolById, careSymbols } from '../content/symbols';
import { careOptionById } from '../content/careOptions';
import type { CareSymbol } from '../domain/careTypes';
import { missionById } from '../content/missions';
import type { CareOption } from '../domain/missionTypes';
import type { GarmentMission, VirtualGarment } from '../domain/missionTypes';
import { SymbolFigure } from '../components/ui/SymbolFigure';

describe('Task 7 앱 시작 흐름', () => {
  afterEach(() => cleanup());
  it('다섯 미션을 제목과 학습 초점이 함께 읽히는 버튼으로 보여 준다', () => {
    render(<App />);

    expect(screen.getAllByRole('button', { name: /미션 선택/ })).toHaveLength(5);
    expect(screen.getByRole('button', { name: /기본 티셔츠.*세탁 표시와 건조 표시/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /섞|서로 다른 세 벌/ })).toBeInTheDocument();
  });

  it('미션 선택은 구조 요청 화면을 보여 주고 요청에서 바로 건너뛰지 않는다', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /기본 티셔츠.*미션 선택/ }));

    expect(screen.getByRole('heading', { name: /기본 티셔츠 구조 요청/ })).toBeInTheDocument();
    expect(screen.getByText(/면 중심 재료 모형/)).toBeInTheDocument();
    expect(screen.getByText(/학습용 재료 모형/)).toBeInTheDocument();
    expect(screen.getByText(/흙먼지가 조금 묻은/)).toBeInTheDocument();
    expect(screen.getByText(/실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '표시 확대' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /표시 확대경/ })).not.toBeInTheDocument();
  });

  it('표시 확대는 요청 화면을 건너뛰지 않고 magnifier 단계로 이동시킨다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /기본 티셔츠.*미션 선택/ }));
    await user.click(screen.getByRole('button', { name: '표시 확대' }));

    expect(screen.getByRole('heading', { name: '표시 확대경' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /표시 확대/ })).not.toBeInTheDocument();
  });

  it('진행 표시는 7단계 순서와 현재 단계만 의미론적으로 알린다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'request' });

    const list = screen.getByRole('navigation', { name: '학습 진행 7단계' }).querySelector('ol');
    if (!list) throw new Error('진행 목록이 없습니다.');
    expect(list.querySelectorAll('li')).toHaveLength(7);
    expect(screen.getByText('구조 요청')).toHaveAttribute('aria-current', 'step');
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('고대비는 wrapper의 앱 메모리 상태만 바꾸고 aria-pressed를 갱신한다', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: '고대비 모드' });
    const shell = screen.getByTestId('app-shell');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(shell).toHaveAttribute('data-contrast', 'normal');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(shell).toHaveAttribute('data-contrast', 'high');
    expect(window.localStorage.length).toBe(0);
    expect(document.documentElement).not.toHaveAttribute('data-contrast');
  });

  it('대표 미래 단계의 렌더 헬퍼는 canonical 선행 상태를 만든다', () => {
    for (const step of ['magnifier', 'plan', 'forecast', 'simulation', 'revision'] as const) {
      const result = renderAppAtStep({ missionId: 'decorated-top', step, scenario: 'outside-limits' });
      expect(result.container.querySelector('[data-app-step]')).toHaveAttribute('data-app-step', step);
      result.unmount();
    }
  });

  it('completed-revision은 두 계획과 평가를 가진 report만 허용한다', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report', scenario: 'completed-revision' });
    expect(result.container.querySelector('[data-app-step]')).toHaveAttribute('data-app-step', 'report');
    expect(screen.getByText(/최초 계획/)).toBeInTheDocument();
    expect(screen.getByText(/수정 계획/)).toBeInTheDocument();
    result.unmount();

    expect(() => renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan', scenario: 'completed-revision' }))
      .toThrow(/report 단계/);
  });

  it.each(missions)('completed-revision evidence is canonical for %s', (mission) => {
    const state = buildLearnerSessionAtStep({
      missionId: mission.id,
      step: 'report',
      scenario: 'completed-revision',
    });
    expect(state.step).toBe('report');
    expect(state.initialPlan).not.toEqual(state.revisedPlan);
    expect(state.initialEvaluation).not.toBeNull();
    expect(state.revisedEvaluation).not.toBeNull();
    expect(state.revisionEvidence).not.toBeNull();

    const changedStages = planningStages.filter((stage) =>
      state.initialPlan!.stageOptions[stage] !== state.revisedPlan!.stageOptions[stage]);
    expect(state.revisionEvidence!.changedStages).toEqual(changedStages);

    const planEvidence = state.initialEvaluation!.findings
      .filter(({ status }) => status !== 'allowed')
      .flatMap(({ relatedSymbolIds }) => relatedSymbolIds);
    const groupingEvidence = state.initialGroupingEvaluation?.findings
      .filter(({ code }) => code !== 'compatible-group')
      .flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
    const canonicalReasons = new Set([...planEvidence, ...groupingEvidence]);
    expect(state.revisionEvidence!.relatedSymbolIds.length).toBeGreaterThan(0);
    expect(state.revisionEvidence!.relatedSymbolIds.every((id) => canonicalReasons.has(id))).toBe(true);

    if (mission.id === 'mixed-load') {
      expect(state.revisionEvidence!.reasonId).toBe('separate-incompatible-garment');
      expect(state.revisionEvidence!.relatedSymbolIds).toContain('care-professional');
    } else {
      expect(state.revisionEvidence!.reasonId).toBe('follow-label-limit');
    }
  });

  it.each(missions)('default report builds a ready confirmation state for %s', (mission) => {
    const state = buildLearnerSessionAtStep({ missionId: mission.id, step: 'report' });
    expect(state.step).toBe('report');
    expect(state.initialPlan).toEqual(state.revisedPlan);
    expect(state.initialEvaluation?.status).toBe('ready');
    expect(state.revisedEvaluation?.status).toBe('ready');
    if (mission.requiresGrouping) {
      expect(state.initialGroupingEvaluation?.status).toBe('ready');
      expect(state.revisedGroupingEvaluation?.status).toBe('ready');
    } else {
      expect(state.initialGroupingEvaluation).toBeNull();
      expect(state.revisedGroupingEvaluation).toBeNull();
    }
    expect(state.revisionEvidence?.reasonId).toBe('confirm-current-plan');
    expect(state.revisionEvidence?.changedStages).toEqual([]);
    expect(state.revisionEvidence?.relatedSymbolIds.length).toBeGreaterThan(0);
    expect(state.revisionEvidence?.relatedSymbolIds.every((id) =>
      mission.garments.some(({ symbolIds }) => symbolIds.includes(id)))).toBe(true);

    const result = renderAppAtStep({ missionId: mission.id, step: 'report' });
    expect(result.container.querySelector('[data-app-step="report"]')).toBeInTheDocument();
    result.unmount();
  });

  it('shows the opening prompt exactly once', () => {
    const mission = missions.find(({ id }) => id === 'basic-t-shirt')!;
    renderAppAtStep({ missionId: mission.id, step: 'request' });
    expect(screen.getAllByText(mission.openingPrompt, { exact: true })).toHaveLength(1);
  });

  it('uses distinct non-answer silhouettes for scarf and sportswear', () => {
    const scarf = renderAppAtStep({ missionId: 'soft-scarf', step: 'request' });
    expect(scarf.container.querySelector('[data-illustration-kind="scarf"]')).toBeInTheDocument();
    expect(scarf.container.querySelector('[data-illustration-kind="shirt"]')).toBeNull();
    scarf.unmount();

    const sportswear = renderAppAtStep({ missionId: 'sportswear', step: 'request' });
    expect(sportswear.container.querySelector('[data-illustration-kind="sportswear"]')).toBeInTheDocument();
    expect(sportswear.container.querySelector('[data-illustration-kind="decorated-top"]')).toBeNull();
    sportswear.unmount();
  });
});

describe('Task 8 표시 확대경과 접근 가능한 뜻 해석', () => {
  afterEach(() => cleanup());

  it('활성 표시 하나에 문자 설명과 표시 구분을 항상 함께 보여 준다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });

    expect(screen.getAllByRole('button', { name: '뜻 확인' })).toHaveLength(1);
    expect(screen.getByRole('img', { name: /세탁통 안에 30/ })).toBeInTheDocument();
    expect(screen.getAllByText('30°C 약한 세탁')).not.toHaveLength(0);
    expect(screen.getByText('세탁 · 물세탁')).toBeInTheDocument();
    expect(screen.getByText('학습용 아이콘')).toBeInTheDocument();
    expect(screen.getAllByText(/30°C와 한 줄은 약한 세탁/)).not.toHaveLength(0);
  });

  it('확대 버튼은 native 상태를 알리고 용어 도움은 정확한 용어를 제공한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });

    const expand = screen.getByRole('button', { name: '표시 크게 보기' });
    expect(expand).toHaveAttribute('aria-expanded', 'false');
    await user.click(expand);
    expect(expand).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('img', { name: /세탁통 안에 30/ })).toHaveClass('symbol-image-expanded');

    expect(screen.getByRole('group', { name: /뜻 후보/ })).toBeInTheDocument();
    const glossary = screen.getByText('용어 도움');
    expect(glossary.tagName).toBe('SUMMARY');
    for (const term of ['완화 조건', '회전식 건조', '전문 관리', '학습용 재료 모형']) {
      expect(screen.getByText(new RegExp(term))).toBeInTheDocument();
    }
  });

  it('native radio는 키보드로 고르고 오답 뒤 같은 카드 설명으로 돌아가 재시도할 수 있다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(new Set(radios.map((radio) => radio.getAttribute('name'))).size).toBe(1);
    const wrongRadio = radios[1]!;
    wrongRadio.focus();
    await user.click(wrongRadio);
    expect(wrongRadio).toBeChecked();
    await user.click(screen.getByRole('button', { name: '뜻 확인' }));

    expect(screen.getByRole('status')).toHaveTextContent(/문자 설명과 허용 조건을 다시 확인/);
    const description = screen.getByTestId('symbol-description');
    expect(description).toHaveAttribute('tabindex', '-1');
    expect(document.activeElement).toBe(description);
    expect(screen.getAllByRole('button', { name: '뜻 확인' })).toHaveLength(1);
  });

  it('모든 고유 표시를 맞히기 전에는 계획으로 넘어가지 않고, 맞히면 계획으로 넘어간다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
    const mission = missions.find(({ id }) => id === 'basic-t-shirt')!;
    const expectedIds = [...new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds))];

    expect(screen.getByText(`표시 진행: 0/${expectedIds.length}`)).toBeInTheDocument();
    for (const [index, symbolId] of expectedIds.entries()) {
      const symbol = careSymbolById.get(symbolId)!;
      const label = symbol.meaningOptions.find(({ id }) => id === symbol.correctMeaningOptionId)!.label;
      await user.click(screen.getByRole('radio', { name: label }));
      await user.click(screen.getByRole('button', { name: '뜻 확인' }));
      if (index < expectedIds.length - 1) {
        expect(screen.getByText(`표시 진행: ${index + 1}/${expectedIds.length}`)).toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: '뜻 확인' })).toHaveLength(1);
      }
    }
    expect(screen.getByRole('heading', { name: /관리 순서판/ })).toBeInTheDocument();
  });

  it('정답이 화면에 data-correct나 정답 ID로 새어 나오지 않는다', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
    expect(result.container.querySelector('[data-correct]')).toBeNull();
    expect(result.container.textContent).not.toContain('meaning-wash-30-gentle');
  });

  it('중복 표시가 있는 미션도 고유 표시를 한 번씩만 묻는다', () => {
    const mission = missions.find(({ id }) => id === 'mixed-load')!;
    const totalOccurrences = mission.garments.flatMap(({ symbolIds }) => symbolIds).length;
    const uniqueCount = new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds)).size;
    expect(totalOccurrences).toBeGreaterThan(uniqueCount);
    renderAppAtStep({ missionId: mission.id, step: 'magnifier' });
    expect(screen.getByText(`표시 진행: 0/${uniqueCount}`)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '뜻 확인' })).toHaveLength(1);
  });

  it('표시 catalog가 빠지면 한국어 오류로 멈추고 조용히 건너뛰지 않는다', () => {
    const original = careSymbolById.get('care-wash-30-gentle');
    careSymbolById.delete('care-wash-30-gentle');
    try {
      renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
      expect(screen.queryByRole('button', { name: '뜻 확인' })).toBeNull();
    } finally {
      if (original) careSymbolById.set('care-wash-30-gentle', original);
    }
  });

  it.each([
    ['빈 accessibleDescription', (symbol: CareSymbol) => ({ ...symbol, accessibleDescription: ' ' })],
    ['중복 meaning options', (symbol: CareSymbol) => ({
      ...symbol,
      meaningOptions: [symbol.meaningOptions[0], symbol.meaningOptions[0], symbol.meaningOptions[2]],
    })],
    ['공식 표시 provenance', (symbol: CareSymbol) => ({ ...symbol, displayKind: 'official-standard-symbol' as const })],
    ['key/id 불일치', (symbol: CareSymbol) => ({ ...symbol, id: 'care-no-iron' as CareSymbol['id'] })],
    ['경로 traversal', (symbol: CareSymbol) => ({ ...symbol, assetPath: '/symbols/../care-wash-30-gentle.svg' as CareSymbol['assetPath'] })],
    ['encoded traversal', (symbol: CareSymbol) => ({ ...symbol, assetPath: '/symbols/%2e%2e/care-wash-30-gentle.svg' as CareSymbol['assetPath'] })],
    ['query 경로', (symbol: CareSymbol) => ({ ...symbol, assetPath: '/symbols/care-wash-30-gentle.svg?raw=1' as CareSymbol['assetPath'] })],
    ['fragment 경로', (symbol: CareSymbol) => ({ ...symbol, assetPath: '/symbols/care-wash-30-gentle.svg#icon' as CareSymbol['assetPath'] })],
  ])('변조한 %s catalog는 fail-closed 오류 화면으로 멈춘다', (_label, mutate) => {
    const symbolId = 'care-wash-30-gentle';
    const original = careSymbolById.get(symbolId)! as CareSymbol;
    const symbolCatalog = careSymbolById as unknown as Map<string, unknown>;
    try {
      const mutateSymbol = mutate as unknown as (symbol: CareSymbol) => CareSymbol;
      symbolCatalog.set(symbolId, mutateSymbol(original));
      renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
      expect(screen.queryByRole('img')).toBeNull();
    } finally {
      symbolCatalog.set(symbolId, original);
    }
  });

  it('catalog 검증을 통과한 정상 Map은 기존 표시 경로로 렌더링된다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
    expect(screen.getByRole('img', { name: /세탁통 안에 30/ })).toBeInTheDocument();
  });

  it.each([
    ['mission id', (mission: GarmentMission) => ({ ...mission, id: 'soft-scarf' as GarmentMission['id'] })],
    ['mission order', (mission: GarmentMission) => ({ ...mission, order: 99 as GarmentMission['order'] })],
    ['title', (mission: GarmentMission) => ({ ...mission, title: ' ' })],
    ['learning focus', (mission: GarmentMission) => ({ ...mission, learningFocus: '' })],
    ['opening prompt', (mission: GarmentMission) => ({ ...mission, openingPrompt: '' })],
    ['requiresGrouping', (mission: GarmentMission) => ({ ...mission, requiresGrouping: 'yes' as unknown as boolean })],
    ['garments list', (mission: GarmentMission) => ({ ...mission, garments: [] })],
    ['garment name', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], name: ' ' } as VirtualGarment],
    })],
    ['garment id', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], id: ' ' } as VirtualGarment],
    })],
    ['material model', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], materialModel: ' ' } as VirtualGarment],
    })],
    ['material boundary', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], materialBoundary: '' } as VirtualGarment],
    })],
    ['stain description', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], contaminationScenario: '' } as VirtualGarment],
    })],
    ['symbol ids', (mission: GarmentMission) => ({
      ...mission,
      garments: [{ ...mission.garments[0], symbolIds: [] } as VirtualGarment],
    })],
    ['material options', (mission: GarmentMission) => ({
      ...mission,
      garments: [{
        ...mission.garments[0],
        materialAllowedOptionIdsByStage: { ...mission.garments[0]?.materialAllowedOptionIdsByStage, wash: [] },
      } as unknown as VirtualGarment],
    })],
    ['material option string', (mission: GarmentMission) => ({
      ...mission,
      garments: [{
        ...mission.garments[0],
        materialAllowedOptionIdsByStage: { ...mission.garments[0]?.materialAllowedOptionIdsByStage, wash: [' '] },
      } as unknown as VirtualGarment],
    })],
  ])('변조한 %s mission은 fail-closed 오류 화면으로 멈춘다', (_label, mutate) => {
    const missionId = 'basic-t-shirt';
    const missionCatalog = missionById as unknown as Map<string, unknown>;
    const original = missionCatalog.get(missionId) as GarmentMission;
    try {
      const mutateMission = mutate as unknown as (mission: GarmentMission) => GarmentMission;
      missionCatalog.set(missionId, mutateMission(original));
      renderAppAtStep({ missionId, step: 'magnifier' });
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
      expect(screen.queryByRole('button', { name: '뜻 확인' })).toBeNull();
    } finally {
      missionCatalog.set(missionId, original);
    }
  });

  it('mission Map key와 mission.id가 다르면 표시 활동을 시작하지 않는다', () => {
    const missionId = 'basic-t-shirt';
    const missionCatalog = missionById as unknown as Map<string, unknown>;
    const original = missionCatalog.get(missionId) as GarmentMission;
    try {
      missionCatalog.set(missionId, { ...original, id: 'soft-scarf' });
      renderAppAtStep({ missionId, step: 'magnifier' });
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
    } finally {
      missionCatalog.set(missionId, original);
    }
  });

  it.each([
    ['빈 label', (option: CareOption) => ({ ...option, label: ' ' })],
    ['잘못된 requiresAdult', (option: CareOption) => ({ ...option, requiresAdult: 'yes' as unknown as boolean })],
    ['malformed riskIds', (option: CareOption) => ({ ...option, riskIds: ['not-a-risk'] as unknown as CareOption['riskIds'] })],
    ['malformed resource level', (option: CareOption) => ({ ...option, waterUse: 'maximum' as CareOption['waterUse'] })],
    ['option Map key-id 불일치', (option: CareOption) => ({ ...option, id: 'plan-wash-strong-40' as CareOption['id'] })],
  ])('변조한 %s option catalog는 확대경 진입을 fail-closed 한다', (_label, mutate) => {
    const optionId = 'plan-wash-gentle-30';
    const original = careOptionById.get(optionId)! as CareOption;
    const optionCatalog = careOptionById as unknown as Map<string, unknown>;
    try {
      const mutateOption = mutate as unknown as (option: CareOption) => CareOption;
      optionCatalog.set(optionId, mutateOption(original));
      renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
      expect(screen.queryByRole('img')).toBeNull();
    } finally {
      optionCatalog.set(optionId, original);
    }
  });

  it('SymbolFigure는 빈 alt·설명과 잘못된 display kind·provenance에서 img를 렌더하지 않는다', () => {
    const valid = careSymbols[0]!;
    const { rerender } = render(<SymbolFigure symbol={{ ...valid, accessibleDescription: ' ' }} expanded={false} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<SymbolFigure symbol={{ ...valid, displayKind: 'official-standard-symbol' }} expanded={false} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<SymbolFigure symbol={{ ...valid, shortDescription: ' ' }} expanded={false} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/);
    expect(screen.queryByRole('img')).toBeNull();
    rerender(<SymbolFigure symbol={{ ...valid, sourceIds: [] }} expanded={false} />);
    expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
