import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';

interface MeteorModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function MeteorModel(props: MeteorModelProps) {
  return <SpaceModel path="/models/meteor/scene.gltf" {...props} />;
}
