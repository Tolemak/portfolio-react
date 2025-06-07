import React from 'react';
import { navbar } from '../data/navbar';
import { Link, useLocation } from 'react-router-dom';
import { useT } from '../data/i18n';

export type NavbarProps = {
  onSectionHover?: (section: string | null) => void;
  highlightedSection?: string | null;
  darkMode?: boolean;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<NavbarProps> = ({ onSectionHover, highlightedSection, darkMode, setDarkMode }) => {
  const location = useLocation();
  const t = useT();
  // Ustal aktywną sekcję na podstawie ścieżki
  const activeSection = React.useMemo(() => {
    if (location.pathname === '/') return null;
    const found = navbar.find(item => location.pathname.startsWith(item.to));
    return found ? found.title.toLowerCase() : null;
  }, [location.pathname]);
  return (
    <nav
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        background: 'rgba(20, 24, 40, 0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 4px 32px #0006',
        borderBottom: '1.5px solid #2a3a5a',
        zIndex: 100,
        padding: '0.5rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 64,
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      <ul style={{ display: 'flex', alignItems: 'center', gap: 32, margin: 0, padding: 0, listStyle: 'none', position: 'relative' }}>
        <li key="home" style={{ marginRight: 8, position: 'relative' }}>
          <Link to="/" aria-label={t.navbar.home} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%',
            background: highlightedSection === null && location.pathname === '/' ? 'rgba(179,224,255,0.22)' : 'rgba(30,30,60,0.7)',
            boxShadow: highlightedSection === null && location.pathname === '/' ? '0 0 16px 4px #b3e0ff88, 0 2px 8px #0004' : '0 2px 8px #0004',
            border: '2px solid #b3e0ff',
            transition: 'background 0.2s, border 0.2s, box-shadow 0.2s',
            position: 'relative',
            filter: highlightedSection === null && location.pathname === '/' ? 'drop-shadow(0 0 8px #b3e0ff)' : 'none',
          }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="16" rx="13" ry="13" fill="#b3e0ff" fillOpacity="0.18"/>
              <rect x="7" y="14" width="18" height="4" rx="2" fill="#b3e0ff" />
              <rect x="15" y="7" width="2" height="18" rx="1" fill="#b3e0ff" />
              <rect x="10.5" y="10.5" width="11" height="11" rx="5.5" fill="#1976d2" stroke="#b3e0ff" strokeWidth="1.5" />
            </svg>
            {/* Animated underline for home if active */}
            {highlightedSection === null && location.pathname === '/' && (
              <span style={{
                position: 'absolute',
                left: 8,
                right: 8,
                bottom: 6,
                height: 4,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #b3e0ff 0%, #1976d2 100%)',
                boxShadow: '0 0 12px #b3e0ff88',
                opacity: 0.95,
                transition: 'all 0.25s',
                animation: 'navbar-underline 1.2s cubic-bezier(.4,1.6,.6,1)'
              }} />
            )}
          </Link>
        </li>
        {navbar.map((item) => {
          const isActive = (highlightedSection === item.title.toLowerCase()) || (activeSection === item.title.toLowerCase());
          return (
            <li
              key={item.to}
              onMouseEnter={() => onSectionHover && onSectionHover(item.title.toLowerCase())}
              onMouseLeave={() => onSectionHover && onSectionHover(null)}
              className={isActive ? 'highlighted' : ''}
              style={{
                borderRadius: 18,
                background: isActive ? 'rgba(179,224,255,0.22)' : 'rgba(30,30,60,0.7)',
                boxShadow: isActive ? '0 0 16px 4px #b3e0ff88, 0 2px 8px #0004' : '0 1px 4px #0002',
                padding: '0.5rem 1.3rem',
                margin: 0,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#b3e0ff' : '#fff',
                fontFamily: 'Orbitron, monospace',
                fontSize: 18,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.18s',
                border: isActive ? '2px solid #b3e0ff' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                filter: isActive ? 'drop-shadow(0 0 8px #b3e0ff)' : 'none',
              }}
            >
              <Link to={item.to} style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                {t.navbar[item.title.toLowerCase() as keyof typeof t.navbar] || item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode && setDarkMode((d) => !d)}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{marginLeft: 24, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#b3e0ff'}}
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;
