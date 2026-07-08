export default function Pill({
  children,
  active = false,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`h-9 min-w-20 px-5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
        active
          ? "bg-accent text-white shadow-[0_2px_8px_rgba(224,49,49,0.35)]"
          : "bg-bg-card text-text-secondary hover:text-text-primary border border-border hover:border-text-muted/30"
      } ${className}`}
    >
      {children}
    </button>
  );
}
