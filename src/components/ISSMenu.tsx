import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PerspectiveCamera as PerspectiveCameraType } from 'three';
import MeteorModel from './models/MeteorModel';
import SatelliteModel from './models/SatelliteModel';
import ISSModel from './models/ISSModel';
import SpacemanModel from './models/SpacemanModel';
import SputnikModel from './models/SputnikModel';
import Navbar from './Navbar';

const METEOR_SCALE = 2.5 * 3;

const AnimatedCamera = () => {
  const ref = useRef<PerspectiveCameraType>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const startZ = 10;
  const endZ = isMobile ? 850 : 450; // farther on mobile
  const duration = 3500;
  const startTime = useRef<number | null>(null);
  const finished = useRef(false);

  useFrame((state) => {
    if (!ref.current) return;
    if (finished.current) return;
    if (startTime.current === null) startTime.current = performance.now();
    const elapsed = performance.now() - startTime.current;
    const progress = Math.min(elapsed / duration, 1);
    const z = startZ + (endZ - startZ) * (1 - Math.pow(1 - progress, 2));
    ref.current.position.set(0, 0, z);
    ref.current.lookAt(0, 0, 0);
    if (progress >= 1) {
      finished.current = true;
      state.camera.position.set(0, 0, z);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0, startZ]} fov={40} />;
};

const ISSMenu = ({ darkMode, setDarkMode, lang, setLang }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; lang: 'pl' | 'en'; setLang: React.Dispatch<React.SetStateAction<'pl' | 'en'>> }) => {
  const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null);

  // Model hover handlers
  const handleModelHover = (section: string | null) => setHighlightedSection(section);

  // Navbar hover handlers
  const handleNavbarHover = (section: string | null) => setHighlightedSection(section);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '72px', // Added top padding equal to navbar height
        boxSizing: 'border-box',
      }}
    >
      <Navbar onSectionHover={handleNavbarHover} highlightedSection={highlightedSection} darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang} />
      {window.location.pathname === '/' && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-72px', // Adjusted margin to offset the top padding
            paddingTop: '72px',
            boxSizing: 'border-box',
          }}
        >
          <Canvas
            shadows
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            gl={{ alpha: true }}
          >
            <AnimatedCamera />
            <ambientLight intensity={1.6} />
            <directionalLight position={[10, 10, 10]} intensity={2.5} />
            <ISSModel
              scale={2.5}
              highlighted={highlightedSection === 'about'}
              onPointerOver={() => handleModelHover('about')}
              onPointerOut={() => handleModelHover(null)}
            />
            <MeteorModel
              position={[185, 40, 30]}
              scale={METEOR_SCALE}
              rotation={[0, 0, 0]}
              highlighted={highlightedSection === 'skills'}
              onPointerOver={() => handleModelHover('skills')}
              onPointerOut={() => handleModelHover(null)}
            />
            <SatelliteModel
              position={[-20, -80, 50]}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 5, 0]}
              highlighted={highlightedSection === 'projects'}
              onPointerOver={() => handleModelHover('projects')}
              onPointerOut={() => handleModelHover(null)}
            />
            <SpacemanModel
              position={[40, 110, 80]}
              scale={METEOR_SCALE * 0.15}
              rotation={[0, Math.PI / 2 + Math.PI, 0]}
              highlighted={highlightedSection === 'education'}
              onPointerOver={() => handleModelHover('education')}
              onPointerOut={() => handleModelHover(null)}
            />
            <SputnikModel
              position={[10, 100, 60]}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 3, 0]}
              highlighted={highlightedSection === 'experience'}
              onPointerOver={() => handleModelHover('experience')}
              onPointerOut={() => handleModelHover(null)}
            />
            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default ISSMenu;
