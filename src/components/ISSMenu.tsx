import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';

// Import typu z drei/three
import { PerspectiveCamera as PerspectiveCameraType } from 'three';

function ISSModel(props: Record<string, unknown>) {
  const { scene } = useGLTF('/assets/la_station_spatiale_internationale_iss/scene.gltf');
  return <primitive object={scene} {...props} />;
}

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

const ISSMenu: React.FC = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #12002b 0%, #000 100%)', zIndex: 10 }}>
      <Canvas shadows>
        <AnimatedCamera />
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <ISSModel scale={2.5} />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
      {/* Tu można dodać interaktywne menu na overlay */}
    </div>
  );
};

export default ISSMenu;
