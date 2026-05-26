"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

const images = [
    {
        src: "/images/cakes/0m6z6d2hcnrmr0cwnkntwe854c.webp",
        category: "Birthday Cakes",
        title: "Piper's first birthday.",
        caption: "Where it all started — the cake that sparked a bakery.",
    },
    {
        src: "/images/cakes/ebjvrebdhdrmy0cwnket7he11m.webp",
        category: "Custom Cakes",
        title: "Made to order.",
        caption: "Every detail personalised — theme, colours, and dietary needs.",
    },
    {
        src: "/images/cakes/jrk78gqz7nrmt0cwnkeaw6zh2r.webp",
        category: "Celebration",
        title: "Gotcha day done right.",
        caption: "A handmade cake for the day you brought them home.",
    },
    {
        src: "/images/cakes/replicate-prediction-nn85mrpa6xrmy0cwnkcaetc448.webp",
        category: "Seasonal",
        title: "Baked with care.",
        caption: "Small batches, human-grade ingredients, zero preservatives.",
    },
    {
        src: "/images/cakes/replicate-prediction-qre09x6y4nrmr0cwnkbvxp9qr0.webp",
        category: "Pupcakes",
        title: "Bite-sized celebrations.",
        caption: "Perfect for sharing at the dog park or keeping all to themselves.",
    },
    {
        src: "/images/cakes/replicate-prediction-xm9jc4jh81rmw0cwnkcspexg60.webp",
        category: "Custom Cakes",
        title: "Tailored for your pup.",
        caption: "Allergy-friendly variations available on every design.",
    },
    {
        src: "/images/cakes/replicate-prediction-xy1mce5hb1rmr0cwnkasmtx0ng.webp",
        category: "Market Favourites",
        title: "Carp Farmers' Market.",
        caption: "Sold out on our very first day — and we've never looked back.",
    },
    {
        src: "/images/cakes/t8qfd60stdrmw0cwnkd87pp0gr.webp",
        category: "Gourmet Treats",
        title: "Crafted with love.",
        caption: "Every treat made by hand in Kanata, ON, since 2022.",
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

                            {/* Card text — below image, matching "Our Journal" exactly */}
                            <div className="mt-4 max-w-[90%]">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="font-heading text-[18px] md:text-[20px] leading-[1.25] tracking-[0.01em] text-sumi">
                                    {item.title}
                                </h3>
                                <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-sumi/55 line-clamp-2">
                                    {item.caption}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
