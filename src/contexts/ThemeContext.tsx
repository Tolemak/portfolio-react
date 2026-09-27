import React, { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from './themeContextValue';
import { safeLocalStorage } from '../utils/safeStorage';
import { radialViewTransition } from '../utils/viewTransition';

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

  // The theme button lives in the shared status bar; it only announces the choice.
  useEffect(() => {
    const onTheme = (event: Event) => {
      event.preventDefault();
      const dark = (event as CustomEvent<{ theme: string }>).detail.theme === 'dark';
      const bar = (event.target as HTMLElement).getBoundingClientRect();
      radialViewTransition(bar.right - 30, bar.top + bar.height / 2, () => setDarkMode(dark));
    };
    document.addEventListener('tolemak-theme', onTheme);
    return () => document.removeEventListener('tolemak-theme', onTheme);
  }, []);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
