import { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';
import './App.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptionsWhite from "./components/particles.json";
import particlesOptionsPurple from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import { LangContext, type Lang, useT } from './data/i18n';
import NotFound from './components/NotFound';
import PageTransition from './components/PageTransition';
import ErrorBoundary from './components/ErrorBoundary';
import { lazyWithRetry } from './utils/lazyWithRetry';
import { useTheme } from './contexts/useTheme';
import { useMode } from './contexts/useMode';
import { useDocumentTitle } from './hooks/useDocumentTitle';

const About = lazyWithRetry(() => import('./components/About'), 'about');
const Experience = lazyWithRetry(() => import('./components/Experience'), 'experience');
const Projects = lazyWithRetry(() => import('./components/Projects'), 'projects');
const Education = lazyWithRetry(() => import('./components/Education'), 'education');
const Skills = lazyWithRetry(() => import('./components/Skills'), 'skills');
const Navbar = lazyWithRetry(() => import('./components/Navbar'), 'navbar');
const WowHome = lazyWithRetry(() => import('./components/WowHome'), 'wowhome');
const ClassicHome = lazyWithRetry(() => import('./components/ClassicHome'), 'classichome');
const StarsCanvas = lazyWithRetry(() => import('./components/StarCanvas'), 'starcanvas');

const AppContent = () => {
  const t = useT();
  const { darkMode } = useTheme();
  const { mode } = useMode();
  const location = useLocation();
  useDocumentTitle();

  const [init, setInit] = useState(false);
  const [showSplash, setShowSplash] = useState(mode === 'wow');

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
      <a href="#main-content" className="skip-link">{t.app.skipLink}</a>
      <div className="app-root" id="main-content">
        {init && <Particles options={(darkMode ? particlesOptionsWhite : particlesOptionsPurple) as unknown as RecursivePartial<IOptions>} />}
        <ErrorBoundary>
        <Suspense fallback={<div className="loader">{t.app.loading}</div>}>
        {showSplash ? (
          <StarsCanvas key="splash" onSplashEnd={() => {
            setShowSplash(false);
            sessionStorage.setItem('splashShown', '1');
          }} />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={mode === 'wow' ? <WowHome /> : <ClassicHome />} />
              <Route path="/about" element={<><Navbar /><PageTransition><About /></PageTransition></>} />
              <Route path="/experience" element={<><Navbar /><PageTransition><Experience /></PageTransition></>} />
              <Route path="/projects" element={<><Navbar /><PageTransition><Projects /></PageTransition></>} />
              <Route path="/education" element={<><Navbar /><PageTransition><Education /></PageTransition></>} />
              <Route path="/skills" element={<><Navbar /><PageTransition><Skills /></PageTransition></>} />
              <Route path="*" element={<><Navbar /><PageTransition><Suspense fallback={<div className="loader">{t.app.loading}</div>}><NotFound /></Suspense></PageTransition></>} />
            </Routes>
          </AnimatePresence>
        )}
        </Suspense>
        </ErrorBoundary>
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
    <MotionConfig reducedMotion="user">
      <LangContext.Provider value={{ lang, setLang }}>
        <AppContent />
      </LangContext.Provider>
    </MotionConfig>
  );
}

export default App;
