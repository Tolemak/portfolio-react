type StorageArea = 'localStorage' | 'sessionStorage';

/**
 * Private mode, blocked cookies or a full quota make Web Storage throw;
 * every call here degrades to "nothing stored" instead.
 */
type SafeStorage = {
  get: (key: string) => string | null;
  set: (key: string, value: string) => boolean;
  remove: (key: string) => void;
  keys: () => string[];
};

function createSafeStorage(area: StorageArea): SafeStorage {
  const attempt = <T,>(fallback: T, action: (storage: Storage) => T): T => {
    try {
      return action(window[area]);
    } catch {
      return fallback;
    }
  };

  return {
    get: (key) => attempt(null, (storage) => storage.getItem(key)),
    set: (key, value) => attempt(false, (storage) => {
      storage.setItem(key, value);
      return true;
    }),
    remove: (key) => attempt(undefined, (storage) => storage.removeItem(key)),
    keys: () => attempt([], (storage) => Object.keys(storage)),
  };
}

export const safeLocalStorage = createSafeStorage('localStorage');
export const safeSessionStorage = createSafeStorage('sessionStorage');
