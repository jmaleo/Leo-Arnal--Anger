import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Lenis from 'lenis'
import { Button } from "@/components/ui/button"
import { ArrowUp, X } from "lucide-react"
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom"

import { HeroSection } from "@/sections/Hero"
import { AboutSection } from "@/sections/About"
import { PublicationsSection } from "@/sections/Publications"
import { ProjectsSection } from "@/sections/Projects"
import { ContactSection } from "@/sections/Contact"
import { Logo } from "@/components/Logo"

import { ProjectTemplate } from "@/pages/projects/ProjectTemplate";
// import { ProjectBeta } from "@/pages/projects/ProjectBeta";


// --- 1. L'ÉCRAN DE CHARGEMENT "BOOT SEQUENCE" ---
function SystemBootLoader({ isBooting }: { isBooting: boolean }) {
  const [logIndex, setLogIndex] = useState(0);
  const logs: any[] = [
    "INITIATING LEO...",
    "DREAMING ABOUT PEACE...",
    "LOADING THOUGHTS...",
    "PLAYING MUSIC...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    if (!isBooting) return;
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 300); // Fait défiler une ligne tous les 300ms
    return () => clearInterval(interval);
  }, [isBooting]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isBooting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="w-64 space-y-2">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={`font-mono text-xs md:text-sm ${i <= logIndex ? 'opacity-100' : 'opacity-0'} ${i === logs.length - 1 ? 'text-green-500 font-bold' : 'text-slate-400'}`}
          >
            &gt; {log}
          </div>
        ))}
        {/* Barre de progression ascii */}
        <div className={`font-mono text-xs text-white pt-4 ${logIndex === logs.length - 1 ? 'animate-pulse' : ''}`}>
          [{'#'.repeat(logIndex * 5).padEnd(20, '.')}]
        </div>
      </div>
    </div>
  );
}

// --- SMOOTH SCROLL ---
function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}

// --- NAVBAR ---
function StickyNavbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth < 768 ? 50 : window.innerHeight - 100
      setIsVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 border-b-2 border-white bg-slate-950/95 backdrop-blur-sm transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="h-3 w-3 md:h-4 md:w-4 bg-white animate-pulse group-hover:bg-blue-500 transition-colors"></div>
          <span className="font-mono font-bold text-white tracking-widest uppercase text-xs md:text-base">
            LÉO.ARNAL--ANGER
          </span>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => scrollTo('about')} className="rounded-none border border-transparent hover:border-white hover:bg-white hover:text-black font-mono text-xs uppercase">[ À_PROPOS ]</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollTo('publications')} className="rounded-none border border-transparent hover:border-white hover:bg-white hover:text-black font-mono text-xs uppercase">[ PUBLICATIONS ]</Button>
          <Button variant="ghost" size="sm" onClick={() => scrollTo('projets')} className="rounded-none border border-transparent hover:border-white hover:bg-white hover:text-black font-mono text-xs uppercase">[ PROJETS ]</Button>
          <Button size="sm" onClick={() => scrollTo('contact')} className="rounded-none border border-white bg-white text-black hover:bg-slate-200 hover:text-black font-mono text-xs uppercase">[ CONTACT ]</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-none border border-white hover:bg-white hover:text-black font-mono text-xs uppercase h-8 px-2">
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <span className="flex items-center gap-1">[ MENU ]</span>}
          </Button>
        </div>
      </nav>

      {/* MENU MOBILE DE DÉROULANT */}
      <div className={`fixed top-[50px] right-0 left-0 z-40 md:hidden transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-950 border-b-2 border-white shadow-[0_10px_20px_rgba(0,0,0,0.8)] p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center border-b border-white/20 pb-2 mb-2">
                <span className="font-mono text-[10px] text-slate-500 uppercase">SYSTEM_NAVIGATION</span>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
            <Button variant="ghost" onClick={() => scrollTo('about')} className="justify-start rounded-none border border-white/10 hover:border-white hover:bg-white hover:text-black font-mono text-sm uppercase h-10 w-full">&gt; À_PROPOS</Button>
            <Button variant="ghost" onClick={() => scrollTo('publications')} className="justify-start rounded-none border border-white/10 hover:border-white hover:bg-white hover:text-black font-mono text-sm uppercase h-10 w-full">&gt; PUBLICATIONS</Button>
            <Button variant="ghost" onClick={() => scrollTo('projets')} className="justify-start rounded-none border border-white/10 hover:border-white hover:bg-white hover:text-black font-mono text-sm uppercase h-10 w-full">&gt; PROJETS</Button>
            <Button variant="default" onClick={() => scrollTo('contact')} className="justify-start rounded-none border border-white bg-white text-black hover:bg-slate-200 font-mono text-sm uppercase h-10 w-full">[ CONTACT_ME ]</Button>
        </div>
        <div className="h-screen w-full bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
      </div>
    </>
  )
}

// --- SCROLL TO TOP ---
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 800)
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40 flex h-8 w-8 md:h-10 md:w-10 items-center justify-center border-2 border-white bg-slate-950 text-white transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_white]
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
    </button>
  )
}

// --- PAGE D'ACCUEIL (Ancienne App complète) ---
function Home() {
  
  const location = useLocation();

  // Gestion du "Retour Système"
  useEffect(() => {
    // Si on arrive sur l'accueil avec #projets dans l'URL
    if (location.hash === '#projets') {
      // Un petit délai pour s'assurer que le DOM et Lenis sont prêts
      setTimeout(() => {
        document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [location]);

  return (
    <div className="relative w-full bg-slate-950 text-slate-200 selection:bg-white selection:text-black font-sans min-h-screen">
      <StickyNavbar />
      <ScrollToTop />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <fog attach="fog" args={['#020617', 8, 25]} /> 
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.2} penumbra={1} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
          <Environment preset="city" />
          <React.Suspense fallback={null}>
            <Logo />
          </React.Suspense>
        </Canvas>
      </div>

      <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="fixed bottom-0 left-0 w-full h-[50vh] z-[1] pointer-events-none bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent"></div>

      <HeroSection />

      <section id="contenu" className="relative z-20 w-full bg-slate-950 min-h-screen border-t-2 border-white shadow-[0_-50px_100px_rgba(0,0,0,1)] pt-24 md:pt-32 pb-12">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 border-2 border-white px-4 py-1">
            <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">&gt;_</span>
         </div>

        <div className="max-w-6xl mx-auto px-6 space-y-32 md:space-y-48">
          <AboutSection />
          <PublicationsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </section>
    </div>
  )
}

// --- ROUTEUR PRINCIPAL ---
function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Le "Loader" dure 2 secondes, le temps de charger la 3D et de jouer l'animation texte
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SystemBootLoader isBooting={isBooting} />
      
      <div className={`transition-opacity duration-500 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
        <Router>
          <SmoothScroll>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/project/Template" element={<ProjectTemplate />} />
              {/* <Route path="/project/Beta" element={<ProjectBeta />} /> */}
              
            </Routes>
          </SmoothScroll>
        </Router>
      </div>
    </>
  )
}

export default App