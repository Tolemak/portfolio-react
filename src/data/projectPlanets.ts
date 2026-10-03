import { projects } from './projects';

/**
 * How a project looks as a planet in the WOW scene. Each surface borrows the identity of the app
 * itself: the squared notebook of Mathema, CryptoPulse's LED rate board, the cutting mat of
 * File Actions, the layers of the Lecture API, the seismograph paper of Faultline.
 */
/** Middle of the planetary system, out past the projects satellite, away from the station. */
export const PLANET_SYSTEM_CENTER: readonly [number, number, number] = [-38, -134, 82];

export type PlanetSurface = 'notebook' | 'led' | 'mat' | 'strata' | 'craters' | 'nebula' | 'seismograph';

export interface ProjectPlanet {
  slug: string;
  surface: PlanetSurface;
  /** Planet radius in scene units. */
  radius: number;
  /** Distance from the projects satellite. */
  orbit: number;
  /** Starting angle on the orbit, in radians. */
  phase: number;
  /** Radians per second; negative values orbit the other way. */
  speed: number;
  ring?: boolean;
}

export const PROJECT_PLANETS: readonly ProjectPlanet[] = [
  { slug: 'mathema', surface: 'notebook', radius: 1.15, orbit: 5.4, phase: 0.4, speed: 0.16 },
  { slug: 'crypto-pulse', surface: 'led', radius: 1.4, orbit: 8.15, phase: 2.2, speed: 0.12 },
  { slug: 'file-actions', surface: 'mat', radius: 1.2, orbit: 11, phase: 4.1, speed: 0.095 },
  { slug: 'lecture-backend', surface: 'strata', radius: 1.55, orbit: 14, phase: 1.3, speed: -0.075 },
  { slug: 'faultline', surface: 'seismograph', radius: 1.3, orbit: 17.1, phase: 3.9, speed: 0.065 },
  { slug: 'current-portfolio', surface: 'nebula', radius: 1, orbit: 20.75, phase: 5.2, speed: 0.05, ring: true },
  { slug: 'old-portfolio', surface: 'craters', radius: 0.95, orbit: 24, phase: 0.6, speed: -0.042 },
];

/** Outer edge of a planet, its ring included. */
export const RING_SCALE = 2.1;
export const planetExtent = (planet: ProjectPlanet): number => planet.radius * (planet.ring ? RING_SCALE : 1);

export const planetFor = (slug: string): ProjectPlanet | undefined => PROJECT_PLANETS.find((p) => p.slug === slug);

/** Every project that has a planet, in orbit order (innermost first). */
export const planetsWithProjects = () =>
  PROJECT_PLANETS.flatMap((planet) => {
    const project = projects.find((p) => p.slug === planet.slug);
    return project ? [{ planet, project }] : [];
  });

/** Position on a flat circular orbit after `elapsed` seconds. */
export function orbitPosition(planet: ProjectPlanet, elapsed: number): [number, number, number] {
  const angle = planet.phase + planet.speed * elapsed;
  return [Math.cos(angle) * planet.orbit, 0, Math.sin(angle) * planet.orbit];
}
