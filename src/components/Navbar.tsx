import React from 'react';
import { navbar } from '../data/navbar';

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onSectionHover?: (section: string | null) => void;
  highlightedSection?: string | null;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onSectionHover, highlightedSection }) => {
  return (
    <nav className="navbar">
      <ul>
        {navbar.map((item) => (
          <li
            key={item.to}
            onMouseEnter={() => onSectionHover && onSectionHover(item.title.toLowerCase())}
            onMouseLeave={() => onSectionHover && onSectionHover(null)}
            className={highlightedSection === item.title.toLowerCase() ? 'highlighted' : ''}
          >
            <a
              href={item.to}
              style={highlightedSection === item.title.toLowerCase() ? { color: '#b3e0ff', fontWeight: 'bold' } : {}}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="theme-toggle"
        aria-label="Przełącz motyw"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? '🌙' : '☀️'}
      </button>
    </nav>
  );
};

export default Navbar;
