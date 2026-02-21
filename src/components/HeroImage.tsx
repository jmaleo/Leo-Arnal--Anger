import { cn } from "@/lib/utils";
import { Maximize2, Minimize2, X } from "lucide-react";

interface HeroImageProps {
  className?: string;
}

const WindowTitleBar = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between border-b-2 border-white bg-slate-900 px-2 py-1 transition-colors duration-0 group-hover:bg-white group-hover:text-black shrink-0">
    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
      {title}
    </span>
    <div className="flex gap-1">
      <div className="flex h-3 w-3 items-center justify-center border border-current"><Minimize2 className="h-2 w-2" /></div>
      <div className="flex h-3 w-3 items-center justify-center border border-current"><Maximize2 className="h-2 w-2" /></div>
      <div className="flex h-3 w-3 items-center justify-center border border-current bg-current text-slate-900 group-hover:bg-black group-hover:text-white"><X className="h-2 w-2" /></div>
    </div>
  </div>
);

export const HeroImage = ({ className }: HeroImageProps) => {
  return (
    <div className={cn(
      "group relative select-none border-2 border-white bg-slate-950 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white]", 
      className
    )}>
      <WindowTitleBar title="PORTRAIT.JPG" />
      
      <div className="relative overflow-hidden p-1">
        <img
          src="/photo2.jpg" 
          alt="Me"
          className={cn(
            "w-full h-auto object-cover grayscale contrast-125 transition-all duration-500",
            "group-hover:grayscale-0 group-hover:contrast-100"
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
      </div>
    </div>
  );
};

export const HeroImageRound = ({ className }: HeroImageProps) => {
  return (
    <div className={cn(
      "group relative select-none border-2 border-white bg-slate-950 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white] flex flex-col", 
      className
    )}>
      <WindowTitleBar title="PHOTO.JPG" />
      
      <div className="relative flex-1 w-full h-full overflow-hidden p-1 bg-slate-900">
        <img
          src={`${import.meta.env.BASE_URL}photo2.jpg`} 
          alt="Me"
          className={cn(
            "w-full h-full object-cover grayscale contrast-125 transition-all duration-500",
            "group-hover:grayscale-0 group-hover:scale-105"
          )}
        />
      </div>
    </div>
  );
};