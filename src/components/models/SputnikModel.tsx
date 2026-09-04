import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';

interface SputnikModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SputnikModel(props: SputnikModelProps) {
  return <SpaceModel path="/models/sputnik_1/scene.gltf" {...props} />;
}
