import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';
import { SPACEMAN_MODEL_PATH } from '../../data/spaceObjects';

interface SpacemanModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SpacemanModel(props: SpacemanModelProps) {
  return <SpaceModel path={SPACEMAN_MODEL_PATH} {...props} />;
}
