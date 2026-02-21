import publicationsData from "@/data/publications.json";
import { PublicationCard, type HalDoc } from "@/components/PublicationCard";
import { useMemo } from "react";

const BLACKLIST = ["blablabla"];

export const PublicationsSection = () => {
  const groupedPublications = useMemo(() => {
    const allDocs = publicationsData.response.docs as HalDoc[];
    const filtered = allDocs.filter(doc => {
      const title = doc.title_s[0];
      if (BLACKLIST.some(blocked => title.includes(blocked))) return false;
      return true;
    });
    filtered.sort((a, b) => b.producedDateY_i - a.producedDateY_i);
    const groups: Record<number, HalDoc[]> = {};
    filtered.forEach(doc => {
      const year = doc.producedDateY_i;
      if (!groups[year]) groups[year] = [];
      groups[year].push(doc);
    });
    return groups;
  }, []);

  const sortedYears = Object.keys(groupedPublications)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div id="publications" className="scroll-mt-32 space-y-16">
      <div className="space-y-4 md:space-y-6 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Publications</h2>
        <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto md:mx-0 font-mono">
           &gt; Mes contributions.
        </p>
      </div>

      <div className="space-y-12">
        {sortedYears.map((year) => (
          <div key={year} className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* COLONNE ANNÉE (Sticky) */}
            <div className="md:col-span-2 relative">
              <div className="sticky top-32 flex flex-row md:flex-col items-baseline md:items-start gap-3">
                <span className="font-special text-4xl md:text-5xl font-bold text-white/20 select-none font-mono">
                  {year}
                </span>
                <div className="h-px bg-white/10 flex-1 md:hidden"></div>
              </div>
            </div>

            <div className="md:col-span-10 grid grid-cols-1 gap-6">
              {groupedPublications[year].map((pub, index) => (
                <PublicationCard key={index} data={pub} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};