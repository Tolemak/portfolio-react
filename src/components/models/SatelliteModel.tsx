import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';
import { SATELLITE_MODEL_PATH } from '../../data/spaceObjects';

interface SatelliteModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SatelliteModel(props: SatelliteModelProps) {
  return <SpaceModel path={SATELLITE_MODEL_PATH} castShadow={false} receiveShadow={false} {...props} />;
}
