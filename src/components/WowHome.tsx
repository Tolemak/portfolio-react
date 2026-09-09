import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, PerspectiveCamera } from '@react-three/drei';
import { CatmullRomCurve3, Vector3, type PerspectiveCamera as PerspectiveCameraType } from 'three';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ISSModel from './models/ISSModel';
import MeteorModel from './models/MeteorModel';
import SatelliteModel from './models/SatelliteModel';
import SpacemanModel from './models/SpacemanModel';
import SputnikModel from './models/SputnikModel';
import { StarBackground } from './StarCanvas';
import Navbar from './Navbar';
import { useT } from '../data/i18n';
import { useTheme } from '../contexts/ThemeContext';
import { spaceObjectsInFlightOrder, getSectionPath, maxHitboxRadius, type SectionKey } from '../data/spaceObjects';

const WARP_DURATION_MS = 380;
const INTRO_DURATION_MS = 2600;
const WHEEL_SENSITIVITY = 1 / 420;
const TOUCH_SENSITIVITY = 1 / 260;
const PANEL_EPSILON = 0.16;

const MODEL_COMPONENTS: Record<SectionKey, React.ComponentType<Record<string, unknown>>> = {
  about: ISSModel,
  projects: SatelliteModel,
  experience: SputnikModel,
  education: SpacemanModel,
  skills: MeteorModel,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const SceneExposure = ({ exposure }: { exposure: number }) => {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    gl.toneMappingExposure = exposure;
  }, [gl, exposure]);
  return null;
};

interface FlightRigProps {
  targetRef: React.MutableRefObject<number>;
  progressRef: React.MutableRefObject<number>;
  curve: CatmullRomCurve3;
  lookAts: Vector3[];
  frozen: boolean;
  onStageChange: (stage: number) => void;
  onActiveChange: (stage: number | null) => void;
}

const FlightRig: React.FC<FlightRigProps> = ({
  targetRef,
  progressRef,
  curve,
  lookAts,
  frozen,
  onStageChange,
  onActiveChange,
}) => {
  const camRef = useRef<PerspectiveCameraType>(null);
  const introDone = useRef(prefersReducedMotion());
  const introStart = useRef<number | null>(null);
  const lastStage = useRef<number | null>(null);
  const lastActive = useRef<number | null>(null);
  const denom = Math.max(1, lookAts.length - 1);
  const reduced = useRef(prefersReducedMotion()).current;

  useFrame((_state, delta) => {
    const camera = camRef.current;
    if (!camera) return;

    if (!introDone.current) {
      if (introStart.current === null) introStart.current = performance.now();
      const elapsed = performance.now() - introStart.current;
      const t = Math.min(elapsed / INTRO_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      const start = new Vector3(0, 0, 10);
      const end = curve.getPoint(0);
      camera.position.lerpVectors(start, end, eased);
      camera.lookAt(lookAts[0]);
      if (t >= 1) introDone.current = true;
      return;
    }

    if (frozen) return;

    const lerpFactor = reduced ? 1 : Math.min(1, delta * 4.5);
    progressRef.current += (targetRef.current - progressRef.current) * lerpFactor;

    const t = clamp(progressRef.current / denom, 0, 1);
    const pos = curve.getPoint(t);
    camera.position.copy(pos);

    const i = clamp(Math.floor(progressRef.current), 0, lookAts.length - 2 >= 0 ? lookAts.length - 2 : 0);
    const frac = clamp(progressRef.current - i, 0, 1);
    const lookAt = new Vector3().lerpVectors(lookAts[i], lookAts[Math.min(i + 1, lookAts.length - 1)], frac);
    camera.lookAt(lookAt);

    const nearest = Math.round(progressRef.current);
    if (nearest !== lastStage.current) {
      lastStage.current = nearest;
      onStageChange(nearest);
    }

    const dist = Math.abs(progressRef.current - nearest);
    const active = dist < PANEL_EPSILON ? nearest : null;
    if (active !== lastActive.current) {
      lastActive.current = active;
      onActiveChange(active);
    }
  });

  return <PerspectiveCamera ref={camRef} makeDefault position={[0, 0, 10]} fov={40} />;
};

const WowHome = () => {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [warpTo, setWarpTo] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const t = useT();
  const { darkMode } = useTheme();

  const ordered = useMemo(() => spaceObjectsInFlightOrder(), []);
  const targetRef = useRef(0);
  const progressRef = useRef(0);

  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        ordered.map((o) => new Vector3(...o.cameraPosition)),
        false,
        'catmullrom',
        0.5,
      ),
    [ordered],
  );
  const lookAts = useMemo(
    () => ordered.map((o) => new Vector3(...(o.cameraLookAt ?? o.position))),
    [ordered],
  );

  const handleSelect = (path: string) => {
    if (warpTo) return;
    setWarpTo(path);
  };

  useEffect(() => {
    if (!warpTo) return;
    const timer = setTimeout(() => navigate(warpTo), WARP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [warpTo, navigate]);

  const stepTo = (stage: number) => {
    targetRef.current = clamp(stage, 0, ordered.length - 1);
  };
  const step = (delta: number) => stepTo(Math.round(targetRef.current) + delta);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (warpTo) return;
      if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warpTo, location.pathname]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // React's synthetic onWheel is passive, so preventDefault() there is a no-op.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (warpTo) return;
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + e.deltaY * WHEEL_SENSITIVITY, 0, ordered.length - 1);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [warpTo, ordered.length]);

  const touchStartY = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (warpTo || touchStartY.current === null) return;
    const y = e.touches[0]?.clientY ?? touchStartY.current;
    const delta = touchStartY.current - y;
    touchStartY.current = y;
    targetRef.current = clamp(targetRef.current + delta * TOUCH_SENSITIVITY, 0, ordered.length - 1);
  };
  const onTouchEnd = () => {
    touchStartY.current = null;
  };

  const hint = t.wow.hint;

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
          ref={wrapperRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '-72px',
            paddingTop: '72px',
            boxSizing: 'border-box',
            touchAction: 'none',
          }}
        >
          <Canvas
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          >
            <SceneExposure exposure={darkMode ? 1.5 : 1.25} />
            <StarBackground />
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

            <FlightRig
              targetRef={targetRef}
              progressRef={progressRef}
              curve={curve}
              lookAts={lookAts}
              frozen={!!warpTo}
              onStageChange={setCurrentStage}
              onActiveChange={setActiveStage}
            />

            {ordered.map((obj, i) => {
              const Model = MODEL_COMPONENTS[obj.key];
              return (
                <Model
                  key={obj.key}
                  position={obj.position}
                  rotation={obj.rotation}
                  scale={obj.scale}
                  maxHitboxRadius={maxHitboxRadius(obj.position)}
                  highlighted={highlightedSection === obj.key || activeStage === i}
                  onPointerOver={() => setHighlightedSection(obj.key)}
                  onPointerOut={() => setHighlightedSection(null)}
                  onClick={() => stepTo(i)}
                />
              );
            })}

            <AnimatePresence>
              {activeStage !== null && (
                <Html key={ordered[activeStage].key} position={lookAts[activeStage].toArray()} center occlude={false}>
                  <motion.div
                    className="wow-panel glass fancy-card"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3>{t.navbar[ordered[activeStage].key]}</h3>
                    <p>{t.wow.teasers[ordered[activeStage].key]}</p>
                    <button
                      className="wow-enter-btn"
                      onClick={() => handleSelect(getSectionPath(ordered[activeStage].key))}
                    >
                      {t.wow.enter}
                    </button>
                  </motion.div>
                </Html>
              )}
            </AnimatePresence>
          </Canvas>

          <div className="wow-hint glass">🖱️ {hint}</div>

          <div className="wow-controls">
            <button
              className="wow-nav-btn"
              onClick={() => step(-1)}
              aria-label={t.wow.prev}
              disabled={currentStage === 0}
            >
              ‹
            </button>
            <div className="wow-dots" role="tablist" aria-label={t.wow.jumpTo}>
              {ordered.map((obj, i) => (
                <button
                  key={obj.key}
                  className={`wow-dot${currentStage === i ? ' active' : ''}`}
                  onClick={() => stepTo(i)}
                  aria-label={t.navbar[obj.key]}
                  role="tab"
                  aria-selected={currentStage === i}
                />
              ))}
            </div>
            <button
              className="wow-nav-btn"
              onClick={() => step(1)}
              aria-label={t.wow.next}
              disabled={currentStage === ordered.length - 1}
            >
              ›
            </button>
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

export default WowHome;
