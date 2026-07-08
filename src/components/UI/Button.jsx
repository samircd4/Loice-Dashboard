const variants = {
  primary:
    "bg-accent hover:bg-accent-hover text-white font-medium shadow-[0_2px_8px_rgba(224,49,49,0.3)]",
  secondary:
    "bg-bg-card hover:bg-bg-card-hover text-text-primary border border-border font-medium",
  ghost:
    "bg-bg-card hover:bg-bg-card-hover text-text-primary font-medium border border-transparent hover:border-border",
  "red-ghost":
    "bg-accent/[0.07] hover:bg-accent/[0.12] text-accent border border-accent/20 hover:border-accent/35 font-medium",
  fab: "bg-white hover:bg-gray-100 text-black shadow-lg",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-5 py-2.5 text-sm rounded-lg gap-2",
  icon: "p-3 rounded-full",
};

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={size === "sm" ? 14 : 16} strokeWidth={1.75} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={size === "sm" ? 14 : 16} strokeWidth={1.75} />
      )}
    </button>
  );
}
