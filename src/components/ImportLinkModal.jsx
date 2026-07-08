import { useEffect, useState } from "react";
import { Link, Shirt, X } from "lucide-react";
import Button from "./UI/Button";
import Input from "./UI/Input";

const API_BASE_URL = import.meta.env.DEV
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL || "https://api.sarker.shop";

function resolveEndpoint(productUrl) {
    const normalizedUrl = productUrl.toLowerCase();

    if (normalizedUrl.includes("cos.com")) return "/extract-cos";
    if (normalizedUrl.includes("zara.com")) return "/extract-zara";
    if (normalizedUrl.includes("asos.com")) return "/extract-asos";

    throw new Error("Unsupported URL. Please use an ASOS, Zara, or COS product link.");
}

function inferCategory(title = "") {
    const normalizedTitle = title.toLowerCase();

    if (/trouser|pants|shorts|skirt|jeans|leggings|dress/.test(normalizedTitle)) {
        return "Bottoms";
    }

    if (/jacket|coat|blazer|hoodie|sweater|cardigan|overshirt|parka|puffer/.test(normalizedTitle)) {
        return "Outerwear";
    }

    if (/shoe|sneaker|boot|loafer|heel|trainer|sandals/.test(normalizedTitle)) {
        return "Footwear";
    }

    return "Tops";
}

export default function ImportLinkModal({ isOpen, onClose, onImportItem }) {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        const trimmedUrl = url.trim();

        if (!trimmedUrl) return;

        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = resolveEndpoint(trimmedUrl);
            const params = new URLSearchParams({ product_url: trimmedUrl });
            const response = await fetch(`${API_BASE_URL}${endpoint}?${params.toString()}`);

            if (!response.ok) {
                throw new Error("We could not import that product link right now.");
            }

            const data = await response.json();
            const importedItem = {
                id: Date.now(),
                title: data.title || "Imported item",
                category: inferCategory(data.title || ""),
                status: "Never worn",
                image: data.image_url || "",
                isPlaceholder: !data.image_url,
                price: data.price || null,
                brand: data.brand || null,
                sourceUrl: data.url || trimmedUrl,
            };

            onImportItem(importedItem);
            setUrl("");
            onClose();
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong while importing this link.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-md bg-bg-card border border-border rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                <Link size={16} className="text-accent" strokeWidth={1.75} />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-text-primary">
                                    Import from Link
                                </h2>
                                <p className="text-xs text-text-muted mt-1">
                                    Paste a product URL to add to your wardrobe
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="w-8 h-8 rounded-full bg-bg-card-hover hover:bg-[#222222] border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors cursor-pointer flex-shrink-0"
                        >
                            <X size={16} strokeWidth={1.75} />
                        </button>
                    </div>

                    <div className="mb-6">
                        <label className="block text-[10px] font-semibold tracking-wider text-text-muted uppercase mb-2">
                            Product URL
                        </label>
                        <Input
                            icon={Link}
                            placeholder="https://www.asos.com/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="[&_input]:h-10 [&_input]:border-accent/40 [&_input]:focus:border-accent"
                        />
                        <p className="text-[11px] text-text-muted mt-2.5 leading-relaxed">
                            Supported: ASOS, Zara, COS, H&M, Mango, ARKET, Net-a-Porter,
                            FARFETCH, and more
                        </p>
                    </div>

                    {errorMessage && (
                        <p className="text-[11px] text-red-400 mb-3">{errorMessage}</p>
                    )}

                    <Button
                        variant="primary"
                        size="md"
                        icon={Shirt}
                        className="w-full h-10 text-sm"
                        disabled={!url.trim() || isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? "Importing..." : "Add to My Wardrobe"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
