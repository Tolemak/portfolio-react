import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh, MeshStandardMaterial, Object3D } from 'three';

export default function ISSModel(props: Record<string, unknown>) {
  const { scene } = useGLTF('/assets/la_station_spatiale_internationale_iss/scene.gltf');
  // Optimize: disable shadows, simplify materials
  React.useEffect(() => {
    scene.traverse((obj: Object3D) => {
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
  }, [scene]);
  return <primitive object={scene} {...props} />;
}
