import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, MeshStandardMaterial, Object3D } from 'three';

const HIGHLIGHT_COLOR = '#b3e0ff';
const DEFAULT_COLOR = '#9aa5b3';
const HOVER_SCALE = 1.08;

const forEachMeshMaterial = (obj: Object3D, fn: (mat: MeshStandardMaterial) => void) => {
  if (!(obj as Mesh).isMesh) return;
  const material = (obj as Mesh).material;
  const materials = Array.isArray(material) ? material : [material];
  materials.forEach((mat) => mat && fn(mat as MeshStandardMaterial));
};

export function useHighlightedModel(scene: Object3D, highlighted?: boolean) {
  const [hovered, setHovered] = useState(false);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((obj: Object3D) => {
      if (!(obj as Mesh).isMesh) return;
      (obj as Mesh).castShadow = false;
      (obj as Mesh).receiveShadow = false;
      (obj as Mesh).raycast = () => {};
      forEachMeshMaterial(obj, (mat) => {
        if (mat.metalness !== undefined) {
          mat.metalness = 0.1;
          mat.roughness = 0.9;
        }
      });
    });
  }, [cloned]);

  const setColor = useCallback((color: string) => {
    cloned.traverse((obj: Object3D) => {
      forEachMeshMaterial(obj, (mat) => mat.color?.set(color));
    });
  }, [cloned]);

  useEffect(() => {
    setColor(highlighted || hovered ? HIGHLIGHT_COLOR : DEFAULT_COLOR);
  }, [hovered, highlighted, setColor]);

  useFrame((_state, delta) => {
    const target = highlighted || hovered ? HOVER_SCALE : 1;
    const lerpFactor = Math.min(delta * 6, 1);
    const next = cloned.scale.x + (target - cloned.scale.x) * lerpFactor;
    cloned.scale.setScalar(next);
  });

  return { cloned, hovered, setHovered };
}
