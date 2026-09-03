import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PerspectiveCamera as PerspectiveCameraType } from 'three';
import { useNavigate, useLocation } from 'react-router-dom';
import MeteorModel from './models/MeteorModel';
import SatelliteModel from './models/SatelliteModel';
import ISSModel from './models/ISSModel';
import SpacemanModel from './models/SpacemanModel';
import SputnikModel from './models/SputnikModel';
import Navbar from './Navbar';
import { LangContext } from '../data/i18n';

const METEOR_SCALE = 2.5 * 3;

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

const ISSMenu = () => {
  const [highlightedSection, setHighlightedSection] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = React.useContext(LangContext);

  const hint = lang === 'en'
    ? 'Drag to rotate. Click objects to explore!'
    : 'Obracaj kamera myszka. Klikaj obiekty!';

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
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <ISSModel
              scale={2.5}
              highlighted={highlightedSection === 'about'}
              onPointerOver={() => setHighlightedSection('about')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => navigate('/about')}
            />
            <MeteorModel
              position={[185, 40, 30]}
              scale={METEOR_SCALE}
              rotation={[0, 0, 0]}
              highlighted={highlightedSection === 'skills'}
              onPointerOver={() => setHighlightedSection('skills')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => navigate('/skills')}
            />
            <SatelliteModel
              position={[-20, -80, 50]}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 5, 0]}
              highlighted={highlightedSection === 'projects'}
              onPointerOver={() => setHighlightedSection('projects')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => navigate('/projects')}
            />
            <SpacemanModel
              position={[40, 110, 80]}
              scale={METEOR_SCALE * 0.15}
              rotation={[0, Math.PI / 2 + Math.PI, 0]}
              highlighted={highlightedSection === 'education'}
              onPointerOver={() => setHighlightedSection('education')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => navigate('/education')}
            />
            <SputnikModel
              position={[10, 100, 60]}
              scale={METEOR_SCALE}
              rotation={[0, Math.PI / 3, 0]}
              highlighted={highlightedSection === 'experience'}
              onPointerOver={() => setHighlightedSection('experience')}
              onPointerOut={() => setHighlightedSection(null)}
              onClick={() => navigate('/experience')}
            />
            <OrbitControls enablePan enableZoom enableRotate />
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
        </div>
      )}
    </div>
  );
};

export default ISSMenu;
