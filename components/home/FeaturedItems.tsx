"use client";

import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { SquareProduct } from "@/lib/square";

export default function FeaturedItems({ products }: { products: SquareProduct[] }) {
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
                    {products.map((product, idx) => (
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
                        href="/shop"
                        className="inline-block text-brand-orange hover:text-brand-brown font-bold text-lg border-b-2 border-brand-orange hover:border-brand-brown transition-colors pb-1"
                    >
                        View All Treats &rarr;
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
