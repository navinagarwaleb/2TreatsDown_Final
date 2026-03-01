"use client";

import ProductCard from "@/components/shop/ProductCard";
import { motion } from "framer-motion";
import { SquareProduct } from "@/lib/square";

export default function ProductGrid({ items }: { items: SquareProduct[] }) {
    if (items.length === 0) {
        return (
            <p className="text-center text-brand-dark/50 text-xl py-12">
                No treats available at the moment. Please check back soon!
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
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
    );
}
