import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';

export default function SatelliteModel(props: Record<string, unknown>) {
  const { scene } = useGLTF('/assets/satelite/scene.gltf');
  const [hovered, setHovered] = React.useState(false);
  const cloned = React.useMemo(() => scene.clone(true), [scene]);
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
    setColor(hovered ? '#b3e0ff' : '#888');
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
