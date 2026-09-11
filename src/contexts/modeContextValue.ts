import { createContext } from 'react';
import type { HomeMode } from '../utils/detectRecommendedMode';

export type ModeContextType = {
  mode: HomeMode;
  isManual: boolean;
  setMode: (mode: HomeMode) => void;
  toggleMode: () => void;
};

export const ModeContext = createContext<ModeContextType | undefined>(undefined);
