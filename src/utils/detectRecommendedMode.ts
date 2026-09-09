export type HomeMode = 'wow' | 'classic';

export interface ModeDetectionSignals {
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
  deviceMemoryGB?: number;
  hardwareConcurrency?: number;
  saveData?: boolean;
  effectiveType?: string;
}

const SLOW_EFFECTIVE_TYPES = new Set(['slow-2g', '2g', '3g']);
const LOW_MEMORY_THRESHOLD_GB = 4;
const LOW_CORE_THRESHOLD = 4;

export function recommendMode(signals: ModeDetectionSignals): HomeMode {
  if (signals.prefersReducedMotion) return 'classic';
  if (!signals.hasWebGL) return 'classic';
  if (signals.saveData) return 'classic';
  if (signals.effectiveType && SLOW_EFFECTIVE_TYPES.has(signals.effectiveType)) return 'classic';
  if (signals.deviceMemoryGB !== undefined && signals.deviceMemoryGB <= LOW_MEMORY_THRESHOLD_GB) return 'classic';
  if (signals.hardwareConcurrency !== undefined && signals.hardwareConcurrency <= LOW_CORE_THRESHOLD) return 'classic';
  return 'wow';
}

function detectWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

export function collectModeDetectionSignals(): ModeDetectionSignals {
  const nav = typeof navigator !== 'undefined' ? (navigator as NavigatorWithHints) : undefined;
  return {
    prefersReducedMotion:
      typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    hasWebGL: detectWebGL(),
    deviceMemoryGB: nav?.deviceMemory,
    hardwareConcurrency: nav?.hardwareConcurrency,
    saveData: nav?.connection?.saveData,
    effectiveType: nav?.connection?.effectiveType,
  };
}
