"use client";
import { motion } from "framer-motion";

const images = [
    "/images/cakes/0m6z6d2hcnrmr0cwnkntwe854c.webp",
    "/images/cakes/ebjvrebdhdrmy0cwnket7he11m.webp",
    "/images/cakes/jrk78gqz7nrmt0cwnkeaw6zh2r.webp",
    "/images/cakes/replicate-prediction-nn85mrpa6xrmy0cwnkcaetc448.webp",
    "/images/cakes/replicate-prediction-qre09x6y4nrmr0cwnkbvxp9qr0.webp",
    "/images/cakes/replicate-prediction-xm9jc4jh81rmw0cwnkcspexg60.webp",
    "/images/cakes/replicate-prediction-xy1mce5hb1rmr0cwnkasmtx0ng.webp",
    "/images/cakes/t8qfd60stdrmw0cwnkd87pp0gr.webp"
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
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Cakes Gallery</h2>
                    <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">Take a look at all the joy our handmade cakes bring to our amazing customers.</p>
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
