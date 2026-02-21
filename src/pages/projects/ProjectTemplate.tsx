import { ProjectLayout } from "@/layouts/ProjectLayout";
import { SystemImage } from "@/components/SystemImage";
import { HoverWord } from "@/components/HoverWord";
import { PROJECTS_DB } from "@/data/projects";

export const ProjectTemplate = () => {
  const projectData = PROJECTS_DB.find(p => p.id === "Template");

  if (!projectData) return null;

  return (
    <ProjectLayout project={projectData}>
      
      {/* BOÎTE 1 */}
      <div className="relative bg-slate-950/80 border border-white/30 backdrop-blur-md p-8 shadow-2xl">
        {/* petits carrés aux coins */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border border-white"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border border-white"></div>

        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">CONTEXTE.MD</span>
        </div>

        <div className="text-slate-300 text-lg leading-relaxed font-light space-y-4">
          <p>
            Actuellement en<HoverWord className="text-white font-bold">travaux</HoverWord>: n'hésitez pas à revenir plus tard pour découvrir ce qu'il se<HoverWord className="text-white font-bold">trame</HoverWord>.
          </p>
{/* 
          <ul className="list-none space-y-2 border-l-2 border-white/20 pl-4 font-mono text-sm">
             <li>&gt; Point 1 : pt1</li>
             <li>&gt; Point 2 : pt2</li>
             <li>&gt; Point 3 : pt3</li>
          </ul> */}
        </div>

          <div className="flex flex-col items-center space-y-4 mb-16">
            <SystemImage 
              src={`${import.meta.env.BASE_URL}travaux.png`} 
              alt="Actuellement en travaux."
              filename="EN_TRAVAUX.PNG"
              caption="Page en travaux."
              className="w-full max-w-md"
            />
          </div>
      </div>

      {/* BOÎTE 2 */}
      <div className="relative bg-slate-950/80 border border-white/30 backdrop-blur-md p-8 shadow-2xl mt-12">

         <div className="text-slate-300">
            Blablablabla !
         </div>
      </div>

    </ProjectLayout>
  );
};