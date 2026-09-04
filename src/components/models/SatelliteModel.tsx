import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';

interface SatelliteModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SatelliteModel(props: SatelliteModelProps) {
  return <SpaceModel path="/models/satelite/scene.gltf" castShadow={false} receiveShadow={false} {...props} />;
}
