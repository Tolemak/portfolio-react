import { describe, it, expect } from 'vitest';
import { ISS_MENU_SECTIONS, getSectionPath } from './issMenuSections';
import { navbar } from './navbar';

describe('ISS menu sections', () => {
  it('every section key is unique', () => {
    const keys = ISS_MENU_SECTIONS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('every section points at a distinct path', () => {
    const paths = ISS_MENU_SECTIONS.map((s) => s.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('every section path matches a real navbar route', () => {
    const navbarPaths = new Set(navbar.map((item) => item.to));
    for (const section of ISS_MENU_SECTIONS) {
      expect(navbarPaths.has(section.path)).toBe(true);
    }
  });

  it('getSectionPath resolves known keys and rejects unknown ones', () => {
    for (const section of ISS_MENU_SECTIONS) {
      expect(getSectionPath(section.key)).toBe(section.path);
    }
    expect(() => getSectionPath('not-a-real-section')).toThrow();
  });
});
