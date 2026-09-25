import React, { useState, type ReactNode } from 'react';
import type { HomeMode } from '../utils/detectRecommendedMode';
import { ModeContext } from './modeContextValue';
import { MODE_KEY, MODE_SOURCE_KEY, resolveInitialMode } from './resolveInitialMode';
import { safeLocalStorage } from '../utils/safeStorage';

export type { HomeMode };

export const ModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ mode, isManual }, setState] = useState(resolveInitialMode);

  const setMode = (next: HomeMode) => {
    setState({ mode: next, isManual: true });
    safeLocalStorage.set(MODE_KEY, next);
    safeLocalStorage.set(MODE_SOURCE_KEY, 'manual');
  };

  const toggleMode = () => setMode(mode === 'wow' ? 'classic' : 'wow');

  return (
    <ModeContext.Provider value={{ mode, isManual, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
