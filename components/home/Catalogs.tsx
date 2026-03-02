"use client";

import { motion } from "framer-motion";

const catalogs = [
    {
        title: "2025 Catalog (Cakes)",
        url: "https://www.canva.com/design/DAG6wEb1bMk/Zv3G4DUKVPZGIBWhgSjeWg/edit?utm_content=DAG6wEb1bMk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80"
    },
    {
        title: "2024 Catalog (Cakes)",
        url: "https://www.canva.com/design/DAG_ndBx-uI/TnWpOzgda36Hl-2GvReFaQ/edit?utm_content=DAG_ndBx-uI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80"
    },
    {
        title: "2023 Catalog (Cakes)",
        url: "https://www.canva.com/design/DAG-28nHZ2g/2l-JjASiQFj3VNoRoU0gtg/view?utm_content=DAG-28nHZ2g&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0e1b2074d1",
        img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80"
    },
    {
        title: "2025 Catalog (Pupcakes)",
        url: "https://www.canva.com/design/DAG9k33Nzek/kVIXQbSWpCpUxBwauMFkng/view?utm_content=DAG9k33Nzek&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5a1c91faca",
        img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
    },
    {
        title: "2024 Catalog (Pupcakes)",
        url: "https://www.canva.com/design/DAG_nQAxsjc/rzc4kgH7WhIjbOidR7xgJQ/edit?utm_content=DAG_nQAxsjc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80"
    },
    {
        title: "2023 Catalog (Pupcakes)",
        url: "https://www.canva.com/design/DAG-3dNxQ8A/nnr-ulZez2D4ZyClc8ORWA/edit?utm_content=DAG-3dNxQ8A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80"
    },
];

export default function Catalogs() {
    return (
        <section className="bg-white py-24 border-t border-brand-pink/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Explore Our Catalogs</h2>
                    <p className="text-lg text-brand-dark/70 max-w-2xl mx-auto">Click through below to view our detailed offerings, custom collection menus, and specific ingredients guides!</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {catalogs.map((catalog, idx) => (
                        <motion.a
                            href={catalog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group block relative rounded-[2rem] overflow-hidden aspect-video shadow-md hover:shadow-2xl transition-all duration-300 border border-brand-pink/50 cursor-pointer"
                        >
                            <img src={catalog.img} alt={catalog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-colors duration-300 flex flex-col items-center justify-center p-6 text-center">
                                <h3 className="text-white font-bold text-2xl mb-4 opacity-100 drop-shadow-lg">{catalog.title}</h3>
                                <span className="bg-white text-brand-orange px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    View on Canva &rarr;
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
