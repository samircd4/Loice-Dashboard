import { Shirt, Footprints, Layers } from "lucide-react";

const placeholderIcons = {
    Tops: Shirt,
    Bottoms: Layers,
    Outerwear: Shirt,
    Footwear: Footprints,
};

export default function WardrobeCard({ item }) {
    const { title, category, status, image, isPlaceholder, price } = item;
    const PlaceholderIcon = placeholderIcons[category] || Shirt;

    return (
        <article className="bg-[#111111] border border-border rounded-xl overflow-hidden cursor-pointer group hover:border-[#333333] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col h-full min-w-0">
            <div
                className={`relative aspect-[3/4] overflow-hidden w-full ${isPlaceholder ? "bg-[#161616]" : "bg-[#1c1c1c]"
                    }`}
            >
                {isPlaceholder ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5">
                        <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center border border-white/[0.04]">
                            <PlaceholderIcon
                                size={22}
                                className="text-text-muted/50 group-hover:scale-110 transition-transform duration-200"
                                strokeWidth={1.5}
                            />
                        </div>
                        <span className="text-[11px] text-text-muted/65 font-medium tracking-wide uppercase">
                            {category}
                        </span>
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                )}

                {/* Badges */}
                <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-[2px] text-text-primary text-[10px] font-semibold px-2 py-0.5 rounded border border-white/5 tracking-wide">
                    {category}
                </span>

                {status && (
                    <span className="absolute top-2.5 right-2.5 bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-[0_2px_6px_rgba(224,49,49,0.3)]">
                        {status}
                    </span>
                )}
            </div>

            {/* Info Area */}
            <div className="px-5 py-3.5 border-t border-border/20 flex flex-col justify-between flex-grow bg-[#111111] min-w-0">
                <p className="text-[13px] font-medium text-text-primary leading-snug truncate group-hover:text-white transition-colors duration-150">
                    {title}
                </p>
                <div className="flex items-center justify-between mt-1.5 gap-2">
                    {status && (
                        <p className="text-[11px] text-text-muted mt-1.5 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/40 inline-block"></span>
                            {status}
                        </p>
                    )}
                    {price ? <p className="text-[12px] text-text-primary font-semibold">{price}</p> : null}
                </div>
            </div>
        </article>
    );
}
