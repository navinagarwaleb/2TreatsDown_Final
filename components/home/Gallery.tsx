"use client";
import { motion } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1625316708582-7c38734be31d?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590200889981-2c0c7bfa165a?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80"
];

export default function Gallery() {
    return (
        <section className="bg-brand-main py-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Happy Pups Gallery</h2>
                    <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">Take a look at all the joy our handmade treats bring to our amazing furry friends.</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative aspect-square overflow-hidden rounded-3xl bg-brand-pink border border-brand-pink/50 shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                        >
                            <img src={img} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
