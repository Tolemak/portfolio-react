import { lazy, type ComponentType } from 'react';

/**
 * Wraps React.lazy so a stale-chunk failure (e.g. the browser still has an old
 * index.html referencing a hashed chunk that a new deploy removed) triggers a
 * single forced reload to pick up the current build, instead of throwing into
 * the error boundary. A sessionStorage flag prevents a reload loop if the
 * import keeps failing for another reason.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  key: string,
) {
  return lazy(async () => {
    try {
      const module = await factory();
      sessionStorage.removeItem(`chunk-retry:${key}`);
      return module;
    } catch (error) {
      const alreadyRetried = sessionStorage.getItem(`chunk-retry:${key}`);
      if (!alreadyRetried) {
        sessionStorage.setItem(`chunk-retry:${key}`, '1');
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}
