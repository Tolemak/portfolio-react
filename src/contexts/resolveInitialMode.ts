import { recommendMode, collectModeDetectionSignals, type HomeMode } from '../utils/detectRecommendedMode';
import { safeLocalStorage } from '../utils/safeStorage';

export const MODE_KEY = 'homeMode';
export const MODE_SOURCE_KEY = 'homeModeSource';

/**
 * A manual choice always wins; otherwise the mode is recommended from the
 * device signals on every visit.
 */
export function resolveInitialMode(): { mode: HomeMode; isManual: boolean } {
  if (typeof window === 'undefined') return { mode: 'wow', isManual: false };

  const source = safeLocalStorage.get(MODE_SOURCE_KEY);
  const stored = safeLocalStorage.get(MODE_KEY);
  if (source === 'manual' && (stored === 'wow' || stored === 'classic')) {
    return { mode: stored, isManual: true };
  }

  return { mode: recommendMode(collectModeDetectionSignals()), isManual: false };
}
