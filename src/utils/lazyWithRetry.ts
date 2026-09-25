import { lazy, type ComponentType } from 'react';
import { safeSessionStorage } from './safeStorage';

/**
 * On a stale chunk after a new deploy, forces one reload instead of throwing
 * into the error boundary; a sessionStorage flag prevents a reload loop, so
 * without storage it never reloads.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  key: string,
) {
  const flag = `chunk-retry:${key}`;

  return lazy(async () => {
    try {
      const module = await factory();
      safeSessionStorage.remove(flag);
      return module;
    } catch (error) {
      const alreadyRetried = safeSessionStorage.get(flag);
      if (!alreadyRetried && safeSessionStorage.set(flag, '1')) {
        window.location.reload();
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}
