import type { SectionKey } from '../data/spaceObjects';

export interface WowStage {
  key: SectionKey;
  index: number;
  total: number;
}

type Listener = () => void;

let current: WowStage | null = null;
const listeners = new Set<Listener>();

/** The stop the WOW camera is at, shared with the status bar outside the 3D scene. */
export function setWowStage(stage: WowStage | null): void {
  if (stage?.key === current?.key && stage?.index === current?.index) return;
  current = stage;
  listeners.forEach((listener) => listener());
}

export const getWowStage = (): WowStage | null => current;

export function subscribeWowStage(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
