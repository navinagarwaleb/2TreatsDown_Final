"use client";

import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";

const featuredProducts = [
    {
        id: 1,
        title: "Peanut Butter Pupcakes (4-Pack)",
        price: "$32.00",
        description: "Classic peanut butter and carrot cake with our signature cream cheese frosting. Safe and delicious.",
        imageUrl: "https://images.unsplash.com/photo-1579737118552-44ce1db8d4cb?auto=format&fit=crop&q=80",
    },
    {
        id: 2,
        title: "Sweet Potato Chews",
        price: "$12.00",
        description: "Single ingredient, limited batch sweet potato chews. Great for sensitive tummies.",
        imageUrl: "https://images.unsplash.com/photo-1541364983171-a8ba01e9d7ce?auto=format&fit=crop&q=80",
    },
    {
        id: 3,
        title: "Chicken Jerky Strips",
        price: "$18.00",
        description: "High-protein, 100% chicken breast dehydrated to perfection. No preservatives.",
        imageUrl: "https://images.unsplash.com/photo-1623356075306-38fed53e1a0b?auto=format&fit=crop&q=80",
    },
];

export default function FeaturedItems() {
    return (
        <section className="bg-white py-24">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-4xl font-heading font-bold text-brand-dark mb-4">
                            Pup-Approved Favorites
                        </h2>
                        <p className="text-lg text-brand-dark/70">
                            Hand-crafted with love, using only the finest, all-natural ingredients. No hidden nasties, just pure joy in every bite.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/shop/treats"
                        className="inline-block text-brand-orange hover:text-brand-brown font-bold text-lg border-b-2 border-brand-orange hover:border-brand-brown transition-colors pb-1"
                    >
                        View All Treats &rarr;
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
