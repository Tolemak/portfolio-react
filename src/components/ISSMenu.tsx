import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PerspectiveCamera as PerspectiveCameraType } from 'three';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import MeteorModel from './models/MeteorModel';
import SatelliteModel from './models/SatelliteModel';
import ISSModel from './models/ISSModel';
import SpacemanModel from './models/SpacemanModel';
import SputnikModel from './models/SputnikModel';
import Navbar from './Navbar';
import { LangContext } from '../data/i18n';
import { useTheme } from '../contexts/ThemeContext';
import { getSectionPath } from '../data/issMenuSections';

const METEOR_SCALE = 2.5 * 3;
const WARP_DURATION_MS = 380;

const OBJECT_POSITIONS = {
  iss: [0, 0, 0],
  meteor: [185, 40, 30],
  satellite: [-20, -80, 50],
  spaceman: [40, 110, 80],
  sputnik: [10, 100, 60],
} as const satisfies Record<string, [number, number, number]>;

function maxHitboxRadius(pos: readonly [number, number, number]): number {
  const others = Object.values(OBJECT_POSITIONS).filter((p) => p !== pos);
  const nearest = Math.min(...others.map(([x, y, z]) => Math.hypot(pos[0] - x, pos[1] - y, pos[2] - z)));
  return (nearest / 2) * 0.9;
}

const AnimatedCamera = () => {
  const ref = useRef<PerspectiveCameraType>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const startZ = 10;
  const endZ = isMobile ? 850 : 450;
  const duration = 3500;
  const startTime = useRef<number | null>(null);
  const finished = useRef(false);

  useFrame((state) => {
    if (!ref.current || finished.current) return;
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

const SceneExposure = ({ exposure }: { exposure: number }) => {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    gl.toneMappingExposure = exposure;
  }, [gl, exposure]);
  return null;
};

const ISSMenu = () => {
  const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null);
  const [warpTo, setWarpTo] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = React.useContext(LangContext);
  const { darkMode } = useTheme();

  const hint = lang === 'en'
    ? 'Drag to rotate. Click objects to explore!'
    : 'Obracaj kamera myszka. Klikaj obiekty!';

  const handleSelect = (path: string) => {
    if (warpTo) return;
    setWarpTo(path);
  };

  useEffect(() => {
    if (!warpTo) return;
    const timer = setTimeout(() => navigate(warpTo), WARP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [warpTo, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
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
        paddingTop: '72px',
        boxSizing: 'border-box',
      }}
    >
      <Navbar onSectionHover={setHighlightedSection} highlightedSection={highlightedSection} />
      {location.pathname === '/' && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-72px',
            paddingTop: '72px',
            boxSizing: 'border-box',
          }}
        >
          <Canvas
            dpr={[1, 1.5]}
            gl={{ alpha: true, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          >
            <AnimatedCamera />
            <SceneExposure exposure={darkMode ? 1.5 : 1.25} />
            <hemisphereLight
              args={[darkMode ? '#4a5a8a' : '#ffffff', darkMode ? '#05070d' : '#c7d2e0', darkMode ? 1.4 : 1.1]}
            />
            <ambientLight intensity={darkMode ? 1.4 : 1} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={darkMode ? 4 : 3.2}
              color={darkMode ? '#dce8ff' : '#fff3e0'}
            />
            <directionalLight
              position={[-12, -6, -8]}
              intensity={darkMode ? 1.4 : 1}
              color={darkMode ? '#818cf8' : '#6366f1'}
            />
            <ISSModel
              position={OBJECT_POSITIONS.iss}
              maxHitboxRadius={maxHitboxRadius(OBJECT_POSITIONS.iss)}
              scale={2.5}
              highlighted={highlightedSection === 'about'}
              onPointerOver={() => setHighlightedSection('about')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => handleSelect(getSectionPath('about'))}
            />
            <MeteorModel
              position={OBJECT_POSITIONS.meteor}
              maxHitboxRadius={maxHitboxRadius(OBJECT_POSITIONS.meteor)}
              scale={METEOR_SCALE}
              rotation={[0, 0, 0]}
              highlighted={highlightedSection === 'skills'}
              onPointerOver={() => setHighlightedSection('skills')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => handleSelect(getSectionPath('skills'))}
            />
            <SatelliteModel
              position={OBJECT_POSITIONS.satellite}
              maxHitboxRadius={maxHitboxRadius(OBJECT_POSITIONS.satellite)}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 5, 0]}
              highlighted={highlightedSection === 'projects'}
              onPointerOver={() => setHighlightedSection('projects')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => handleSelect(getSectionPath('projects'))}
            />
            <SpacemanModel
              position={OBJECT_POSITIONS.spaceman}
              maxHitboxRadius={maxHitboxRadius(OBJECT_POSITIONS.spaceman)}
              scale={METEOR_SCALE * 0.15}
              rotation={[0, Math.PI / 2 + Math.PI, 0]}
              highlighted={highlightedSection === 'education'}
              onPointerOver={() => setHighlightedSection('education')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => handleSelect(getSectionPath('education'))}
            />
            <SputnikModel
              position={OBJECT_POSITIONS.sputnik}
              maxHitboxRadius={maxHitboxRadius(OBJECT_POSITIONS.sputnik)}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 3, 0]}
              highlighted={highlightedSection === 'experience'}
              onPointerOver={() => setHighlightedSection('experience')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => handleSelect(getSectionPath('experience'))}
            />
            <OrbitControls enablePan enableZoom enableRotate enableDamping dampingFactor={0.08} enabled={!warpTo} />
          </Canvas>
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: '#fff',
              padding: '8px 24px',
              borderRadius: '24px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              pointerEvents: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              opacity: 0.8,
              whiteSpace: 'nowrap',
            }}
          >
            🖱️ {hint}
          </div>
          <AnimatePresence>
            {warpTo && (
              <motion.div
                className="iss-warp-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: WARP_DURATION_MS / 1000 }}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default ISSMenu;
