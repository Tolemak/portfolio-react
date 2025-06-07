import { useState, useEffect } from 'react';
import './App.css';
import ISSMenu from './components/ISSMenu';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./components/particles.json";
import particlesOptionsDark from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import StarsCanvas from "./components/StarCanvas";
import About from './components/About';

function App() {
  // Dark mode state (auto-detect system preference)
  const [darkMode, setDarkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [init, setInit] = useState(false);
  const [showISSMenu, setShowISSMenu] = useState(() => {
    // ISSMenu (czyli scena 3D) pokazuje się tylko jeśli splash już był
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (!showSplash) return;
    // Po zakończeniu splash, ustaw flagę w sessionStorage
    if (init && !showISSMenu) {
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', '1');
        setShowISSMenu(true);
      }, 2000); // lub czas trwania animacji ładowania
    }
  }, [init, showISSMenu, showSplash]);

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}>
      {init && <Particles options={(darkMode ? particlesOptions : particlesOptionsDark) as unknown as RecursivePartial<IOptions>} />}
      {/* Splash + ISSMenu logic */}
      {showSplash ? (
        <StarsCanvas key="splash" onSplashEnd={() => {
          setShowSplash(false);
          sessionStorage.setItem('splashShown', '1');
          setShowISSMenu(true);
        }} />
      ) : (
        showISSMenu && <ISSMenu darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      {/* About section always available for /about route */}
      {/* Routing logic for About (simple version) */}
      {window.location.pathname === '/about' && <About />}
    </div>
  );
}

export default App;
