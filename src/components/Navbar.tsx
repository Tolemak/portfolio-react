import React, { useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navbar } from '../data/navbar';
import { useT } from '../data/i18n';
import { useMode } from '../contexts/useMode';
import { radialViewTransition } from '../utils/viewTransition';
import { getWowStage, subscribeWowStage } from '../utils/wowStage';

export type NavbarProps = {
  onSectionHover?: (section: string | null) => void;
  highlightedSection?: string | null;
};

type SectionKey = 'about' | 'projects' | 'experience' | 'education' | 'skills';

/** A small planet with a satellite on its orbit: the site's mark, and its only idle motion. */
const OrbitMark = () => (
  <svg className="hud-mark" viewBox="0 0 32 32" aria-hidden="true">
    <circle cx="16" cy="16" r="11" className="hud-mark-orbit" />
    <circle cx="16" cy="16" r="4.5" className="hud-mark-planet" />
    <g className="hud-mark-satellite">
      <circle cx="27" cy="16" r="2.2" />
    </g>
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onSectionHover, highlightedSection }) => {
  const location = useLocation();
  const t = useT();
  const { mode, toggleMode } = useMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuFor, setMenuFor] = useState(location.pathname);
  const stage = useSyncExternalStore(subscribeWowStage, getWowStage);
  const onHome = location.pathname === '/';
  const isClassicHome = mode === 'classic' && onHome;

  // Navigating closes the phone menu; done during render so there is no extra paint with it open.
  if (menuFor !== location.pathname) {
    setMenuFor(location.pathname);
    setMenuOpen(false);
  }

  const keyOf = (item: (typeof navbar)[number]) => item.title.toLowerCase() as SectionKey;
  const routeSection = navbar.find((item) => !onHome && location.pathname.startsWith(item.to));
  // In the 3D scene the route follows the camera; on a section page it marks that page.
  const current: SectionKey | null = onHome && mode === 'wow' ? (stage?.key ?? null) : routeSection ? keyOf(routeSection) : null;
  const currentIndex = navbar.findIndex((item) => keyOf(item) === current);

  const switchMode = (target: 'wow' | 'classic') => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (mode === target) return;
    radialViewTransition(e.clientX, e.clientY, toggleMode);
  };

  const stopClass = (index: number, key: SectionKey) =>
    [
      'hud-stop',
      index === currentIndex ? 'is-current' : '',
      currentIndex >= 0 && index < currentIndex ? 'is-passed' : '',
      highlightedSection === key ? 'is-hovered' : '',
    ]
      .filter(Boolean)
      .join(' ');

  const stopLink = (item: (typeof navbar)[number], onClick?: () => void) => {
    const key = keyOf(item);
    const content = (
      <>
        <span className="hud-label">{t.navbar[key]}</span>
        <span className="hud-node" aria-hidden="true" />
      </>
    );
    const ariaCurrent = key === current ? ('location' as const) : undefined;
    return isClassicHome ? (
      <a href={`#${key}`} onClick={onClick} aria-current={ariaCurrent}>
        {content}
      </a>
    ) : (
      <Link to={item.to} onClick={onClick} aria-current={ariaCurrent}>
        {content}
      </Link>
    );
  };

  return (
    <>
      <header className="hud">
        <Link to="/" className="hud-id" aria-label={t.navbar.home}>
          <OrbitMark />
          <span className="hud-id-text">
            <span className="hud-name">Kamil Gałkowski</span>
            <span className="hud-role">{t.navbar.role}</span>
          </span>
        </Link>

        <nav className="hud-route" aria-label={t.navbar.route}>
          <ol>
            {navbar.map((item, index) => {
              const key = keyOf(item);
              return (
                <li
                  key={item.to}
                  className={stopClass(index, key)}
                  onMouseEnter={() => onSectionHover?.(key)}
                  onMouseLeave={() => onSectionHover?.(null)}
                >
                  {stopLink(item)}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="hud-actions">
          <div className="hud-mode" role="group" aria-label={t.navbar.modeLabel}>
            <button
              type="button"
              aria-pressed={mode === 'wow'}
              title={t.navbar.switchToWow}
              onClick={switchMode('wow')}
            >
              3D
            </button>
            <button
              type="button"
              aria-pressed={mode === 'classic'}
              title={t.navbar.switchToClassic}
              onClick={switchMode('classic')}
            >
              {t.navbar.classicShort}
            </button>
          </div>
          <button
            type="button"
            className="hud-menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="hud-menu"
            aria-label={t.navbar.menu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="hud-menu" className={`hud-menu${menuOpen ? ' open' : ''}`} inert={!menuOpen}>
        <ol>
          {navbar.map((item, index) => (
            <li key={item.to} className={stopClass(index, keyOf(item))}>
              {stopLink(item, () => setMenuOpen(false))}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default Navbar;
