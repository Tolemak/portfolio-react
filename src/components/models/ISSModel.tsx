import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';

interface ISSModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function ISSModel(props: ISSModelProps) {
  return <SpaceModel path="/models/la_station_spatiale_internationale_iss/scene.gltf" {...props} />;
}
