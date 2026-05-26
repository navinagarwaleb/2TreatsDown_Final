"use client";

import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { SquareProduct } from "@/lib/square";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

export default function FeaturedItems({ products }: { products: SquareProduct[] }) {
    return (
        <section className="bg-surface py-24 border-b border-sumi/10">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl font-heading font-bold text-sumi">
                        <WordSlideUp text="Pup-Approved Favorites" />
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg text-sumi/70"
                    >
                        Hand-crafted with love, using only the finest, all-natural ingredients. No hidden nasties, just pure joy in every bite.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
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
                        className="inline-block text-clay-rose hover:text-sumi font-sans text-xs font-semibold uppercase tracking-wider border-b border-clay-rose hover:border-sumi transition-colors pb-1.5"
                    >
                        View All Treats &rarr;
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

