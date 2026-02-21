import React, { Suspense, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ProjectData } from "@/data/projects";
// Remplace par le bon chemin vers ton modèle rotatif
import { ScrollTiedModel } from "@/components/ScrollTiedModel";
import { useNavigate } from "react-router-dom";

interface ProjectLayoutProps {
  project: ProjectData;
  children: React.ReactNode;
}

export const ProjectLayout = ({ project, children }: ProjectLayoutProps) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-white selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-2 border-b-2 border-white bg-slate-950/90 backdrop-blur-sm">
      <Button 
        onClick={handleReturn}
        variant="ghost" 
        size="sm" 
        className="rounded-none font-mono text-xs uppercase text-white hover:bg-white hover:text-black border border-transparent hover:border-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> [ RETOUR_SYSTÈME ]
      </Button>
      
      <span className="ml-auto font-mono text-xs text-slate-500 uppercase tracking-widest hidden md:block">
        LECTURE_LOG: {project?.title}.TXT
      </span>
    </nav>

      {/* ARRIÈRE-PLAN 3D (Fixe) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
          <directionalLight position={[-5, -2, -5]} intensity={0.5} color="#3b82f6" />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <ScrollTiedModel config={project} />
          </Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* CONTENU DU BLOG */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-48 space-y-16">
        
        {/* En-tête automatique */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter drop-shadow-[0_4px_0_black]">
            {project.title}
          </h1>
          <div className="inline-block bg-white text-black font-mono font-bold px-2 py-1 text-sm uppercase">
            STATUS: EN TRAVAUX
            {/* // {project.year} */}
          </div>
        </div>

        {/* Le contenu spécifique */}
        {children}

      </div>
    </div>
  );
};