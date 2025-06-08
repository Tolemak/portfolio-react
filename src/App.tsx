import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import ISSMenu from './components/ISSMenu';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./components/particles.json";
import particlesOptionsDark from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import StarsCanvas from "./components/StarCanvas";
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import Navbar from './components/Navbar';
import { LangContext, type Lang } from './data/i18n';

function App() {
  // Dark mode state (auto-detect system preference)
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [init, setInit] = useState(false);
  const [,setShowISSMenu] = useState(() => {
    // ISSMenu (czyli scena 3D) pokazuje się tylko jeśli splash już był
    return !!sessionStorage.getItem('splashShown');
  });
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'en' ? 'en' : 'pl';
  });
  const location = useLocation();

  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [init]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    // Dynamic page titles (PL/EN)
    const titles: Record<string, { pl: string; en: string }> = {
      '/': {
        pl: 'Kamil Gałkowski – Portfolio',
        en: 'Kamil Gałkowski – Portfolio',
      },
      '/about': {
        pl: 'O mnie – Kamil Gałkowski',
        en: 'About Me – Kamil Gałkowski',
      },
      '/experience': {
        pl: 'Doświadczenie – Kamil Gałkowski',
        en: 'Experience – Kamil Gałkowski',
      },
      '/projects': {
        pl: 'Projekty – Kamil Gałkowski',
        en: 'Projects – Kamil Gałkowski',
      },
      '/education': {
        pl: 'Edukacja – Kamil Gałkowski',
        en: 'Education – Kamil Gałkowski',
      },
      '/skills': {
        pl: 'Umiejętności – Kamil Gałkowski',
        en: 'Skills – Kamil Gałkowski',
      },
    };
    const title = titles[location.pathname]?.[lang] || 'Kamil Gałkowski – Portfolio';
    document.title = title;
  }, [location.pathname, lang]);

  return (
    <>
      <a href="#hero" className="skip-link">Przejdź do treści</a>
      <LangContext.Provider value={lang}>
        <div className={`app-root${darkMode ? ' dark' : ''}`}>
          {/* USUŃ stary przycisk języka */}
          {/*
          <div style={{ position: 'fixed', top: 18, right: 18, zIndex: 2000 }}>
            <button
              onClick={() => setLang(l => l === 'pl' ? 'en' : 'pl')}
              style={{
                background: 'rgba(30,40,60,0.85)',
                color: '#fff',
                border: '1.5px solid #61dafb',
                borderRadius: '1.2em',
                padding: '0.4em 1.2em',
                fontWeight: 600,
                fontSize: '1em',
                cursor: 'pointer',
                marginRight: 8
              }}
              aria-label={lang === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
          </div>
          */}
          {init && <Particles options={(darkMode ? particlesOptions : particlesOptionsDark) as unknown as RecursivePartial<IOptions>} />}
          {/* Splash logic */}
          {showSplash ? (
            <StarsCanvas key="splash" onSplashEnd={() => {
              setShowSplash(false);
              sessionStorage.setItem('splashShown', '1');
              setShowISSMenu(true);
            }} />
          ) : (
            <Routes>
              <Route path="/" element={<ISSMenu darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />} />
              <Route path="/about" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><About /></>} />
              <Route path="/experience" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><Experience /></>} />
              <Route path="/projects" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><Projects /></>} />
              <Route path="/education" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><Education /></>} />
              <Route path="/skills" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><Skills /></>} />
            </Routes>
          )}
        </div>
      </LangContext.Provider>
    </>
  );
}

export default App;
