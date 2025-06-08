import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, useGLTF } from "@react-three/drei";
// @ts-expect-error: maath has no types, but works fine for random.inSphere
import * as random from "maath/random/dist/maath-random.esm";
import type { Points as PointsImpl } from "@react-three/drei";

const StarBackground = (props: Record<string, unknown>) => {
  const ref = useRef<React.ElementRef<typeof PointsImpl>>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

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

const BOMBA_QUOTES = [
  "To nie są ćwiczenia, to jest wojna!",
  "Panie admirale, mamy kontakt z wrogiem!",
  "Zgłaszam gotowość do startu, panie kapitanie!",
  "Wszyscy na pokład, lecimy na bombę!",
  "Niech moc będzie z nami, a reszta niech się schowa!",
  "Czas na galaktyczną rozwałkę!",
  "Paliwo? Po co nam paliwo, mamy fantazję!",
  "W kosmosie nikt nie usłyszy twojego krzyku... chyba że jesteś Bombą!",
  "Zawsze chciałem być astronautą, a zostałem kapitanem!",
  "Houston, mamy imprezę!",
  "Nie ma rzeczy niemożliwych, są tylko mało wybuchowe!",
  "Kto nie ryzykuje, ten nie leci na bombę!",
  "Cisza przed burzą, czyli czas na drzemkę.",
  "W galaktyce nie ma przypadków, są tylko niecelne strzały!",
  "Zapasowe majtki to podstawa każdej misji!",
  "Nie pytaj co galaktyka może zrobić dla ciebie, tylko co ty możesz wysadzić dla galaktyki!",
  "Wolę wybuchy od nudy!",
  "Gdyby nie grawitacja, już dawno bym odleciał!",
  "W kosmosie nie ma świateł na skrzyżowaniach, więc gaz do dechy!",
  "Nie ma awarii, są tylko nieplanowane eksplozje!",
  "Moja rakieta, moje zasady!",
  "Kto rano wstaje, ten szybciej leci na bombę!",
  "Nie ufam komputerom, wolę dynamit!",
  "Wszystko jest możliwe, jeśli masz wystarczająco dużo prochu!"
];

// Preload all ISSMenu models
const MODEL_PATHS = [
  '/models/la_station_spatiale_internationale_iss/scene.gltf',
  '/models/meteor/scene.gltf',
  '/models/satelite/scene.gltf',
  '/models/spaceman/scene.gltf',
  '/models/sputnik_1/scene.gltf',
];

function usePreloadModels(paths: string[]) {
  // Returns true if all models are loaded
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    paths.forEach((path) => {
      useGLTF.preload(path);
      fetch(path)
        .then(() => {
          loadedCount++;
          if (loadedCount === paths.length && isMounted) setLoaded(true);
        })
        .catch(() => {
          loadedCount++;
          if (loadedCount === paths.length && isMounted) setLoaded(true);
        });
    });
    return () => {
      isMounted = false;
    };
  }, [paths]);
  return loaded;
}

// Fade-out splash screen with callback
const StarSplash: React.FC<{ onFadeOut: () => void }> = ({ onFadeOut }) => {
  const [progress, setProgress] = useState(0);
  const [quote] = useState(() => BOMBA_QUOTES[Math.floor(Math.random() * BOMBA_QUOTES.length)]);
  const [fadeOut, setFadeOut] = useState(false);
  const modelsLoaded = usePreloadModels(MODEL_PATHS);
  const minDuration = 5000; // 5s
  const fakeMax = 90; // %

  // Fake progress: 0-90% in 5s, then wait for models
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    function animate(ts: number) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      if (elapsed < minDuration) {
        // Fake progress
        const value = (elapsed / minDuration) * fakeMax;
        setProgress(value);
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(fakeMax);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // After fake progress, if models not loaded, progress to 100% slowly
  useEffect(() => {
    let frame: number;
    if (progress >= fakeMax && !modelsLoaded) {
      let value = fakeMax;
      function animate() {
        value += 0.5; // slow step
        setProgress(Math.min(100, value));
        if (value < 100 && !modelsLoaded) {
          frame = requestAnimationFrame(animate);
        }
      }
      frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, [progress, modelsLoaded]);

  // When both: min 5s passed (progress >= 90) AND modelsLoaded, finish to 100% and fade out
  useEffect(() => {
    if (progress >= fakeMax && modelsLoaded) {
      setProgress(100);
      const timer = setTimeout(() => setFadeOut(true), 400); // short pause for 100%
      return () => clearTimeout(timer);
    }
  }, [progress, modelsLoaded]);

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
      </div>
    </div>
  );
};

const StarsCanvas = ({ onSplashEnd }: { onSplashEnd?: () => void }) => {
  const [showSplash, setShowSplash] = useState(true);

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
