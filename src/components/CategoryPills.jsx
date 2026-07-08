import { useState } from "react";
import Pill from "./UI/Pill";

const categories = ["All", "Summer", "Winter", "Work", "Casual", "Never worn"];

export default function CategoryPills({ itemCount = 32, onFilterChange }) {
  const [active, setActive] = useState("All");

  const handleClick = (cat) => {
    setActive(cat);
    onFilterChange?.(cat);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center w-full gap-2 overflow-x-auto pb-0.5 scrollbar-none">
        {categories.map((cat) => (
          <Pill
            key={cat}
            active={active === cat}
            onClick={() => handleClick(cat)}
          >
            {cat}
          </Pill>
        ))}
      </div>
      <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
        {itemCount} items
      </span>
    </div>
  );
}
