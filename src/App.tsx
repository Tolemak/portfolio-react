import { useState, useEffect } from 'react';
import './App.css';
import ISSMenu from './components/ISSMenu';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particlesOptions from "./components/particles.json";
import particlesOptionsDark from "./components/particles.dark.json";
import type { IOptions, RecursivePartial } from '@tsparticles/engine';
import StarsCanvas from "./components/StarCanvas";

function App() {
  // Dark mode state (auto-detect system preference)
  const [darkMode] = useState(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [init, setInit] = useState(false);
  const [showISSMenu, setShowISSMenu] = useState(false);

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

  return (
    <div className={`app-root${darkMode ? ' dark' : ''}`}>
      {init && <Particles options={(darkMode ? particlesOptions : particlesOptionsDark) as unknown as RecursivePartial<IOptions>} />}
      {/* Splash + ISSMenu logic */}
      {showISSMenu ? (
        <ISSMenu />
      ) : (
        <StarsCanvas onSplashEnd={() => setShowISSMenu(true)} />
      )}
    </div>
  );
}

export default App;
