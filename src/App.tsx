import { useState, useEffect } from 'react';
import './App.css';
import ParticlesBG from './components/ParticlesBG';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';

function App() {
  // Dark mode state (auto-detect system preference)
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}>
      <ParticlesBG />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
      </main>
    </div>
  );
}

export default App;
