import React, { useMemo, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Object3D } from 'three';

// Jasnoniebieski kolor podświetlenia
const HIGHLIGHT_COLOR = '#b3e0ff';
const DEFAULT_COLOR = '#888';

export default function MeteorModel(props: Record<string, unknown>) {
  const { scene } = useGLTF('/assets/meteor/scene.gltf');
  const [hovered, setHovered] = useState(false);

  // Klonujemy scenę, aby każdy meteor był niezależny
  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Ustawienie koloru wszystkich meshów w modelu
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

  // Zmiana koloru na hover
  React.useEffect(() => {
    setColor(hovered ? HIGHLIGHT_COLOR : DEFAULT_COLOR);
  }, [hovered, setColor]);

  return (
    <primitive
      object={cloned}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    />
  );
}

// Plik przeniesiony do models/MeteorModel.tsx
