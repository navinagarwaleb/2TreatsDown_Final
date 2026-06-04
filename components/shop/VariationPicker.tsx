"use client";

import { SquareVariation } from "@/lib/square";

export default function VariationPicker({
    variations,
    selectedId,
    onSelect,
}: {
    variations: SquareVariation[];
    selectedId: string;
    onSelect: (id: string) => void;
}) {
    if (variations.length <= 1) return null;

    return (
        <div>
            <p className="text-sm font-semibold text-brand-dark/70 mb-3">Size</p>
            <div className="flex gap-3">
                {variations.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => onSelect(v.id)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 border-2 cursor-pointer ${
                            selectedId === v.id
                                ? "bg-brand-brown text-white border-brand-brown shadow-lg"
                                : "bg-white text-brand-dark border-brand-pink hover:border-brand-brown hover:bg-brand-pink/20"
                        }`}
                    >
                        <span className="block">{v.name}</span>
                        <span className={`block text-xs mt-0.5 ${selectedId === v.id ? "text-white/70" : "text-brand-dark/50"}`}>
                            {v.price}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
