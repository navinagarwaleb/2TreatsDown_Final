"use client";

import { useCartStore } from "@/store/useCartStore";
import { SquareProduct } from "@/lib/square";
import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ product }: { product: SquareProduct }) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem(product, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={added}
            className={`relative w-full overflow-hidden transition-all duration-300 py-4 px-8 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-3 ${added
                ? "bg-brand-brown text-white"
                : "bg-brand-orange hover:bg-brand-brown text-brand-dark hover:text-white"
                }`}
        >
            <motion.div
                initial={false}
                animate={added ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
            >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
            </motion.div>
            <motion.div
                initial={false}
                animate={added ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
            >
                <Check className="w-6 h-6 text-brand-pink" />
                Added!
            </motion.div>
        </button>
    );
}
