"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Custom smooth scroll with easing — no browser jank
function smoothScrollTo(el: HTMLElement, targetLeft: number, duration: number = 600) {
    const startLeft = el.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();

    function easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }

    function step(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.scrollLeft = startLeft + distance * easeOutCubic(progress);
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

export default function Gallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 2);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll]);

    const doScroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        const amount = dir === "left" ? -340 : 340;
        const target = Math.max(0, Math.min(el.scrollLeft + amount, el.scrollWidth - el.clientWidth));
        smoothScrollTo(el, target, 600);
    };

    return (
        <section className="bg-surface py-24 md:py-32 border-b border-sumi/10 space-section">
            {/* Header row */}
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between gap-4 mb-10 md:mb-14">
                <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi font-bold">
                    Cakes Gallery.
                </h2>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => doScroll("left")}
                        disabled={!canScrollLeft}
                        className="w-10 h-10 rounded-full border border-sumi/15 flex items-center justify-center text-sumi/50 hover:text-sumi hover:border-sumi/40 transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => doScroll("right")}
                        disabled={!canScrollRight}
                        className="w-10 h-10 rounded-full border border-sumi/15 flex items-center justify-center text-sumi/50 hover:text-sumi hover:border-sumi/40 transition-all cursor-pointer disabled:opacity-25 disabled:cursor-default"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <Link
                        href="/gallery"
                        className="font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/50 hover:text-sumi transition-colors duration-300"
                    >
                        View all
                    </Link>
                </div>
            </div>

            {/* Scrollable card row — pure overflow, no snap, no CSS smooth */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide"
            >
                {images.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.06 }}
                        className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
                    >
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
