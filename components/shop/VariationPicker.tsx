"use client";

import { SquareProduct } from "@/lib/square";

interface VariationPickerProps {
    product: SquareProduct;
    selectedVariationId?: string | null;
    onSelect?: (variationId: string, variationName: string, priceCents: number) => void;
}

export default function VariationPicker({ product, selectedVariationId, onSelect }: VariationPickerProps) {
    const currentId = selectedVariationId || (product.variations.length > 0 ? product.variations[0].id : null);
    const currentVariation = product.variations.find(v => v.id === currentId);

    if (product.variations.length <= 1) {
        return (
            <p className="text-3xl font-bold font-sans text-brand-orange">
                {product.price}
            </p>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-3xl font-bold font-sans text-brand-orange">
                {currentVariation?.price || product.price}
            </p>
            <div className="flex flex-wrap gap-3">
                {product.variations.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => onSelect?.(v.id, v.name, v.priceCents)}
                        className={\`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border-2 \${
                            currentId === v.id
                                ? "bg-brand-orange text-white border-brand-orange shadow-md"
                                : "bg-white text-brand-dark border-brand-pink/50 hover:border-brand-orange hover:text-brand-orange"
                        }\`}
                    >
                        {v.name} - {v.price}
                    </button>
                ))}
            </div>
        </div>
    );
}
