import { useState } from "react";
// import { Github, Linkedin, Mail, Check, Copy } from "lucide-react";
import { Github, Mail, Check, Copy } from "lucide-react";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const EMAIL = "arnalleo at gmail dot com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative pt-24 pb-12 border-t-2 border-white/20">
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Mon contact
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto font-mono">
             &gt; Connectons-nous...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="group relative border-2 border-white bg-slate-950 p-1 hover:shadow-[4px_4px_0px_0px_white] transition-shadow duration-200">
             <div className="border border-white/20 p-6 flex flex-col items-center gap-4 h-full">
                <Mail className="w-8 h-8 text-white" />
                <div>
                    <h3 className="font-mono font-bold uppercase text-white mb-1">EMAIL.TXT</h3>
                    {/* Zone de copie style Input */}
                    <div 
                        onClick={handleCopyEmail}
                        className="mt-2 flex items-center justify-between gap-2 px-2 py-1 border border-white bg-black cursor-pointer hover:bg-white hover:text-black transition-colors"
                    >
                        <span className="text-xs font-mono">{EMAIL}</span>
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </div>
                </div>
             </div>
          </div>

          {/* LINKEDIN BOX */}
          {/* <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group relative border-2 border-white bg-slate-950 p-1 hover:shadow-[4px_4px_0px_0px_white] transition-shadow duration-200">
             <div className="border border-white/20 p-6 flex flex-col items-center gap-4 h-full">
                <Linkedin className="w-8 h-8 text-white" />
                <div>
                    <h3 className="font-mono font-bold uppercase text-white mb-1">LINKEDIN.EXE</h3>
                  <span className="h-7 rounded-none px-2 font-mono text-[10px] text-slate-500 hover:bg-transparent hover:text-white hover:underline">
                    Connect &gt;
                  </span>

                </div>
             </div>
          </a> */}

          <a href="https://github.com/jmaleo" target="_blank" rel="noreferrer" className="group relative border-2 border-white bg-slate-950 p-1 hover:shadow-[4px_4px_0px_0px_white] transition-shadow duration-200">
             <div className="border border-white/20 p-6 flex flex-col items-center gap-4 h-full">
                <Github className="w-8 h-8 text-white" />
                <div>
                    <h3 className="font-mono font-bold uppercase text-white mb-1">GITHUB.GIT</h3>
                    <span className="h-7 rounded-none px-2 font-mono text-[10px] text-slate-500 hover:bg-transparent hover:text-white hover:underline">
                    Explore &gt;
                  </span>
                </div>
             </div>
          </a>

        </div>

        {/* <div className="pt-12 text-xs font-mono text-slate-500 border-t border-white/10 mt-8">
          <p>SYSTEM STATUS: ONLINE. &copy; {new Date().getFullYear()}</p>
        </div> */}
      </div>
    </footer>
  );
};