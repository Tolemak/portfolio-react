import { describe, expect, it } from 'vitest';

const sources = import.meta.glob<string>(
  ['/src/**/*.{ts,tsx}', '!/src/**/*.test.{ts,tsx}', '/index.html'],
  { query: '?raw', import: 'default', eager: true },
);

const publicFiles = Object.keys(import.meta.glob('/public/**/*')).map((path) => path.replace(/^\/public/, ''));

const assetReference = /["'`](\/(?:logos|models)\/[^"'`\s]+)["'`]/g;

describe('public assets', () => {
  it('every /logos and /models path used in the code exists in public/', () => {
    const available = new Set(publicFiles);
    const missing = Object.entries(sources).flatMap(([file, source]) =>
      [...source.matchAll(assetReference)]
        .map(([, path]) => path)
        .filter((path) => !available.has(path))
        .map((path) => `${file} -> ${path}`),
    );

    expect(missing).toEqual([]);
  });

  it('file names in public/ are plain ASCII', () => {
    expect(publicFiles.filter((path) => !/^[\x20-\x7e]+$/.test(path))).toEqual([]);
  });
});
