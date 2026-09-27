import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, useGLTF } from "@react-three/drei";
// @ts-expect-error no types
import * as random from "maath/random/dist/maath-random.esm";
import type { Points as PointsImpl } from "@react-three/drei";
import { SPACE_OBJECTS } from "../data/spaceObjects";
import { useMode } from "../contexts/useMode";
import { useT } from "../data/i18n";

export const StarBackground = (props: Record<string, unknown>) => {
  const ref = useRef<React.ElementRef<typeof PointsImpl>>(null);
  // Length must be a multiple of 3 (x,y,z per point) or the last point is
  // partially written, producing a NaN vertex.
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }));

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const MODEL_PATHS = SPACE_OBJECTS.map((o) => o.modelPath);

interface GltfJson {
  buffers?: { uri?: string }[];
  images?: { uri?: string }[];
}

async function fetchGltfWithDependencies(path: string): Promise<void> {
  const res = await fetch(path);
  const json: GltfJson = await res.json();
  const base = path.slice(0, path.lastIndexOf('/') + 1);
  const uris = new Set<string>();
  [...(json.buffers ?? []), ...(json.images ?? [])].forEach((entry) => {
    if (entry.uri && !entry.uri.startsWith('data:')) uris.add(entry.uri);
  });
  await Promise.all([...uris].map((uri) => fetch(base + decodeURIComponent(uri)).catch(() => undefined)));
}

/** Share of the 3D models (with their buffers and textures) already downloaded, from 0 to 1. */
function usePreloadModels(paths: string[]) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    let isMounted = true;
    paths.forEach((path) => {
      useGLTF.preload(path);
      fetchGltfWithDependencies(path)
        .catch(() => undefined)
        .then(() => {
          if (isMounted) setDone((count) => count + 1);
        });
    });
    return () => {
      isMounted = false;
    };
  }, [paths]);
  return paths.length === 0 ? 1 : done / paths.length;
}

const StarSplash: React.FC<{ onFadeOut: () => void }> = ({ onFadeOut }) => {
  const t = useT();
  const [progress, setProgress] = useState(0);
  const [quote] = useState(() => {
    const quotes = t.app.splashQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  });
  const [fadeOut, setFadeOut] = useState(false);
  const loaded = usePreloadModels(MODEL_PATHS);

  // The counter eases towards the real download share instead of running on a fixed timer.
  useEffect(() => {
    let frame: number;
    const target = loaded * 100;
    function animate() {
      setProgress((value) => {
        const next = value + Math.max(0.4, (target - value) * 0.08);
        return Math.min(target, next);
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [loaded]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setFadeOut(true), 400);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => onFadeOut(), 500);
      return () => clearTimeout(timer);
    }
  }, [fadeOut, onFadeOut]);

  return (
    <div
      className="star-splash"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #12002b 0%, #000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }} style={{position: 'absolute', inset: 0}}>
        <StarBackground />
        <Preload all />
      </Canvas>
      <div style={{position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '2.5rem',
          color: '#fff',
          textShadow: '0 0 16px #4fc3f7, 0 0 32px #1976d2',
          letterSpacing: '0.1em',
          marginBottom: '1.2rem',
          userSelect: 'none',
          minWidth: 120,
          textAlign: 'center',
        }}>{Math.round(progress)}%</span>
        <span style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.1rem',
          color: '#b3e5fc',
          textShadow: '0 0 8px #000',
          marginTop: '0.5rem',
          textAlign: 'center',
          maxWidth: 320,
        }}>{quote}</span>
        <button type="button" className="splash-skip" onClick={() => setFadeOut(true)}>
          {t.app.skipSplash}
        </button>
      </div>
    </div>
  );
};

const StarsCanvas = ({ onSplashEnd }: { onSplashEnd?: () => void }) => {
  const { mode } = useMode();
  const [showSplash, setShowSplash] = useState(mode === 'wow');

  useEffect(() => {
    if (!showSplash && onSplashEnd) onSplashEnd();
  }, [showSplash, onSplashEnd]);

  return showSplash ? (
    <StarSplash onFadeOut={() => setShowSplash(false)} />
  ) : (
    <div className="star-background" style={{position: 'fixed', inset: 0, zIndex: -2}}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarBackground />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
