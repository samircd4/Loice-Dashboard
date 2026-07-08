export default function StatCard({ icon: Icon, title, description }) {
  return (
    <div className="h-11 flex items-center gap-3 bg-[#111111] border border-border rounded-xl px-3.5 cursor-pointer hover:bg-bg-card-hover hover:border-[#333333] transition-all duration-150 group">
      <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 group-hover:border-accent/10 transition-colors duration-200">
        <Icon size={14} className="text-accent group-hover:scale-110 transition-transform duration-200" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-text-primary group-hover:text-white transition-colors duration-150">{title}</p>
        <p className="text-[10px] text-text-muted truncate mt-0.5 leading-none">{description}</p>
      </div>
    </div>
  );
}
