import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Github,
  Gitlab,
  Youtube,
  MonitorPlay,
  Minimize2,
  Maximize2,
  X,
  ImageOff
} from "lucide-react";

export interface HalDoc {
  title_s: string[];
  journalTitle_s?: string;
  conferenceTitle_s?: string;
  authFullName_s: string[];
  producedDateY_i: number;
  uri_s: string;       
  docType_s: string;   
  fileMain_s?: string; 
  seeAlso_s?: string[]; 
  thumbId_i?: number;
  localImage?: string; 
}

const MY_NAMES = [
  "Léo Arnal--Anger",
  "L. Arnal--Anger",
  "Leo Arnal--Anger",
  "Léo Arnal-Anger",
  "Léo Arnal",
  "L. Arnal"
];

const TYPE_MAPPING: Record<string, string> = {
  ART: "JOURNAL.EXE",
  COMM: "CONF.BAT",
  THESE: "THESIS.SYS",
  HDR: "HDR.DLL",
  POSTER: "POSTER.IMG",
  OUV: "BOOK.TXT",
  COUV: "CHAPTER.DOC",
  DOUV: "DIR.LOG",
  PATENT: "PATENT.REG",
  SOFTWARE: "SOFT.BIN",
  REPORT: "REPORT.LOG",
  UNDEFINED: "FILE"
};

const getLinkType = (url: string) => {
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.includes("github.io")) return { icon: ArrowUpRight, label: "WEB" };
  if (lowerUrl.includes("site")) return { icon: ArrowUpRight, label: "WEB" };
  if (lowerUrl.includes("github.com")) return { icon: Github, label: "GIT" };
  if (lowerUrl.includes("gitlab.com")) return { icon: Gitlab, label: "LAB" };
  if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be")) return { icon: Youtube, label: "MP4" };
  if (lowerUrl.includes("demo") || lowerUrl.includes("app.")) return { icon: MonitorPlay, label: "RUN" };
  return null; 
};

export const PublicationCard = ({ data }: { data: HalDoc }) => {
  
  const venue = data.journalTitle_s || data.conferenceTitle_s;
  const filename = TYPE_MAPPING[data.docType_s] || "FILE.DAT";
  
  const allLinks = data.seeAlso_s || [];
  const doiLink = allLinks.find(link => link.toLowerCase().includes("doi"));
  const otherLinks = allLinks.filter(link => !link.toLowerCase().includes("doi"));

  // --- LOGIQUE DE L'IMAGE FLOTTANTE ---
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const imageSrc = data.localImage || `${import.meta.env.BASE_URL}publications_images/${data.title_s[0]}.png`;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {/* 1. L'IMAGE FLOTTANTE */}
      {isHovering && (
        <div 
          className="fixed z-50 pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95"
          style={{ 
            top: mousePos.y + 20,
            left: mousePos.x + 20, 
            width: "200px"
          }}
        >
          {/* Popup */}
          <div className="border-2 border-white bg-slate-950 p-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
             {/* Header de la preview */}
             <div className="bg-white text-black px-1 mb-1 flex justify-between items-center">
                <span className="font-mono text-[8px] font-bold uppercase">PREVIEW.PNG</span>
             </div>
             
             {/* Contenu Image */}
             <div className="aspect-video w-full overflow-hidden bg-slate-900 border border-white/20 flex items-center justify-center relative">
                {!imageError ? (
                  <img 
                    src={imageSrc} 
                    alt="Preview" 
                    className="w-full h-full object-cover contrast-125"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 relative">
                     <div className="absolute inset-0 border-t border-l border-transparent">
                        <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 stroke-1">
                           <line x1="0" y1="0" x2="100" y2="100" />
                           <line x1="100" y1="0" x2="0" y2="100" />
                        </svg>
                     </div>
                     <ImageOff className="w-6 h-6 text-white/40 z-10" />
                     <span className="absolute bottom-1 right-1 font-mono text-[8px] text-red-500 uppercase">NO_DATA</span>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}

      {/* 2. LA CARTE PRINCIPALE */}
      <div 
        className="group relative w-full border-2 border-white bg-slate-950 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_white] cursor-crosshair"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        
        {/* BARRE DE TITRE */}
        <div className="flex items-center justify-between border-b-2 border-white bg-slate-900 px-2 py-1 transition-colors duration-0 group-hover:bg-white group-hover:text-black">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="opacity-60">[{data.producedDateY_i}]</span>
            <span>{filename}</span>
          </div>
          <div className="flex gap-1">
            <div className="flex h-3 w-3 items-center justify-center border border-current"><Minimize2 className="h-2 w-2" /></div>
            <div className="flex h-3 w-3 items-center justify-center border border-current"><Maximize2 className="h-2 w-2" /></div>
            <div className="flex h-3 w-3 items-center justify-center border border-current bg-current text-slate-900 group-hover:bg-black group-hover:text-white"><X className="h-2 w-2" /></div>
          </div>
        </div>

        {/* CORPS */}
        <div className="flex flex-col md:flex-row gap-6 p-5">
          <div className="flex-1 space-y-4">
              <h3 className="font-mono text-xl font-bold uppercase leading-tight text-white group-hover:underline decoration-2 underline-offset-4">
                  {data.title_s[0]}
              </h3>

              <div className="font-mono text-xs text-slate-400 leading-relaxed">
                  <span className="mr-2 select-none text-slate-600">&gt; AUTHORS:</span>
                  {data.authFullName_s.map((author, index) => {
                      const isMe = MY_NAMES.some(name => author.includes(name));
                      return (
                      <span key={index}>
                          {isMe ? (
                          <span className="bg-white px-1 text-black font-bold">
                              {author}
                          </span>
                          ) : (
                          <span>{author}</span>
                          )}
                          {index < data.authFullName_s.length - 1 && ", "}
                      </span>
                      );
                  })}
              </div>

              {venue && (
                  <div className="font-mono text-xs text-slate-400">
                      <span className="mr-2 select-none text-slate-600">&gt; SOURCE_:</span>
                      <span className="italic">{venue}</span>
                  </div>
              )}
          </div>
        </div>

        {/* BARRE D'ACTIONS */}
        <div className="flex flex-wrap gap-2 border-t border-white/20 bg-slate-900/50 p-3">
              {data.fileMain_s && (
              <a href={data.fileMain_s} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="h-7 rounded-none border border-white bg-transparent font-mono text-[10px] text-white hover:bg-white hover:text-black">
                    [ DOWNLOAD_PDF ]
                  </Button>
              </a>
              )}

              {doiLink && (
              <a href={doiLink} target="_blank" rel="noreferrer">
                  <Button variant="outline" size="sm" className="h-7 rounded-none border border-white bg-transparent font-mono text-[10px] text-white hover:bg-white hover:text-black">
                    [ OPEN_DOI ]
                  </Button>
              </a>
              )}

              {otherLinks.map((link, i) => {
                  const type = getLinkType(link);
                  if (!type) return null;
                  return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="sm" className="h-7 rounded-none border border-white bg-transparent font-mono text-[10px] text-white hover:bg-white hover:text-black">
                            [ {type.label} ]
                          </Button>
                      </a>
                  );
              })}

              <a href={data.uri_s} target="_blank" rel="noreferrer" className="ml-auto">
                  <Button variant="ghost" size="sm" className="h-7 rounded-none px-2 font-mono text-[10px] text-slate-500 hover:bg-transparent hover:text-white hover:underline">
                    hal.science &gt;
                  </Button>
              </a>
        </div>
      </div>
    </>
  );
};