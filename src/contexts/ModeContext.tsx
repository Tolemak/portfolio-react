import React, { useState, type ReactNode } from 'react';
import type { HomeMode } from '../utils/detectRecommendedMode';
import { ModeContext } from './modeContextValue';
import { MODE_KEY, MODE_SOURCE_KEY, resolveInitialMode } from './resolveInitialMode';

export type { HomeMode };

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
