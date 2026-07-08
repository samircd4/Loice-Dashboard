import WardrobeCard from "./WardrobeCard";

export default function WardrobeGrid({ items = [] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-text-secondary text-sm">No items found</p>
        <p className="text-text-muted text-xs mt-1">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-6">
      {items.map((item) => (
        <WardrobeCard key={item.id} item={item} />
      ))}
    </div>
  );
}
