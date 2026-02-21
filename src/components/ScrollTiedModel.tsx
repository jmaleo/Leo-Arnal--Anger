import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { Center } from "@react-three/drei";
import * as THREE from "three";

import { type ProjectData } from "@/data/projects";

// --- LE MODÈLE QUI TOURNE AVEC LE SCROLL ---
export function ScrollTiedModel({ config }: { config: ProjectData }) {
  const obj = useLoader(OBJLoader, config.objFile);
  const groupRef = useRef<THREE.Group>(null);

  const isOnlyPoints = config.points && !config.meshes && !config.wireframe;

  const solidScene = useMemo(() => {
    if (!config.meshes) return null;
    const clone = obj.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#00ccff", roughness: 0.4, metalness: 0.8,
        });
      }
    });
    return clone;
  }, [obj, config.meshes]);

  const pointsGeometry = useMemo(() => {
    if (!config.points) return null;
    let geo: THREE.BufferGeometry | null = null;
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !geo) {
        geo = (child as THREE.Mesh).geometry;
      }
    });
    return geo;
  }, [obj, config.points]);

  const wireframeScene = useMemo(() => {
    if (!config.wireframe) return null;
    const clone = obj.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: "#00ff66", wireframe: true, transparent: true, opacity: 0.9,
        });
      }
    });
    return clone;
  }, [obj, config.wireframe]);

  // ROTATION BASÉE SUR LE SCROLL
  useFrame(() => {
    if (groupRef.current) {
      // Calcul de la progression du scroll de la page (de 0 à 1)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // 1 tour complet = Math.PI * 2 / 1 demi-tour = Math.PI
      groupRef.current.rotation.y = scrollPercent * (Math.PI * 1);
    }
  });

  return (
    <group position={config.position || [0, 0, 0]} scale={config.scale || 50}>
      <Center>
        <group ref={groupRef}>
          {config.meshes && solidScene && <primitive object={solidScene} />}
          {config.wireframe && wireframeScene && <primitive object={wireframeScene} />}
          {config.points && pointsGeometry && (
            <points geometry={pointsGeometry}>
              <pointsMaterial
                color="#e5ff00"
                size={config.pointSize || 0.15} 
                sizeAttenuation={true}
                transparent={true}
                opacity={isOnlyPoints ? 1 : 0.8}
                blending={isOnlyPoints ? THREE.AdditiveBlending : THREE.NormalBlending}
                depthWrite={!isOnlyPoints}
              />
            </points>
          )}
        </group>
      </Center>
    </group>
  );
}
