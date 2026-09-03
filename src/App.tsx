import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./components/particles.json";
import particlesOptionsDark from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import { LangContext, type Lang, useT } from './data/i18n';
import NotFound from './components/NotFound';
import { useTheme } from './contexts/ThemeContext';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Navbar = lazy(() => import('./components/Navbar'));
const ISSMenu = lazy(() => import('./components/ISSMenu'));
const StarsCanvas = lazy(() => import('./components/StarCanvas'));

const AppContent = () => {
  const t = useT();
  const { darkMode } = useTheme();
  useDocumentTitle();

  const [init, setInit] = useState(false);
  const [,setShowISSMenu] = useState(() => {
    return !!sessionStorage.getItem('splashShown');
  });
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });

  useEffect(() => {
    if (!init) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [init]);

  return (
    <>
      <a href="#hero" className="skip-link">{t.app.skipLink}</a>
      <div className="app-root">
        {init && <Particles options={(darkMode ? particlesOptions : particlesOptionsDark) as unknown as RecursivePartial<IOptions>} />}
        <Suspense fallback={<div className="loader">{t.app.loading}</div>}>
        {showSplash ? (
          <StarsCanvas key="splash" onSplashEnd={() => {
            setShowSplash(false);
            sessionStorage.setItem('splashShown', '1');
            setShowISSMenu(true);
          }} />
        ) : (
          <Routes>
            <Route path="/" element={<ISSMenu />} />
            <Route path="/about" element={<><Navbar /><main><About /></main></>} />
            <Route path="/experience" element={<><Navbar /><main><Experience /></main></>} />
            <Route path="/projects" element={<><Navbar /><main><Projects /></main></>} />
            <Route path="/education" element={<><Navbar /><main><Education /></main></>} />
            <Route path="/skills" element={<><Navbar /><main><Skills /></main></>} />
            <Route path="*" element={<><Navbar /><main><Suspense fallback={<div className="loader">{t.app.loading}</div>}><NotFound /></Suspense></main></>} />
          </Routes>
        )}
        </Suspense>
      </div>
    </>
  );
};

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'en' ? 'en' : 'pl';
  });

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <AppContent />
    </LangContext.Provider>
  );
}

export default App;
