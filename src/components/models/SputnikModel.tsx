import React, { useMemo, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Object3D } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

const HIGHLIGHT_COLOR = '#b3e0ff';
const DEFAULT_COLOR = '#888';

interface ModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SputnikModel({ highlighted, onPointerOver, onPointerOut, ...props }: ModelProps) {
  const { scene } = useGLTF('/assets/sputnik_1/scene.gltf');
  const [hovered, setHovered] = useState(false);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Optimize: disable shadows, simplify materials
  React.useEffect(() => {
    cloned.traverse((obj: Object3D) => {
      if ((obj as Mesh).isMesh) {
        const mesh = obj as Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ((mat as MeshStandardMaterial).metalness !== undefined) {
                (mat as MeshStandardMaterial).metalness = 0.1;
                (mat as MeshStandardMaterial).roughness = 0.9;
              }
            });
          } else if ((mesh.material as MeshStandardMaterial).metalness !== undefined) {
            (mesh.material as MeshStandardMaterial).metalness = 0.1;
            (mesh.material as MeshStandardMaterial).roughness = 0.9;
          }
        }
      }
    });
  }, [cloned]);

  // Highlight on hover
  const setColor = useCallback((color: string) => {
    cloned.traverse((obj: Object3D) => {
      if ((obj as Mesh).isMesh) {
        const mesh = obj as Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ((mat as MeshStandardMaterial).color) {
              (mat as MeshStandardMaterial).color.set(color);
            }
          });
        } else if ((mesh.material as MeshStandardMaterial).color) {
          (mesh.material as MeshStandardMaterial).color.set(color);
        }
      }
    });
  }, [cloned]);

  React.useEffect(() => {
    setColor(highlighted || hovered ? HIGHLIGHT_COLOR : DEFAULT_COLOR);
  }, [hovered, highlighted, setColor]);

  return (
    <primitive
      object={cloned}
      {...props}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        setHovered(true);
        if (onPointerOver) onPointerOver(e);
      }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => {
        setHovered(false);
        if (onPointerOut) onPointerOut(e);
      }}
    />
  );
}
