import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';
import { ISS_MODEL_PATH } from '../../data/spaceObjects';

interface ISSModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function ISSModel(props: ISSModelProps) {
  return <SpaceModel path={ISS_MODEL_PATH} {...props} />;
}
