import { afterEach, describe, expect, it, vi } from 'vitest';
import { radialViewTransition } from './viewTransition';

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(document, 'startViewTransition');
});

describe('radialViewTransition', () => {
  it('applies the change directly when the browser has no view transitions', () => {
    const apply = vi.fn();

    radialViewTransition(10, 10, apply);

    expect(apply).toHaveBeenCalledTimes(1);
  });

  it('skips the animation when the visitor asked for reduced motion', () => {
    const apply = vi.fn();
    const startViewTransition = vi.fn();
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: startViewTransition });
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    radialViewTransition(10, 10, apply);

    expect(apply).toHaveBeenCalledTimes(1);
    expect(startViewTransition).not.toHaveBeenCalled();
  });

  it('runs the change inside a view transition when supported', async () => {
    const apply = vi.fn();
    const startViewTransition = vi.fn((callback: () => void) => {
      callback();
      return { ready: Promise.resolve() };
    });
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: startViewTransition });
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
    document.documentElement.animate = vi.fn() as unknown as typeof document.documentElement.animate;

    radialViewTransition(10, 10, apply);
    await Promise.resolve();

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(apply).toHaveBeenCalledTimes(1);
  });

  it('does not blow up when the transition never becomes ready', async () => {
    const apply = vi.fn();
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: (callback: () => void) => {
        callback();
        return { ready: Promise.reject(new Error('aborted')) };
      },
    });
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));

    expect(() => radialViewTransition(5, 5, apply)).not.toThrow();
    await Promise.resolve();
    expect(apply).toHaveBeenCalledTimes(1);
  });
});
