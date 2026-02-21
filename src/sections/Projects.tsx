import { useState, useRef, useMemo, Suspense } from "react";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import { Center, Environment } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { PROJECTS_DB, type ProjectData } from "@/data/projects";

interface ProjectModelProps {
  objPath: string;
  isHovered: boolean;
  scale?: number;
  position?: [number, number, number];
  wireframe?: boolean;
  points?: boolean;
  meshes?: boolean;
  pointSize?: number; 
}

function ProjectModel({ 
  objPath, 
  isHovered, 
  scale = 50, 
  position = [0, 0, 0],
  wireframe = false,
  points = false,
  meshes = false, 
  pointSize = 0.15 
}: ProjectModelProps) {
  const obj = useLoader(OBJLoader, objPath);
  const groupRef = useRef<THREE.Group>(null);
  const isOnlyPoints = points && !meshes && !wireframe;

  const solidScene = useMemo(() => {
    if (!meshes) return null;
    const clone = obj.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#00ccff",
          roughness: 0.4,
          metalness: 0.8,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [obj, meshes]);

  const pointsGeometry = useMemo(() => {
    if (!points) return null;
    let geo: THREE.BufferGeometry | null = null;
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !geo) {
        geo = (child as THREE.Mesh).geometry;
      }
    });
    return geo;
  }, [obj, points]);

  const wireframeScene = useMemo(() => {
    if (!wireframe) return null;
    const clone = obj.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshBasicMaterial({
          color: "#00ff66",
          wireframe: true,
          transparent: true,
          opacity: 0.9, 
        });
      }
    });
    return clone;
  }, [obj, wireframe]);

  useFrame((_state, delta) => {
    if (groupRef.current && isHovered) {
      groupRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <group position={position} scale={scale}>
      <Center>
        <group ref={groupRef}>
          {meshes && solidScene && <primitive object={solidScene} />}
          {wireframe && wireframeScene && <primitive object={wireframeScene} />}
          {points && pointsGeometry && (
            <points geometry={pointsGeometry}>
              <pointsMaterial
                color="#e5ff00"
                size={pointSize} 
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

// --- COMPOSANT CARD ---
function ProjectCard({ project, isCenteredOrphan }: { project: ProjectData, isCenteredOrphan: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative border-2 border-white bg-slate-950 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white] flex flex-col w-full",
        isCenteredOrphan ? "md:col-span-2 md:w-[calc(50%-1.5rem)] md:mx-auto" : "md:col-span-1"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between border-b-2 border-white bg-slate-900 px-2 py-1 z-20 shrink-0">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
          {project.title.replace(/\s+/g, "_")}.EXE
        </span>
        <div className="flex gap-1 text-white">
          <div className="flex h-3 w-3 items-center justify-center border border-current"><Minimize2 className="h-2 w-2" /></div>
          <div className="flex h-3 w-3 items-center justify-center border border-current"><Maximize2 className="h-2 w-2" /></div>
          <div className="flex h-3 w-3 items-center justify-center border border-current"><X className="h-2 w-2" /></div>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden flex-1">
        <div className="absolute inset-0 z-0 bg-slate-900">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
            <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#3b82f6" />
            <Environment preset="city" />
            <axesHelper args={[0.0001]} />
            
            <Suspense fallback={null}>
              <ProjectModel 
                objPath={project.objFile} 
                isHovered={isHovered} 
                scale={project.scale} 
                position={project.position}
                wireframe={project.wireframe}
                points={project.points}
                meshes={project.meshes}
                pointSize={project.pointSize}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>

        {/* CONTENU AVEC LE BOUTON OPEN LOG */}
        <div className="absolute bottom-0 left-0 p-6 w-full z-20 flex justify-between items-end pointer-events-none">
          <div>
            <span className="text-xs font-mono bg-white text-black px-1 mb-2 inline-block">
              {project.year} • {project.tags}
            </span>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:underline decoration-2 underline-offset-4 pointer-events-auto cursor-pointer">
              {project.title}
            </h3>
          </div>
          
          {/* LIEN VERS LE BLOG */}
          <Link to={`/project/${project.id}`} className="pointer-events-auto">
            <Button variant="outline" size="sm" className="rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black font-mono text-xs uppercase transition-transform hover:-translate-y-1 backdrop-blur-sm">
              [ OPEN_LOG ]
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- SECTION PRINCIPALE ---
export const ProjectsSection = () => {
  return (
    <div id="projets" className="scroll-mt-32 space-y-12">
      <div className="space-y-4 md:space-y-6 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Projets</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto md:mx-0 font-mono">
          &gt; Expériences numériques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {PROJECTS_DB.map((proj, index) => {
          const isCenteredOrphan = PROJECTS_DB.length % 2 !== 0 && index === PROJECTS_DB.length - 1;
          return (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              isCenteredOrphan={isCenteredOrphan} 
            />
          );
        })}
      </div>
    </div>
  );
};