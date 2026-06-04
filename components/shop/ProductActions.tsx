"use client";

import { useState } from "react";
import { SquareProduct, SquareVariation } from "@/lib/square";
import VariationPicker from "./VariationPicker";
import AddToCartButton from "./AddToCartButton";

export default function ProductActions({ product }: { product: SquareProduct }) {
    const [selectedVariationId, setSelectedVariationId] = useState(
        product.variations.length > 0 ? product.variations[0].id : ""
    );

    const selectedVariation = product.variations.find(v => v.id === selectedVariationId);
    const displayPrice = selectedVariation?.price ?? product.price;

    return (
        <div className="space-y-6">
            <VariationPicker
                variations={product.variations}
                selectedId={selectedVariationId}
                onSelect={setSelectedVariationId}
            />

            <div className="pt-4 border-t border-brand-pink">
                <p className="text-3xl font-bold font-sans text-brand-orange mb-6">
                    {displayPrice}
                </p>
                <AddToCartButton
                    product={product}
                    variationId={selectedVariationId}
                    variationName={selectedVariation?.name}
                />
                <p className="text-center text-sm text-brand-dark/50 mt-4">
                    Local Kanata Pickup Only &bull; Allow 48 hours for fresh baking
                </p>
            </div>
        </div>
    );
}
