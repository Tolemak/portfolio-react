import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./components/particles.json";
import particlesOptionsDark from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import { LangContext, type Lang } from './data/i18n';
import NotFound from './components/NotFound';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Navbar = lazy(() => import('./components/Navbar'));
const ISSMenu = lazy(() => import('./components/ISSMenu'));
const StarsCanvas = lazy(() => import('./components/StarCanvas'));

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [init, setInit] = useState(false);
  const [,setShowISSMenu] = useState(() => {
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
          {init && <Particles options={(darkMode ? particlesOptions : particlesOptionsDark) as unknown as RecursivePartial<IOptions>} />}
          <Suspense fallback={<div className="loader">Ładowanie...</div>}>
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
              <Route path="*" element={<><Navbar darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} /><Suspense fallback={<div className="loader">Ładowanie...</div>}><NotFound /></Suspense></>} />
            </Routes>
          )}
          </Suspense>
        </div>
      </LangContext.Provider>
    </>
  );
}

export default App;
