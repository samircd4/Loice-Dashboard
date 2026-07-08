export default function Input({
  icon: Icon,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {Icon && (
        <Icon
          size={16}
          className="absolute left-3.5 text-text-muted pointer-events-none"
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        className={`w-full bg-bg-input border border-border rounded-lg h-9 text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-text-muted transition-colors ${
          Icon ? "pl-9 pr-3" : "px-3.5"
        }`}
        {...props}
      />
    </div>
  );
}
