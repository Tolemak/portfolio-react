import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';
import { METEOR_MODEL_PATH } from '../../data/spaceObjects';

interface MeteorModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function MeteorModel(props: MeteorModelProps) {
  return <SpaceModel path={METEOR_MODEL_PATH} {...props} />;
}
