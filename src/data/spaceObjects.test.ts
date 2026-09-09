import { describe, it, expect } from 'vitest';
import { SPACE_OBJECTS, getSectionPath, spaceObjectsInFlightOrder } from './spaceObjects';
import { navbar } from './navbar';

describe('space objects', () => {
  it('every object key is unique', () => {
    const keys = SPACE_OBJECTS.map((o) => o.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('every object points at a distinct route path', () => {
    const paths = SPACE_OBJECTS.map((o) => o.routePath);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('every route path matches a real navbar route', () => {
    const navbarPaths = new Set(navbar.map((item) => item.to));
    for (const obj of SPACE_OBJECTS) {
      expect(navbarPaths.has(obj.routePath)).toBe(true);
    }
  });

  it('getSectionPath resolves known keys and rejects unknown ones', () => {
    for (const obj of SPACE_OBJECTS) {
      expect(getSectionPath(obj.key)).toBe(obj.routePath);
    }
    // @ts-expect-error intentionally invalid key
    expect(() => getSectionPath('not-a-real-section')).toThrow();
  });

  it('flight order covers exactly 0..N-1 with no gaps or duplicates', () => {
    const orders = SPACE_OBJECTS.map((o) => o.order).sort((a, b) => a - b);
    expect(orders).toEqual(SPACE_OBJECTS.map((_, i) => i));
  });

  it('every model path is unique', () => {
    const modelPaths = SPACE_OBJECTS.map((o) => o.modelPath);
    expect(new Set(modelPaths).size).toBe(modelPaths.length);
  });

  it('spaceObjectsInFlightOrder returns objects sorted by order', () => {
    const ordered = spaceObjectsInFlightOrder();
    expect(ordered.map((o) => o.order)).toEqual([0, 1, 2, 3, 4]);
  });
});
