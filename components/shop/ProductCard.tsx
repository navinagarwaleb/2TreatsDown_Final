"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { SquareProduct } from "@/lib/square";
import { Minus, Plus } from "lucide-react";

export default function ProductCard(product: SquareProduct) {
    const { id, title, price, description, imageUrl } = product;
    const { items, addItem, removeItem, updateQuantity } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Safely ensure only a single dollar sign is displayed
    const formattedPrice = price.startsWith("$") ? price : `$${price}`;
    
    const cartItem = items.find((i) => i.product.id === id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <div className="group flex flex-col h-full bg-transparent">
            {/* Image Container with rounded-2xl corners matching inspiration */}
            <Link 
                href={`/shop/item/${id}`} 
                className="relative w-full aspect-square overflow-hidden rounded-2xl bg-washi block shadow-[0_4px_20px_-4px_rgba(15,22,35,0.05)] border border-sumi/5"
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-text-roll"
                />
            </Link>

            {/* Product Details stacked below the image */}
            <div className="pt-5 flex flex-col flex-grow text-left">
                {/* Small tracking-widest label */}
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-clay-rose mb-2 block">
                    All-Natural Treat
                </span>

                {/* Title and Price standing out */}
                <div className="space-y-1 mb-2">
                    <Link href={`/shop/item/${id}`} className="block hover:text-clay-rose transition-colors duration-300">
                        <h3 className="font-heading text-2xl font-bold tracking-tight text-sumi leading-tight">
                            {title}
                        </h3>
                    </Link>
                    <span className="font-sans text-base font-semibold text-sumi/90 block">
                        {formattedPrice}
                    </span>
                </div>
                
                {/* Description */}
                {description && (
                    <p className="font-sans text-xs text-sumi/60 line-clamp-2 mb-4 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Actions container at the bottom */}
                <div className="mt-auto pt-4 flex flex-col gap-3">
                    <Link 
                        href={`/shop/item/${id}`} 
                        className="inline-flex items-center gap-1 text-clay-rose hover:text-sumi font-sans text-xs font-semibold uppercase tracking-wider transition-colors pb-1 border-b border-clay-rose/25 hover:border-sumi self-start"
                    >
                        View Details &rarr;
                    </Link>

                    {/* Quick Add Widget */}
                    {!isMounted ? (
                        <div className="w-full bg-brand-pink/50 text-brand-dark/50 py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 select-none">
                            Add to Cart
                        </div>
                    ) : quantity === 0 ? (
                        <button
                            onClick={() => addItem(product)}
                            className="w-full bg-brand-pink hover:bg-brand-brown text-brand-dark hover:text-white transition-colors duration-300 py-2.5 px-4 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-brand-main border border-brand-pink rounded-xl p-1.5 w-full">
                            <button
                                onClick={() => {
                                    if (quantity === 1) {
                                        removeItem(id);
                                    } else {
                                        updateQuantity(id, quantity - 1);
                                    }
                                }}
                                className="p-1.5 hover:bg-brand-pink rounded-lg transition-colors text-brand-dark/70 hover:text-brand-dark flex items-center justify-center cursor-pointer min-w-[28px] min-h-[28px]"
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-brand-dark text-xs">{quantity} in Cart</span>
                            <button
                                onClick={() => updateQuantity(id, quantity + 1)}
                                className="p-1.5 hover:bg-brand-pink rounded-lg transition-colors text-brand-dark/70 hover:text-brand-dark flex items-center justify-center cursor-pointer min-w-[28px] min-h-[28px]"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
