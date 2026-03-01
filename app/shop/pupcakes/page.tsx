"use client";

import ProductCard from "@/components/shop/ProductCard";
import { motion } from "framer-motion";

const pupcakes = [
    {
        id: 1,
        title: "Peanut Butter & Carrot",
        price: "$32.00 / 4-pack",
        description: "Classic pupcakes with our signature cream cheese frosting.",
        imageUrl: "https://images.unsplash.com/photo-1541364983171-a8ba01e9d7ce?auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "Sweet Potato Delight",
        price: "$34.00 / 4-pack",
        description: "Gentle on the tummy and naturally sweet. Frosting colors vary.",
        imageUrl: "https://images.unsplash.com/photo-1579737118552-44ce1db8d4cb?auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        title: "Mini PB Bites (12-pack)",
        price: "$28.00 / dozen",
        description: "Perfect bite-sized treats for small dogs or training rewards.",
        imageUrl: "https://images.unsplash.com/photo-1623356075306-38fed53e1a0b?auto=format&fit=crop&q=80",
    },
];

export default function ShopPupcakes() {
    return (
        <div className="container mx-auto px-4 max-w-7xl py-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6 text-center">Shop Pupcakes</h1>
            <p className="text-center text-lg text-brand-dark/70 max-w-2xl mx-auto mb-16">
                Gourmet, freshly baked mini cakes for your furry friend. Made entirely with dog-safe ingredients and lots of love. Perfect for parties!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pupcakes.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                    >
                        <ProductCard {...item} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
