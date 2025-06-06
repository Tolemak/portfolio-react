import React from 'react';

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#hero">Home</a></li>
        <li><a href="#projects">Projekty</a></li>
        <li><a href="#skills">Umiejętności</a></li>
        <li><a href="#experience">Doświadczenie</a></li>
        <li><a href="#education">Edukacja</a></li>
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
