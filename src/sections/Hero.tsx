import { Button } from "@/components/ui/button";
import { HoverWord } from "@/components/HoverWord";
import { HeroImageRound } from "@/components/HeroImage";
import { Download } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [showCvPopup, setShowCvPopup] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center z-10 pointer-events-none overflow-hidden font-sans">
        
      {/* --- STYLES POUR L'ANIMATION DU BANDEAU --- */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          /* 30s contrôle la vitesse. Plus c'est bas, plus ça va vite ! */
          animation: ticker 30s linear infinite;
          width: max-content;
        }
        /* Petit bonus : le bandeau se met en pause si on le survole avec la souris */
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* MENU PILULE (Barre d'outils flottante) */}
      <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-auto w-max max-w-[90vw] animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="flex items-center gap-0 border-2 border-white bg-slate-950 p-1 shadow-[4px_4px_0px_0px_white]">
            <Button variant="ghost" onClick={() => scrollTo('about')} size="sm" className="rounded-none h-8 font-mono text-xs hover:bg-white hover:text-black transition-colors px-4">[ À_PROPOS ]</Button>
            <div className="w-px h-4 bg-white/20 mx-1"></div>
            <Button variant="ghost" onClick={() => scrollTo('publications')} size="sm" className="rounded-none h-8 font-mono text-xs hover:bg-white hover:text-black transition-colors px-4">[ PUBLICATIONS ]</Button>
            <div className="w-px h-4 bg-white/20 mx-1"></div>
            <Button variant="ghost" onClick={() => scrollTo('projets')} size="sm" className="rounded-none h-8 font-mono text-xs hover:bg-white hover:text-black transition-colors px-4">[ PROJETS ]</Button>
            <div className="w-px h-4 bg-white/20 mx-1"></div>
            <Button variant="ghost" onClick={() => scrollTo('contact')} size="sm" className="rounded-none h-8 font-mono text-xs hover:bg-white hover:text-black transition-colors px-4">[ CONTACT ]</Button>
        </div>
      </div>

      {/* GRILLE CONTENU */}
      <div className="pointer-events-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center md:items-start max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 md:pt-0">
        
        {/* IMAGE */}
        <div className="col-span-1 md:col-span-5 order-last md:order-first flex justify-center md:justify-end">
          <div className="relative w-48 md:w-80 lg:w-96 aspect-square animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
            <HeroImageRound className="w-full h-full shadow-none" />
          </div>
        </div>

        {/* TEXTE */}
        <div className="col-span-1 md:col-span-7 z-20 md:pt-4 flex flex-col items-center md:items-start">
            
            {/* BLOC TITRE */}
            <div className="space-y-4 text-center md:text-left mb-8">
              <h1 className="bg-slate-950/50 text-5xl md:text-8xl lg:text-7xl font-bold text-white tracking-tighter animate-in fade-in slide-in-from-right-8 duration-1000 delay-100 leading-[0.85] drop-shadow-[0_2px_0_black]">
                Léo Arnal--Anger
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-4">
                 <span className="h-px w-12 bg-white/50"></span>
                 <p className="font-mono text-xs md:text-sm tracking-widest uppercase text-slate-400 animate-in fade-in duration-1000 delay-500 bg-slate-950/50 px-2">
                   Doctorant 
                 </p>
                 <span className="h-px w-12 bg-white/50"></span>
              </div>
            </div>

            {/* BOITE DE TEXTE */}
            <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                
                {/* Cadre décoratif */}
                <div className="bg-slate-950/80 border border-white/30 backdrop-blur-sm p-6 md:p-8 max-w-2xl text-left shadow-2xl">
                    
                    {/* Petits carrés aux coins */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 border border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-white"></div>

                    {/* Header du panneau */}
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">INTRODUCING_MYSLF...</span>
                    </div>

                    {/* Le Texte Principal */}
                    <div className="text-slate-300 text-sm md:text-xl leading-relaxed font-light">  
                      Je suis doctorant en informatique à l’<HoverWord className="text-white font-medium">Université de Toulouse</HoverWord>, rattaché à l'<HoverWord className="text-white font-medium">IRIT</HoverWord> (Institut de Recherche en
                      Informatique de Toulouse), au sein de l’équipe <HoverWord className="text-white font-medium">STORM</HoverWord>.
                    </div>

                    <div className="text-slate-300 text-sm md:text-xl leading-relaxed font-light">  
                      Je suis actuellement en <HoverWord className="text-white font-medium">mobilité</HoverWord> à l'Université de Sherbrooke au Canada,
                      au sein du Laboratoire <HoverWord className="text-white font-medium">Shergraphe</HoverWord>.
                    </div>

                    {/* Les Boutons */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        
                        <Button onClick={() => scrollTo('publications')} className="rounded-none border-2 border-white bg-white text-black hover:bg-slate-200 hover:text-black px-6 font-mono font-bold text-xs md:text-sm transition-transform hover:-translate-y-1">
                            &gt; MES_TRAVAUX
                        </Button>

                        {/* BOUTON CV (Actif plus tard) */}
                        {/* <a 
                          href={`${import.meta.env.BASE_URL}mon-cv.pdf`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          download 
                        >
                          <Button variant="outline" className="rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black px-6 font-mono font-bold text-xs md:text-sm transition-transform hover:-translate-y-1 flex items-center gap-2">
                              <Download className="w-4 h-4" /> [ GET_CV.PDF ]
                          </Button>
                        </a> 
                        */}

                        {/* BOUTON CV (Temporaire - Ouvre la popup) */}
                        <Button 
                          onClick={() => setShowCvPopup(true)}
                          variant="outline" 
                          className="rounded-none border-2 border-white bg-transparent text-white hover:bg-white hover:text-black px-6 font-mono font-bold text-xs md:text-sm transition-transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> [ GET_CV.PDF ]
                        </Button>

                    </div>

                </div>
            </div>

        </div>
      </div>

      {/* SCROLL INDICATOR (Remonté à bottom-16 pour laisser la place au bandeau) */}
      <div 
        className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer group flex flex-col items-center gap-2 z-30" 
        onClick={() => scrollTo('about')}
      >
        <p className="font-mono text-[10px] uppercase animate-pulse bg-slate-950/50 px-2 py-1">
          {/* &gt; SCROLL_DOWN_ */}
          &gt; DÉFILER_EN_BAS_
        </p>
      </div>

      {/* BANDEAU DÉFILANT (TICKER) */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/20 bg-slate-950/90 backdrop-blur-md z-30 pointer-events-auto overflow-hidden flex items-center h-10 md:h-12 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-green-500 font-mono text-xs md:text-sm font-bold uppercase tracking-widest mx-4 md:mx-8">
                &gt; ACTUELLEMENT SHERBROOKE, QC, CANADA
              </span>
              <span className="text-white/30 font-mono text-xs md:text-sm mx-2">///</span>
              <span className="text-red-500 font-mono text-xs md:text-sm font-bold uppercase tracking-widest mx-4 md:mx-8">
                &gt; RECHERCHE POST-DOC 
              </span>
              <span className="text-white/30 font-mono text-xs md:text-sm mx-2">///</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP ERREUR CV --- */}
      {showCvPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
          
          <div className="bg-slate-950 border-2 border-white p-6 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-in zoom-in-95 duration-200">
            
            {/* Barre de titre de l'erreur */}
            <div className="flex justify-between items-center border-b-2 border-white/30 pb-2 mb-6">
               <span className="font-mono text-xs text-amber-500 font-bold uppercase flex items-center gap-2">
                 <div className="w-2 h-2 bg-amber-500 animate-pulse"></div>
                 SYSTEM_WARNING
               </span>
               <button onClick={() => setShowCvPopup(false)} className="text-white hover:text-red-500 font-mono text-sm font-bold">
                 [X]
               </button>
            </div>

            {/* Message */}
            <p className="font-mono text-sm text-slate-300 mb-8 leading-relaxed">
               &gt; <span className="text-red-400">FILE_NOT_FOUND</span> : CV.PDF<br/><br/>
               &gt; temporairement indisponible.
            </p>

            {/* Bouton de fermeture */}
            <Button 
              onClick={() => setShowCvPopup(false)} 
              className="w-full rounded-none border-2 border-white bg-white text-black hover:bg-slate-200 font-mono text-xs uppercase font-bold transition-transform hover:-translate-y-1"
            >
               [ ACKNOWLEDGE ]
            </Button>
            
          </div>

        </div>
      )}

    </section>
  );
};