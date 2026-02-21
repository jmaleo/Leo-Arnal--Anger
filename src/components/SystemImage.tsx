import { cn } from "@/lib/utils";
import { Maximize2, Minimize2, X } from "lucide-react";

interface SystemImageProps {
  src: string;
  alt: string;
  caption?: string;
  filename?: string;
  className?: string;
}

export const SystemImage = ({ src, alt, caption, filename = "IMAGE.BMP", className }: SystemImageProps) => {
  return (
    <div className={cn("my-8 border-2 border-white bg-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", className)}>
      
      {/* Barre de titre de l'image */}
      <div className="flex items-center justify-between border-b-2 border-white bg-slate-900 px-2 py-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
          {filename}
        </span>
        <div className="flex gap-1 text-white">
          <div className="flex h-3 w-3 items-center justify-center border border-current"><Minimize2 className="h-2 w-2" /></div>
          <div className="flex h-3 w-3 items-center justify-center border border-current"><Maximize2 className="h-2 w-2" /></div>
          <div className="flex h-3 w-3 items-center justify-center border border-current"><X className="h-2 w-2" /></div>
        </div>
      </div>

      {/* Conteneur de l'image */}
      <div className="relative p-2 bg-slate-900">
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto object-cover border border-white/20 grayscale contrast-125 transition-all duration-500 hover:grayscale-0 hover:contrast-100"
        />
        {/* Effet trame */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-50"></div>
      </div>

      {/* Légende */}
      {caption && (
        <div className="border-t-2 border-white/20 bg-slate-950 p-2">
          <p className="font-mono text-xs text-slate-400">
            <span className="text-green-500 mr-2">&gt;</span>{caption}
          </p>
        </div>
      )}
    </div>
  );
};