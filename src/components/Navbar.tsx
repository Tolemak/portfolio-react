import React, { useState } from 'react';
import { motion } from 'motion/react';
import { navbar } from '../data/navbar';
import { Link, useLocation } from 'react-router-dom';
import { useT, useLang } from '../data/i18n';
import { useTheme } from '../contexts/useTheme';
import { useMode } from '../contexts/useMode';
import { radialViewTransition } from '../utils/viewTransition';

export type NavbarProps = {
  onSectionHover?: (section: string | null) => void;
  highlightedSection?: string | null;
};

const Navbar: React.FC<NavbarProps> = ({ onSectionHover, highlightedSection }) => {
  const location = useLocation();
  const t = useT();
  const { darkMode, toggleTheme } = useTheme();
  const { mode, toggleMode } = useMode();
  const { lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isClassicHome = mode === 'classic' && location.pathname === '/';

  React.useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const getActiveSection = () => {
    if (location.pathname === '/') return null;
    const found = navbar.find(item => location.pathname.startsWith(item.to));
    return found ? found.title.toLowerCase() : null;
  };
  const activeSection = getActiveSection();

  const isItemActive = (item: typeof navbar[number]) => {
    const key = item.title.toLowerCase();
    return key === activeSection || key === highlightedSection;
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    radialViewTransition(clientX, clientY, toggleTheme);
  };

  const handleModeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    radialViewTransition(clientX, clientY, toggleMode);
  };

  return (
    <>
      <nav className="navbar-container">
        <Link to="/" className="navbar-logo" aria-label={t.navbar.home}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="var(--accent-light)" />
            <circle cx="12" cy="12" r="4" fill="var(--accent)" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          </svg>
          Portfolio
        </Link>

        <ul className="navbar-list">
          {navbar.map((item) => {
            const active = isItemActive(item);
            const translatedText = t.navbar[item.title.toLowerCase() as keyof typeof t.navbar] || item.title;
            return (
              <li
                key={item.to}
                className={`navbar-item${active ? ' highlighted' : ''}`}
                onMouseEnter={() => onSectionHover && onSectionHover(item.title.toLowerCase())}
                onMouseLeave={() => onSectionHover && onSectionHover(null)}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="navbar-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {isClassicHome ? (
                  <a href={`#${item.title.toLowerCase()}`}>{translatedText}</a>
                ) : (
                  <Link to={item.to}>{translatedText}</Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="navbar-actions">
          <button
            className="navbar-btn"
            onClick={handleModeToggle}
            aria-label={mode === 'wow' ? t.navbar.switchToClassic : t.navbar.switchToWow}
            title={mode === 'wow' ? t.navbar.switchToClassic : t.navbar.switchToWow}
          >
            {mode === 'wow' ? '🚀' : '📄'}
          </button>
          <button
            className="navbar-btn"
            onClick={handleThemeToggle}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          <button
            className="navbar-btn"
            onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
            aria-label={lang === 'pl' ? 'Switch to English' : 'Zmień na polski'}
          >
            {lang === 'pl' ? 'PL' : 'EN'}
          </button>
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile-menu${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
        <ul>
          {navbar.map((item) => {
            const active = isItemActive(item);
            const translatedText = t.navbar[item.title.toLowerCase() as keyof typeof t.navbar] || item.title;
            return (
              <li key={item.to} className={active ? 'active' : ''}>
                {isClassicHome ? (
                  <a href={`#${item.title.toLowerCase()}`} onClick={() => setMobileOpen(false)}>
                    {translatedText}
                  </a>
                ) : (
                  <Link to={item.to} onClick={() => setMobileOpen(false)}>
                    {translatedText}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
