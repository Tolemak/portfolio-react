import { describe, it, expect } from 'vitest';
import { recommendMode, type ModeDetectionSignals } from './detectRecommendedMode';

const baseline: ModeDetectionSignals = {
  prefersReducedMotion: false,
  hasWebGL: true,
};

describe('recommendMode', () => {
  it('recommends wow when every signal is favorable', () => {
    expect(recommendMode(baseline)).toBe('wow');
  });

  it('recommends wow when optional signals are undefined (unsupported browser APIs)', () => {
    expect(
      recommendMode({
        prefersReducedMotion: false,
        hasWebGL: true,
        deviceMemoryGB: undefined,
        hardwareConcurrency: undefined,
        saveData: undefined,
        effectiveType: undefined,
      }),
    ).toBe('wow');
  });

  it('falls back to classic when prefers-reduced-motion is set', () => {
    expect(recommendMode({ ...baseline, prefersReducedMotion: true })).toBe('classic');
  });

  it('falls back to classic when WebGL is unavailable', () => {
    expect(recommendMode({ ...baseline, hasWebGL: false })).toBe('classic');
  });

  it('falls back to classic when the browser requests reduced data usage', () => {
    expect(recommendMode({ ...baseline, saveData: true })).toBe('classic');
  });

  it.each(['slow-2g', '2g', '3g'])('falls back to classic on a slow connection (%s)', (effectiveType) => {
    expect(recommendMode({ ...baseline, effectiveType })).toBe('classic');
  });

  it('does not fall back to classic on a fast connection', () => {
    expect(recommendMode({ ...baseline, effectiveType: '4g' })).toBe('wow');
  });

  it('falls back to classic on low device memory', () => {
    expect(recommendMode({ ...baseline, deviceMemoryGB: 4 })).toBe('classic');
  });

  it('does not fall back to classic above the memory threshold', () => {
    expect(recommendMode({ ...baseline, deviceMemoryGB: 8 })).toBe('wow');
  });

  it('falls back to classic on few CPU cores', () => {
    expect(recommendMode({ ...baseline, hardwareConcurrency: 4 })).toBe('classic');
  });

  it('does not fall back to classic above the core threshold', () => {
    expect(recommendMode({ ...baseline, hardwareConcurrency: 8 })).toBe('wow');
  });
});
