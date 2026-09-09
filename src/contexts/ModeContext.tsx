import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { recommendMode, collectModeDetectionSignals, type HomeMode } from '../utils/detectRecommendedMode';

export type { HomeMode };

type ModeContextType = {
  mode: HomeMode;
  isManual: boolean;
  setMode: (mode: HomeMode) => void;
  toggleMode: () => void;
};

const MODE_KEY = 'homeMode';
const MODE_SOURCE_KEY = 'homeModeSource';

function resolveInitialMode(): { mode: HomeMode; isManual: boolean } {
  if (typeof window === 'undefined') return { mode: 'wow', isManual: false };
  const source = localStorage.getItem(MODE_SOURCE_KEY);
  const stored = localStorage.getItem(MODE_KEY);
  if (source === 'manual' && (stored === 'wow' || stored === 'classic')) {
    return { mode: stored, isManual: true };
  }
  return { mode: recommendMode(collectModeDetectionSignals()), isManual: false };
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ mode, isManual }, setState] = useState(resolveInitialMode);

  const setMode = (next: HomeMode) => {
    setState({ mode: next, isManual: true });
    if (typeof window !== 'undefined') {
      localStorage.setItem(MODE_KEY, next);
      localStorage.setItem(MODE_SOURCE_KEY, 'manual');
    }
  };

  const toggleMode = () => setMode(mode === 'wow' ? 'classic' : 'wow');

  return (
    <ModeContext.Provider value={{ mode, isManual, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
