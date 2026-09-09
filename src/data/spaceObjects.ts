export type SectionKey = 'about' | 'skills' | 'projects' | 'education' | 'experience';

export const ISS_MODEL_PATH = '/models/la_station_spatiale_internationale_iss/scene.gltf';
export const METEOR_MODEL_PATH = '/models/meteor/scene.gltf';
export const SATELLITE_MODEL_PATH = '/models/satelite/scene.gltf';
export const SPACEMAN_MODEL_PATH = '/models/spaceman/scene.gltf';
export const SPUTNIK_MODEL_PATH = '/models/sputnik_1/scene.gltf';

const METEOR_SCALE = 2.5 * 3;

export interface SpaceObjectConfig {
  key: SectionKey;
  /** 0-based position in the WOW-mode camera flight sequence. */
  order: number;
  routePath: string;
  modelPath: string;
  position: readonly [number, number, number];
  scale: number;
  rotation: readonly [number, number, number];
  /** Camera world position when settled at this waypoint in WOW mode. Tunable visually. */
  cameraPosition: readonly [number, number, number];
  /** Camera look-at target when settled; defaults to `position` if omitted. */
  cameraLookAt?: readonly [number, number, number];
}

export const SPACE_OBJECTS: readonly SpaceObjectConfig[] = [
  {
    key: 'about',
    order: 0,
    routePath: '/about',
    modelPath: ISS_MODEL_PATH,
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0],
    cameraPosition: [0, 30, 220],
  },
  {
    key: 'projects',
    order: 1,
    routePath: '/projects',
    modelPath: SATELLITE_MODEL_PATH,
    position: [-20, -80, 50],
    scale: METEOR_SCALE,
    rotation: [0, Math.PI / 5, 0],
    cameraPosition: [-45, -110, 90],
  },
  {
    key: 'experience',
    order: 2,
    routePath: '/experience',
    modelPath: SPUTNIK_MODEL_PATH,
    position: [10, 100, 60],
    scale: METEOR_SCALE,
    rotation: [0, Math.PI / 3, 0],
    cameraPosition: [35, 125, 95],
  },
  {
    key: 'education',
    order: 3,
    routePath: '/education',
    modelPath: SPACEMAN_MODEL_PATH,
    position: [40, 110, 80],
    scale: METEOR_SCALE * 0.15,
    rotation: [0, Math.PI / 2 + Math.PI, 0],
    cameraPosition: [65, 135, 115],
  },
  {
    key: 'skills',
    order: 4,
    routePath: '/skills',
    modelPath: METEOR_MODEL_PATH,
    position: [185, 40, 30],
    scale: METEOR_SCALE,
    rotation: [0, 0, 0],
    cameraPosition: [230, 60, 65],
  },
];

export const getSpaceObject = (key: SectionKey): SpaceObjectConfig => {
  const obj = SPACE_OBJECTS.find((o) => o.key === key);
  if (!obj) throw new Error(`Unknown space object: ${key}`);
  return obj;
};

export const getSectionPath = (key: SectionKey): string => getSpaceObject(key).routePath;

export const spaceObjectsInFlightOrder = (): SpaceObjectConfig[] =>
  [...SPACE_OBJECTS].sort((a, b) => a.order - b.order);

export function maxHitboxRadius(pos: readonly [number, number, number]): number {
  const others = SPACE_OBJECTS.map((o) => o.position).filter((p) => p !== pos);
  const nearest = Math.min(...others.map(([x, y, z]) => Math.hypot(pos[0] - x, pos[1] - y, pos[2] - z)));
  return (nearest / 2) * 0.9;
}
