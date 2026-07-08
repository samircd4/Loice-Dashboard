import { useState, useMemo, useEffect } from "react";
import { Sparkles, Link, Plus, Flame, Clock, Leaf } from "lucide-react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import FilterBar from "../components/FilterBar";
import CategoryPills from "../components/CategoryPills";
import BuilderBanner from "../components/BuilderBanner";
import WardrobeGrid from "../components/WardrobeGrid";
import Button from "../components/UI/Button";
import ImportLinkModal from "../components/ImportLinkModal";

const stats = [
    { icon: Flame, title: "Most Worn", description: "Your go-to pieces" },
    { icon: Clock, title: "Forgotten", description: "Haven't worn in 90+ days" },
    {
        icon: Sparkles,
        title: "Recently Added",
        description: "New to your wardrobe",
    },
    { icon: Leaf, title: "Seasonal Picks", description: "Perfect for right now" },
];

export default function Wardrobe() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const savedItems = window.localStorage.getItem("loice-wardrobe-items");

        if (savedItems) {
            setItems(JSON.parse(savedItems));
            setIsLoading(false);
            return;
        }

        fetch("/data/wardrobeItems.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load wardrobe data.");
                }
                return response.json();
            })
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setLoadError(error.message || "Unable to load wardrobe items.");
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            window.localStorage.setItem("loice-wardrobe-items", JSON.stringify(items));
        }
    }, [items]);

    const handleImportItem = (importedItem) => {
        setItems((currentItems) => [importedItem, ...currentItems]);
        setIsImportModalOpen(false);
    };

    const filteredItems = useMemo(() => {
        let result = items;

        if (search.trim()) {
            const query = search.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query),
            );
        }

        if (activeFilter !== "All") {
            if (activeFilter === "Never worn") {
                result = result.filter((item) => item.status === "Never worn");
            } else if (activeFilter === "Summer") {
                result = result.filter((item) =>
                    ["Tops", "Bottoms", "Footwear"].includes(item.category),
                );
            } else if (activeFilter === "Winter") {
                result = result.filter((item) => item.category === "Outerwear");
            } else if (activeFilter === "Work") {
                result = result.filter((item) =>
                    ["Bottoms", "Outerwear"].includes(item.category),
                );
            } else if (activeFilter === "Casual") {
                result = result.filter((item) =>
                    ["Tops", "Bottoms"].includes(item.category),
                );
            }
        }

        return result;
    }, [items, search, activeFilter]);

    return (
        <div className="flex min-h-screen bg-bg-main">
            <Sidebar />

            <main className="flex-1 min-w-0 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-16">
                <div className="max-w-[1300px] w-full" style={{ paddingTop: 32 }}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-7">
                        <div>
                            <h1 className="text-[26px] font-semibold text-text-primary tracking-tight">
                                Wardrobe
                            </h1>
                            <p className="text-[13px] text-text-muted mt-1.5">
                                {items.length} items · Last updated Jul 4
                            </p>
                        </div>
                        <div className="flex items-center gap-5 flex-wrap sm:pt-1">
                            <Button
                                className="h-8 w-50 px-4 text-xs"
                                variant="red-ghost"
                                size="md"
                                icon={Sparkles}
                            >
                                What should I wear?
                            </Button>
                            <Button
                                className="h-8 w-35 px-4 text-xs"
                                variant="secondary"
                                size="md"
                                icon={Link}
                                onClick={() => setIsImportModalOpen(true)}
                            >
                                Import Link
                            </Button>
                            <Button
                                className="h-8 w-30 px-4 text-xs"
                                variant="primary"
                                size="md"
                                icon={Plus}
                            >
                                Add item
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                        style={{ marginBottom: 18 }}
                    >
                        {stats.map((stat) => (
                            <StatCard key={stat.title} {...stat} />
                        ))}
                    </div>

                    {/* Search & Filters */}
                    <div style={{ marginBottom: 18 }}>
                        <FilterBar search={search} onSearchChange={setSearch} />
                    </div>

                    {/* Category Pills */}
                    <div style={{ marginBottom: 20 }}>
                        <CategoryPills
                            itemCount={filteredItems.length}
                            onFilterChange={setActiveFilter}
                        />
                    </div>

                    {/* Builder Banner */}
                    <div style={{ marginBottom: 22 }}>
                        <BuilderBanner />
                    </div>

                    {loadError ? (
                        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 text-sm">
                            {loadError}
                        </div>
                    ) : isLoading ? (
                        <div className="rounded-2xl border border-border bg-bg-card p-6 text-text-muted text-sm text-center">
                            Loading wardrobe items...
                        </div>
                    ) : (
                        <WardrobeGrid items={filteredItems} />
                    )}
                </div>
            </main>

            <ImportLinkModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportItem={handleImportItem}
            />

            {/* FAB */}
            <button
                aria-label="Add item"
                className="fixed bottom-6 right-6 w-[52px] h-[52px] bg-white hover:bg-gray-50 text-black rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.6)] hover:scale-105 flex items-center justify-center transition-all duration-200 cursor-pointer z-30"
            >
                <Plus size={22} strokeWidth={2.5} />
            </button>
        </div>
    );
}
