import { lazy, type ComponentType } from 'react';

/**
 * On a stale chunk after a new deploy, forces one reload instead of throwing
 * into the error boundary; a sessionStorage flag prevents a reload loop.
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
