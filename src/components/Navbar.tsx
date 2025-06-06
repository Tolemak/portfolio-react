import React from 'react';
import { navbar } from '../data/navbar';

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="navbar">
      <ul>
        {navbar.map((item) => (
          <li key={item.to}>
            <a href={item.to}>{item.title}</a>
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
