import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Object3D } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

interface ModelProps extends Record<string, unknown> {
  highlighted?: boolean;
  onPointerOver?: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (e: ThreeEvent<PointerEvent>) => void;
}

export default function SatelliteModel({ highlighted, onPointerOver, onPointerOut, ...props }: ModelProps) {
  const { scene } = useGLTF('/models/satelite/scene.gltf');
  const [hovered, setHovered] = React.useState(false);
  // Klonujemy scene, aby satelita był niezależnym obiektem
  const cloned = React.useMemo(() => scene.clone(true), [scene]);

  // Odchudzenie modelu: wyłącz cienie i zmniejsz jakość materiałów
  React.useEffect(() => {
    cloned.traverse((obj: Object3D) => {
      if ((obj as Mesh).isMesh) {
        const mesh = obj as Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        // Zmień materiał na MeshStandardMaterial o uproszczonych parametrach
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

  // Ustawienie koloru wszystkich meshów w modelu
  const setColor = React.useCallback((color: string) => {
    cloned.traverse((obj) => {
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
    setColor(highlighted || hovered ? '#b3e0ff' : '#888');
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
      // Wyłącz cienie na poziomie komponentu
      castShadow={false}
      receiveShadow={false}
    />
  );
}
