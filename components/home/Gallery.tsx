"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

const images = [
    {
        src: "/images/gallery/1st.webp",
        category: "Birthday Cakes",
        title: "Specialty birthday cakes.",
        caption: "Handmade cakes with natural frosting, customized to match your pup's vision.",
    },
    {
        src: "/images/gallery/2nd.webp",
        category: "Gourmet Treats",
        title: "Dehydrated treats.",
        caption: "High-quality, single-ingredient natural chews that dogs love and parents trust.",
    },
    {
        src: "/images/gallery/3rd.webp",
        category: "Celebrations",
        title: "Wholesome cookies.",
        caption: "Clean, preservative-free ingredients decorated beautifully for any occasion.",
    },
    {
        src: "/images/gallery/4th.webp",
        category: "Pupcakes",
        title: "Bite-sized pupcakes.",
        caption: "Perfect portions for sharing at the dog park or keeping all to themselves.",
    },
    {
        src: "/images/gallery/5th.webp",
        category: "Small Batch",
        title: "Fresh from the kitchen.",
        caption: "Baked locally in Kanata, ON, using only ingredients you already know and trust.",
    },
    {
        src: "/images/gallery/6th.webp",
        category: "Custom Treats",
        title: "Handcrafted goodies.",
        caption: "Made thoughtfully as human-style treats, crafted carefully just for dogs.",
    },
];

export default function Gallery() {
    return (
        <section className="bg-surface py-24 md:py-32 border-b border-sumi/10 space-section">
            {/* Header row: left title + right "View all" link — same baseline row */}
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 flex items-baseline justify-between gap-6 mb-10 md:mb-14">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi font-bold"
                >
                    Cakes Gallery.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                >
                    <Link
                        href="/gallery"
                        className="group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/50 hover:text-sumi transition-colors duration-500 ease-text-roll"
                    >
                        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
                            View all
                        </span>
                        <span aria-hidden="true" className="absolute inset-0 translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                            View all
                        </span>
                    </Link>
                </motion.div>
            </div>

            {/* Horizontal scrolling card row — full bleed with screen-edge padding, no max-w */}
            <div className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide">
                {images.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.2,
                            ease: [0.16, 1, 0.3, 1],
                            delay: idx * 0.06,
                        }}
                        className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
                    >
                        {/* Image card */}
                        <div className="group block">
                            <div className="aspect-[4/5] overflow-hidden rounded-md relative bg-brand-pink/30">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    loading={idx < 3 ? "eager" : "lazy"}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-text-roll group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
