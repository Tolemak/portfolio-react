import type { ThreeEvent } from '@react-three/fiber';
import SpaceModel from './SpaceModel';
import { SPUTNIK_MODEL_PATH } from '../../data/spaceObjects';

interface SputnikModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SputnikModel(props: SputnikModelProps) {
  return <SpaceModel path={SPUTNIK_MODEL_PATH} {...props} />;
}
