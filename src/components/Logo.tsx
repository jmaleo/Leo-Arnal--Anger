import { useRef, useMemo } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import { Center } from '@react-three/drei'
import * as THREE from 'three'

export const Logo = () => {
  const obj = useLoader(OBJLoader, `${import.meta.env.BASE_URL}models/myLogo.obj`)
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  const solidScene = useMemo(() => {
    const clone = obj.clone()
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#0a0a0a",
          roughness: 0.2,
          metalness: 0.9,
          emissive: "#1a1a1a",
          emissiveIntensity: 0.2
        })
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
    return clone
  }, [obj])

  const pointsGeometry = useMemo(() => {
    let geo: THREE.BufferGeometry | null = null;
    // obj.traverse((child) => {
    //   if ((child as THREE.Mesh).isMesh && !geo) {
    //     geo = (child as THREE.Mesh).geometry
    //   }
    // })
    return geo
  }, [obj])

  useFrame((state) => {
    if (groupRef.current) {
      const { pointer, clock } = state;

      groupRef.current.rotation.y += 0.002;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.2,
        0.1
      );

      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -pointer.x * 0.2,
        0.1
      );

      const floatY = Math.sin(clock.elapsedTime * 0.5) * 0.1;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointer.x * 0.5,
        0.05
      );

      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        floatY + (pointer.y * 0.5),
        0.05
      );
    }
  })

  return (
    <Center position={[0, 0, 0]} precise>
      <group ref={groupRef} scale={isMobile ? 80 : 150}>
        
        {/* L'objet */}
        <primitive object={solidScene} />

        {/* Les points en surbrillance */}
        {pointsGeometry && (
          <points geometry={pointsGeometry}>
            <pointsMaterial 
              color="white" 
              size={isMobile ? 0.06 : 0.04} 
              sizeAttenuation={true} 
              transparent={true}
              opacity={0.8} 
            />
          </points>
        )}
        
      </group>
    </Center>
  )
}