import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// Import typu z drei/three
import { PerspectiveCamera as PerspectiveCameraType } from 'three';
import MeteorModel from './models/MeteorModel';
import SatelliteModel from './models/SatelliteModel';
import ISSModel from './models/ISSModel';
import SpacemanModel from './models/SpacemanModel';

const AnimatedCamera = () => {
  const ref = useRef<PerspectiveCameraType>(null);
  const startZ = 10;
  const endZ = 450;
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
      // Synchronizuj kamerę z OrbitControls
      state.camera.position.set(0, 0, z);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={ref} makeDefault position={[0, 0, startZ]} fov={40} />;
};

const METEOR_SCALE = 2.5 * 4;

const ISSMenu: React.FC = () => {
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
        alignItems: 'center',
        justifyContent: 'center',
        // background: 'none', // brak tła
      }}
    >
      <div
        style={{
          width: '99vw',
          height: '99vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '2rem',
          boxShadow: '0 0 32px #000a',
          // Usunięto background, aby tło 3D było przezroczyste
        }}
      >
        <Canvas shadows style={{ width: '100%', height: '100%', background: 'transparent' }} gl={{ alpha: true }}>
          <AnimatedCamera />
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <ISSModel scale={2.5} />
          <MeteorModel position={[85, 40, 30]} scale={METEOR_SCALE} rotation={[0, 0, 0]} />
          <SatelliteModel position={[-30, -60, 50]} scale={METEOR_SCALE} rotation={[0, Math.PI / 5, 0]} />
          <SpacemanModel position={[40, 110, 80]} scale={METEOR_SCALE * 0.15} rotation={[0, Math.PI / 2 + Math.PI, 0]} />
          {/* Tutaj możesz dodać kolejne elementy 3D */}
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>
      {/* Tu można dodać interaktywne menu na overlay */}
    </div>
  );
};

export default ISSMenu;
