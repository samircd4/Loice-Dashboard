import { ChevronDown } from "lucide-react";
import Input from "./UI/Input";

const filters = ["All Categories", "All Seasons", "All Occasions"];

export default function FilterBar({ search, onSearchChange }) {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-10">
      <Input
        placeholder="Search wardrobe..."
        className="flex-1"
        value={search}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
      <div className="flex items-center gap-5 overflow-x-auto scrollbar-none flex-shrink-0">
        {filters.map((filter) => (
          <button
            key={filter}
            className="h-9 w-30 flex items-center justify-center gap-2 bg-bg-card border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary hover:border-text-muted/40 transition-all cursor-pointer whitespace-nowrap"
          >
            {filter}
            <ChevronDown size={14} className="text-text-muted" />
          </button>
        ))}
      </div>
    </div>
  );
}
