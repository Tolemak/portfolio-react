import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';

interface SpacemanModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SpacemanModel(props: SpacemanModelProps) {
  return <SpaceModel path="/models/spaceman/scene.gltf" {...props} />;
}
