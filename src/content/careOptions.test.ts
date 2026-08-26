import { describe, expect, it } from 'vitest';
import { careOptions, careOptionById } from './careOptions';

describe('care choice cards', () => {
  it('contains each stable care option exactly once', () => {
    expect(careOptions).toHaveLength(12);
    expect(new Set(careOptions.map(({ id }) => id)).size).toBe(12);
    expect(careOptionById.size).toBe(12);
  });

  it('keeps the planning-stage distribution and adult safety boundary', () => {
    expect(careOptions.filter(({ stage }) => stage === 'wash')).toHaveLength(3);
    expect(careOptions.filter(({ stage }) => stage === 'dry')).toHaveLength(5);
    expect(careOptions.filter(({ stage }) => stage === 'iron')).toHaveLength(4);
    expect(
      careOptions.filter(({ stage }) => stage === 'iron').every(({ requiresAdult }) => requiresAdult),
    ).toBe(true);
  });

  it('labels misconception cards as comparisons rather than instructions', () => {
    for (const id of ['plan-wash-strong-40', 'plan-dry-tumble-high', 'plan-iron-high-with-adult'] as const) {
      const option = careOptionById.get(id);
      expect(option?.learningDescription).toMatch(/비교|오해/);
      expect(option?.learningDescription).toMatch(/실제|기기|안내/);
    }
    expect(careOptionById.get('plan-iron-high-with-adult')?.requiresAdult).toBe(true);
  });

  it('does not tell a child to operate a real iron', () => {
    for (const option of careOptions.filter(({ stage }) => stage === 'iron')) {
      expect(option.label).not.toMatch(/켜|사용해|직접|다리미질하/);
      expect(option.learningDescription).not.toMatch(/직접\s*(켜|사용)|기기를\s*켜/);
    }
  });
});
