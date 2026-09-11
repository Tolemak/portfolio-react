import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ModeProvider } from './ModeContext';
import { useMode } from './useMode';

const wrapper = ({ children }: { children: React.ReactNode }) => <ModeProvider>{children}</ModeProvider>;

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('ModeProvider', () => {
  it('starts from a manual choice when one was stored', () => {
    localStorage.setItem('homeMode', 'classic');
    localStorage.setItem('homeModeSource', 'manual');

    const { result } = renderHook(() => useMode(), { wrapper });

    expect(result.current.mode).toBe('classic');
    expect(result.current.isManual).toBe(true);
  });

  it('recommends a mode when the visitor never chose one', () => {
    const { result } = renderHook(() => useMode(), { wrapper });

    expect(['wow', 'classic']).toContain(result.current.mode);
    expect(result.current.isManual).toBe(false);
  });

  it('remembers an explicit choice as manual', () => {
    const { result } = renderHook(() => useMode(), { wrapper });

    act(() => result.current.setMode('classic'));

    expect(result.current.mode).toBe('classic');
    expect(result.current.isManual).toBe(true);
    expect(localStorage.getItem('homeMode')).toBe('classic');
    expect(localStorage.getItem('homeModeSource')).toBe('manual');
  });

  it('flips between the two modes', () => {
    const { result } = renderHook(() => useMode(), { wrapper });

    act(() => result.current.setMode('wow'));
    act(() => result.current.toggleMode());

    expect(result.current.mode).toBe('classic');

    act(() => result.current.toggleMode());

    expect(result.current.mode).toBe('wow');
  });
});
