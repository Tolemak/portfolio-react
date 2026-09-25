import React, { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from './themeContextValue';
import { safeLocalStorage } from '../utils/safeStorage';

const THEME_KEY = 'theme';

function resolveInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;

  const stored = safeLocalStorage.get(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored === 'dark';

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(resolveInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    safeLocalStorage.set(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
