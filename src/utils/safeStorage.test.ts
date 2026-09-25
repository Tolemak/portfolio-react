import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { safeLocalStorage, safeSessionStorage } from './safeStorage';

function blockStorage(area: 'localStorage' | 'sessionStorage') {
  vi.spyOn(window, area, 'get').mockImplementation(() => {
    throw new DOMException('The operation is insecure.', 'SecurityError');
  });
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('safeStorage', () => {
  it('reads, writes, lists and removes like the underlying storage', () => {
    expect(safeLocalStorage.set('theme', 'dark')).toBe(true);
    expect(safeLocalStorage.get('theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(safeLocalStorage.keys()).toEqual(['theme']);

    safeLocalStorage.remove('theme');

    expect(safeLocalStorage.get('theme')).toBeNull();
  });

  it('keeps local and session storage apart', () => {
    safeSessionStorage.set('splashShown', '1');

    expect(sessionStorage.getItem('splashShown')).toBe('1');
    expect(safeLocalStorage.get('splashShown')).toBeNull();
  });

  it('behaves as empty storage when access is blocked', () => {
    localStorage.setItem('theme', 'dark');
    blockStorage('localStorage');

    expect(safeLocalStorage.get('theme')).toBeNull();
    expect(safeLocalStorage.set('theme', 'light')).toBe(false);
    expect(safeLocalStorage.keys()).toEqual([]);
    expect(() => safeLocalStorage.remove('theme')).not.toThrow();
  });

  it('reports a failed write when the quota is exceeded', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Quota exceeded', 'QuotaExceededError');
    });

    expect(safeSessionStorage.set('chunk-retry:page', '1')).toBe(false);
  });
});
