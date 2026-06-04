"use client";

import { useState } from "react";
import { SquareProduct } from "@/lib/square";
import AddToCartButton from "./AddToCartButton";
import VariationPicker from "./VariationPicker";

interface ProductActionsProps {
    product: SquareProduct;
}

export default function ProductActions({ product }: ProductActionsProps) {
    const [selectedVariationId, setSelectedVariationId] = useState<string | null>(
        product.variations.length > 0 ? product.variations[0].id : null
    );
    const [selectedVariationName, setSelectedVariationName] = useState<string | null>(
        product.variations.length > 0 ? product.variations[0].name : null
    );

    const handleVariationSelect = (id: string, name: string) => {
        setSelectedVariationId(id);
        setSelectedVariationName(name);
    };

    return (
        <>
            <VariationPicker product={product} selectedVariationId={selectedVariationId} onSelect={handleVariationSelect} />
            <div className="pt-4 mt-6 border-t border-brand-pink">
                <AddToCartButton
                    product={product}
                    variationId={selectedVariationId || undefined}
                    variationName={selectedVariationName || undefined}
                />
                <p className="text-center text-sm text-brand-dark/50 mt-4">
                    Local Kanata Pickup Only &bull; Allow 48 hours for fresh baking
                </p>
            </div>
        </>
    );
}
