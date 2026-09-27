import { afterEach, describe, expect, it, vi } from 'vitest';
import { getWowStage, setWowStage, subscribeWowStage } from './wowStage';

describe('wowStage', () => {
  afterEach(() => setWowStage(null));

  it('starts empty and remembers the current stop', () => {
    expect(getWowStage()).toBeNull();
    setWowStage({ key: 'projects', index: 1, total: 5 });
    expect(getWowStage()).toEqual({ key: 'projects', index: 1, total: 5 });
  });

  it('notifies listeners only when the stop changes', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeWowStage(listener);
    setWowStage({ key: 'about', index: 0, total: 5 });
    setWowStage({ key: 'about', index: 0, total: 5 });
    setWowStage({ key: 'skills', index: 4, total: 5 });
    expect(listener).toHaveBeenCalledTimes(2);
    unsubscribe();
    setWowStage(null);
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
