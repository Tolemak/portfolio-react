import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from './useTheme';
import { resolveInitialMode } from './resolveInitialMode';
import { useMode } from './useMode';

const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('ThemeProvider', () => {
  it('starts from the OS preference when nothing was chosen before', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(true);
  });

  it('restores a previously chosen theme instead of the OS preference', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(true);
  });

  it('keeps an explicit light choice even when the OS prefers dark', () => {
    localStorage.setItem('theme', 'light');
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.darkMode).toBe(false);
  });

  it('persists the toggled theme so it survives a reload', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => result.current.toggleTheme());

    expect(result.current.darkMode).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('useTheme', () => {
  it('refuses to work outside a provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/);
  });
});

describe('useMode', () => {
  it('refuses to work outside a provider', () => {
    expect(() => renderHook(() => useMode())).toThrow(/ModeProvider/);
  });
});

describe('resolveInitialMode', () => {
  it('honours a manual choice', () => {
    localStorage.setItem('homeMode', 'classic');
    localStorage.setItem('homeModeSource', 'manual');

    expect(resolveInitialMode()).toEqual({ mode: 'classic', isManual: true });
  });

  it('ignores a stored mode that was not chosen manually', () => {
    localStorage.setItem('homeMode', 'classic');

    expect(resolveInitialMode().isManual).toBe(false);
  });

  it('ignores a manual flag pointing at an unknown mode', () => {
    localStorage.setItem('homeMode', 'nonsense');
    localStorage.setItem('homeModeSource', 'manual');

    expect(resolveInitialMode().isManual).toBe(false);
  });
});
