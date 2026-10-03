import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { DoubleSide, Quaternion, Vector3, type Group, type Mesh } from 'three';
import type { ProjectItem } from '../../data/projects';
import {
  RING_SCALE,
  orbitPosition,
  planetsWithProjects,
  type ProjectPlanet,
} from '../../data/projectPlanets';
import { paintSurface } from './planetSurfaces';
import { useProjectText } from './projectText';

const SELF_ROTATION = 0.18;
/** Planets move, so they catch the pointer a little outside their surface. */
const HIT_SCALE = 1.8;
/** How far the orbit plane leans sideways from facing the camera; some lean keeps the depth. */
const ORBIT_LEAN = 0.55;

/** Turns the flat orbit plane towards the viewer, then leans it so planets pass in front of and behind the satellite. */
function orbitOrientation(center: readonly number[], viewer: readonly number[]): Quaternion {
  const facing = new Vector3(viewer[0] - center[0], viewer[1] - center[1], viewer[2] - center[2]).normalize();
  const side = new Vector3().crossVectors(facing, new Vector3(0, 1, 0)).normalize();
  const normal = facing.addScaledVector(side, ORBIT_LEAN).normalize();
  return new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), normal);
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const seedOf = (slug: string) => [...slug].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) % 100000, 7);


interface PlanetProps {
  planet: ProjectPlanet;
  project: ProjectItem;
  elapsed: React.MutableRefObject<number>;
  selected: boolean;
  hovered: boolean;
  onHover: (hovered: boolean) => void;
  onSelect: () => void;
}

function Planet({ planet, project, elapsed, selected, hovered, onHover, onSelect }: PlanetProps) {
  const group = useRef<Group>(null);
  const body = useRef<Mesh>(null);
  const text = useProjectText(project);
  const textures = useMemo(() => paintSurface(planet.surface, seedOf(planet.slug)), [planet]);
  const reduced = useRef(prefersReducedMotion()).current;

  useEffect(
    () => () => {
      textures.map.dispose();
      textures.emissiveMap?.dispose();
    },
    [textures],
  );

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = 'pointer';
    return () => {
      document.body.style.cursor = '';
    };
  }, [hovered]);

  useFrame((_state, delta) => {
    const [x, y, z] = orbitPosition(planet, elapsed.current);
    group.current?.position.set(x, y, z);
    if (body.current && !reduced) body.current.rotation.y += delta * SELF_ROTATION;
    const target = hovered || selected ? 1.18 : 1;
    const scale = group.current?.scale.x ?? 1;
    group.current?.scale.setScalar(scale + (target - scale) * Math.min(1, delta * 6));
  });

  const stop = (handler: () => void) => (e: ThreeEvent<PointerEvent | MouseEvent>) => {
    e.stopPropagation();
    handler();
  };

  return (
    <group ref={group}>
      <mesh onPointerOver={stop(() => onHover(true))} onPointerOut={stop(() => onHover(false))} onClick={stop(onSelect)}>
        <sphereGeometry args={[planet.radius * HIT_SCALE, 16, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={body} raycast={() => undefined}>
        <sphereGeometry args={[planet.radius, 48, 32]} />
        <meshStandardMaterial
          map={textures.map}
          emissiveMap={textures.emissiveMap ?? null}
          emissive={textures.emissiveMap ? '#ffffff' : '#000000'}
          emissiveIntensity={textures.emissiveIntensity}
          roughness={textures.roughness}
          metalness={0}
        />
      </mesh>
      {planet.ring && (
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
          <ringGeometry args={[planet.radius * 1.35, planet.radius * RING_SCALE, 96]} />
          <meshBasicMaterial color="#b48cff" transparent opacity={0.5} side={DoubleSide} depthWrite={false} />
        </mesh>
      )}
      {(hovered || selected) && (
        <Html center position={[0, planet.radius * 1.9, 0]} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <span className="planet-label" style={{ ['--planet-color' as string]: project.color }}>
            {text.name}
          </span>
        </Html>
      )}
    </group>
  );
}

/** A small warm star in the middle, lighting the planets from inside the system. */
function Star() {
  return (
    <group>
      <mesh raycast={() => undefined}>
        <sphereGeometry args={[2.4, 48, 32]} />
        <meshBasicMaterial color="#ffe4a8" />
      </mesh>
      <mesh raycast={() => undefined}>
        <sphereGeometry args={[3.6, 32, 24]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <pointLight color="#ffd9a0" intensity={900} distance={60} decay={2} />
    </group>
  );
}

function OrbitLine({ radius, color }: { radius: number; color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.04, radius + 0.04, 160]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} side={DoubleSide} depthWrite={false} />
    </mesh>
  );
}

export interface ProjectPlanetsProps {
  center: readonly [number, number, number];
  /** Where the camera stands at the projects stop; the orbits turn towards it. */
  viewer: readonly [number, number, number];
  /** Shrinks the whole system, so it fits between the station, the panel and the controls. */
  scale?: number;
  /** Slug of the project open in the side panel; the system holds still while one is open. */
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

/** The projects as a small planetary system around a star, out in open space past the satellite. */
export default function ProjectPlanets({ center, viewer, scale = 1, selected, onSelect }: ProjectPlanetsProps) {
  const pairs = useMemo(planetsWithProjects, []);
  const orientation = useMemo(() => orbitOrientation(center, viewer), [center, viewer]);
  const elapsed = useRef(0);
  const reduced = useRef(prefersReducedMotion()).current;
  const [hovered, setHovered] = useState<string | null>(null);

  // The system holds still under the pointer and while a project is open, so planets stay clickable.
  useFrame((_state, delta) => {
    if (!selected && !hovered && !reduced) elapsed.current += delta;
  });

  return (
    <group position={center as [number, number, number]} quaternion={orientation} scale={scale}>
      <Star />
      {pairs.map(({ planet, project }) => (
        <OrbitLine key={`orbit-${planet.slug}`} radius={planet.orbit} color={project.color} />
      ))}
      {pairs.map(({ planet, project }) => (
        <Planet
          key={planet.slug}
          planet={planet}
          project={project}
          elapsed={elapsed}
          selected={selected === planet.slug}
          hovered={hovered === planet.slug}
          onHover={(over) => setHovered((current) => (over ? planet.slug : current === planet.slug ? null : current))}
          onSelect={() => onSelect(selected === planet.slug ? null : planet.slug)}
        />
      ))}
    </group>
  );
}
