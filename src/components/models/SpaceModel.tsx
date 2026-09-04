import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import { Box3, Sphere } from 'three';
import { useHighlightedModel } from '../../hooks/useHighlightedModel';

export interface SpaceModelProps extends Record<string, unknown> {
  path: string;
  highlighted?: boolean;
  scale?: number;
  maxHitboxRadius?: number;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SpaceModel({
  path,
  highlighted,
  scale = 1,
  maxHitboxRadius,
  onPointerOver,
  onPointerOut,
  ...groupProps
}: SpaceModelProps) {
  const { scene } = useGLTF(path);
  const { cloned, setHovered } = useHighlightedModel(scene, highlighted);

  const { center, radius } = useMemo(() => {
    const box = new Box3().setFromObject(cloned);
    const sphere = new Sphere();
    if (!box.isEmpty()) box.getBoundingSphere(sphere);

    let localRadius = sphere.radius > 0 ? sphere.radius : 1;
    if (maxHitboxRadius !== undefined) {
      localRadius = Math.min(localRadius, maxHitboxRadius / scale);
    }

    return { center: sphere.center, radius: localRadius };
  }, [cloned, scale, maxHitboxRadius]);

  return (
    <group
      {...groupProps}
      scale={scale}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        setHovered(true);
        onPointerOver?.(e);
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        setHovered(false);
        onPointerOut?.(e);
      }}
    >
      <primitive object={cloned} />
      <mesh position={center}>
        <sphereGeometry args={[radius, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
