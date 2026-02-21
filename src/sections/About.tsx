import { Button } from "@/components/ui/button";
import { Download, Terminal } from "lucide-react";
import { useState } from "react";

export const AboutSection = () => {
  const [showCvPopup, setShowCvPopup] = useState(false);
  
  return (
    <div id="about" className="scroll-mt-32 space-y-12">
      
      {/* En-tête de la section */}
      <div className="space-y-4 md:space-y-6 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">À Propos</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto md:mx-0 font-mono">
          &gt; Qui suis-je ?
        </p>
      </div>

      {/* Fenêtre Système du CV */}
      <div className="relative border-2 border-white bg-slate-950/80 backdrop-blur-sm p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border border-white"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-white"></div>

        <div className="flex items-center justify-between border-b-2 border-white/30 pb-4 mb-8">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-green-500" />
            <span className="font-mono text-sm text-slate-300 uppercase tracking-widest">CV.MD</span>
          </div>
          
          {/* <a href={`${import.meta.env.BASE_URL}mon-cv.pdf`} download target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button variant="outline" size="sm" className="rounded-none border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-mono text-xs uppercase transition-transform hover:-translate-y-1">
              <Download className="w-4 h-4 mr-2" /> [ GET_CV.PDF ]
            </Button>
          </a> */}
          <Button 
            onClick={() => setShowCvPopup(true)}
            variant="outline" 
            size="sm" 
            className="hidden md:flex rounded-none border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-mono text-xs uppercase transition-transform hover:-translate-y-1 items-center"
          >
            <Download className="w-4 h-4 mr-2" /> [ GET_CV.PDF ]
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* COLONNE 1 : Expérience & Experience Saisonnière*/}
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-lg text-white font-bold mb-6 border-b border-dashed border-white/30 pb-2 flex items-center gap-2">
                <span className="text-blue-500">&gt;</span> EXPÉRIENCE_
              </h3>
              
              <ul className="space-y-8 font-mono text-sm relative before:absolute before:inset-y-0 before:left-[5px] before:w-[1px] before:bg-white/20">
                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-blue-500 rounded-full"></div>
                  <div className="text-blue-400 font-bold tracking-wider">ÉTÉ 2023</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Stage de Recherche</div>
                  <div className="text-slate-400 mt-1">IRIT, Équipe STORM - Université de Toulouse</div>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Ajustement de primitives anisotropes sur des nuages de points 3D
                  </p>
                </li>

                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-400 font-bold tracking-wider">ÉTÉ 2022</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Stage de Recherche</div>
                  <div className="text-slate-400 mt-1">IRIT, Équipe STORM - Université de Toulouse</div>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Détection et reconstruction d'arêtes à partir de nuages de points
                  </p>
                </li>

                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-400 font-bold tracking-wider">HIVER/PRINTEMPS 2022</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Stage de Recherche</div>
                  <div className="text-slate-400 mt-1">Kythera, Université de Toulouse</div>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Contrôle d'un pendule inversé sur bras robotique
                  </p>
                </li>

                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-400 font-bold tracking-wider">ÉTÉ 2021</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Stage</div>
                  <div className="text-slate-400 mt-1">IRIT, Équipe LiLaC - Université de Toulouse</div>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Stage en intelligence artificielle (apprentissage automatique)
                  </p>
                </li>
                
              </ul>
            </div>

            {/* Experience Saisonnière */}
            <div>
              <h3 className="font-mono text-lg text-white font-bold mb-6 border-b border-dashed border-white/30 pb-2 flex items-center gap-2">
                <span className="text-red-500">&gt;</span> SAISON_
              </h3>
              <ul className="space-y-6 font-mono text-sm relative before:absolute before:inset-y-0 before:left-[5px] before:w-[1px] before:bg-white/20">
                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-red-500 rounded-full"></div>
                  <div className="text-red-400 font-bold tracking-wider">ÉTÉ 2019 à 2022</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Saisons en restauration</div>
                  <div className="text-slate-400 mt-1">Les Jardins de la Louve, Rocamadour</div>
                   <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Plongeur, commis de cuisine
                  </p>
                </li>

                {/* <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-500 font-bold tracking-wider">2018 - 2021</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Licence Informatique</div>
                  <div className="text-slate-400 mt-1">Université de Toulouse</div>
                </li> */}
                
              </ul>
            </div>

            
          </div>

          {/* COLONNE 2 : Formation & Skills */}
          <div className="space-y-12">

            {/* Formation */}
            <div>
              <h3 className="font-mono text-lg text-white font-bold mb-6 border-b border-dashed border-white/30 pb-2 flex items-center gap-2">
                <span className="text-green-500">&gt;</span> FORMATION_
              </h3>
              <ul className="space-y-6 font-mono text-sm relative before:absolute before:inset-y-0 before:left-[5px] before:w-[1px] before:bg-white/20">
                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-green-500 rounded-full"></div>
                  <div className="text-green-400 font-bold tracking-wider">2023 - PRÉSENT</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Doctorant en Informatique</div>
                  <div className="text-slate-400 mt-1">IRIT, Équipe STORM - Université de Toulouse</div>
                   <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Traitement à plusieurs échelles de nuage de points 3D.
                  </p>
                </li>
                
                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-500 font-bold tracking-wider">2021 - 2023</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Master Informatique IAFA</div>
                  <div className="text-slate-400 mt-1">Université de Toulouse</div>
                  <div className="text-slate-500 mt-3 font-sans text-sm">IAFA: Intelligence Artificielle, fondement et application</div>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    
                  </p>
                  <p className="text-slate-500 mt-3 font-sans text-sm leading-relaxed">
                    Mineur: Informatique graphique
                  </p>
                </li>

                <li className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 bg-slate-950 border-2 border-slate-500 rounded-full"></div>
                  <div className="text-slate-500 font-bold tracking-wider">2018 - 2021</div>
                  <div className="text-white font-bold text-base mt-1 uppercase">Licence Informatique</div>
                  <div className="text-slate-400 mt-1">Université de Toulouse</div>
                </li>
                
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-mono text-lg text-white font-bold mb-6 border-b border-dashed border-white/30 pb-2 flex items-center gap-2">
                <span className="text-purple-500">&gt;</span> SKILLS_
              </h3>
              <div className="flex flex-wrap gap-3 font-mono text-xs">
                {['C', 'C++', 'Python', 'Ponca', 'Eigen', 'CGAL', 'DGtal', 'Polyscope', 'ImGui'].map(tech => (
                  <span key={tech} className="border border-white/30 bg-slate-900/50 px-3 py-1.5 text-slate-200 hover:border-white hover:bg-white hover:text-black transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bouton Download Mobile (Affiché uniquement sur petits écrans) */}
        <div className="mt-10 pt-6 border-t-2 border-white/20 md:hidden flex justify-center">
          {/* <a href={`${import.meta.env.BASE_URL}mon-cv.pdf`} download target="_blank" rel="noopener noreferrer" className="w-full">
            <Button variant="outline" className="w-full rounded-none border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-mono text-sm uppercase h-12 transition-transform hover:-translate-y-1">
              <Download className="w-5 h-5 mr-2" /> [ GET_CV.PDF ]
            </Button>
          </a> */}
          <Button 
            onClick={() => setShowCvPopup(true)}
            variant="outline" 
            className="w-full rounded-none border-2 border-white text-white bg-transparent hover:bg-white hover:text-black font-mono text-sm uppercase h-12 transition-transform hover:-translate-y-1 flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" /> [ GET_CV.PDF ]
          </Button>
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

      </div>
    </div>
  );
};