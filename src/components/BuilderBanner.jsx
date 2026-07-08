import { Shirt, Sparkles } from "lucide-react";

export default function BuilderBanner() {
  return (
    <div className="min-h-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#111111] border border-border rounded-xl px-4 py-3 hover:border-[#333333] transition-colors duration-200 group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/10 transition-all duration-200">
          <Shirt size={15} className="text-accent group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-xs font-semibold text-text-primary group-hover:text-white transition-colors duration-150">
            Build an outfit from your wardrobe
          </p>
          <p className="text-[10px] text-text-muted mt-0.5">
            Mix and match pieces, then save the look
          </p>
        </div>
      </div>
      <button className="h-8 inline-flex items-center justify-center gap-2 bg-[#070707] hover:bg-[#181818] border border-[#262626] text-text-primary text-xs font-semibold px-3 rounded-lg transition-colors cursor-pointer flex-shrink-0 self-start sm:self-auto hover:border-[#3a3a3a]">
        <Sparkles size={13} className="text-accent" strokeWidth={1.75} />
        Open Builder
      </button>
    </div>
  );
}
