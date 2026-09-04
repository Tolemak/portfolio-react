import { describe, it, expect } from 'vitest';
import { translations } from './i18n';

function collectKeyPaths(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => collectKeyPaths(item, `${path}[${i}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, v]) =>
      collectKeyPaths(v, path ? `${path}.${key}` : key)
    );
  }
  return [path];
}

describe('i18n translations', () => {
  it('pl and en cover the exact same set of keys', () => {
    const plPaths = collectKeyPaths(translations.pl).sort();
    const enPaths = collectKeyPaths(translations.en).sort();
    expect(enPaths).toEqual(plPaths);
  });
});
