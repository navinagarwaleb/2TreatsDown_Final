"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

const catalogs = [
    {
        title: "2025 Catalog (Cakes)",
        tabLabel: "Cakes '25",
        category: "2025 Collection",
        headline: "Celebrating life\u2019s sweetest moments.",
        description: "Discover our custom cake collection featuring bespoke designs, premium decorations, and thoughtful details made for your dog\u2019s milestones and celebrations.",
        url: "https://www.canva.com/design/DAG6wEb1bMk/Zv3G4DUKVPZGIBWhgSjeWg/edit?utm_content=DAG6wEb1bMk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "/images/catalogs/2025_Cakes.webp"
    },
    {
        title: "2025 Catalog (Pupcakes)",
        tabLabel: "Pupcakes '25",
        category: "2025 Collection",
        headline: "Small treats for big celebrations.",
        description: "Explore our 2025 pupcake collection featuring handcrafted designs, wholesome ingredients, and dog-friendly frosting.",
        url: "https://www.canva.com/design/DAG9k33Nzek/kVIXQbSWpCpUxBwauMFkng/view?utm_content=DAG9k33Nzek&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5a1c91faca",
        img: "/images/catalogs/2025_Pupcakes.webp"
    },
    {
        title: "2024 Catalog (Cakes)",
        tabLabel: "Cakes '24",
        category: "2024 Collection",
        headline: "From birthdays to gotcha days.",
        description: "Our 2024 cake collection showcases custom creations and signature styles that made celebrations extra special.",
        url: "https://www.canva.com/design/DAG_ndBx-uI/TnWpOzgda36Hl-2GvReFaQ/edit?utm_content=DAG_ndBx-uI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "/images/catalogs/2024_Cakes.webp"
    },
    {
        title: "2024 Catalog (Pupcakes)",
        tabLabel: "Pupcakes '24",
        category: "2024 Collection",
        headline: "Colourful swirls, happy tails, and lots of celebration.",
        description: "A look back at some of our favourite pupcake creations from 2024.",
        url: "https://www.canva.com/design/DAG_nQAxsjc/rzc4kgH7WhIjbOidR7xgJQ/edit?utm_content=DAG_nQAxsjc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "/images/catalogs/2024_Pupcakes.webp"
    },
    {
        title: "2023 Catalog (Cakes)",
        tabLabel: "Cakes '23",
        category: "2023 Collection",
        headline: "Where the celebrations began.",
        description: "Explore our 2023 cake collection featuring some of our earliest custom creations, handcrafted for unforgettable pup celebrations.",
        url: "https://www.canva.com/design/DAG-28nHZ2g/2l-JjASiQFj3VNoRoU0gtg/view?utm_content=DAG-28nHZ2g&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h0e1b2074d1",
        img: "/images/catalogs/2023_Cakes.webp"
    },
    {
        title: "2023 Catalog (Pupcakes)",
        tabLabel: "Pupcakes '23",
        category: "2023 Collection",
        headline: "The early days of pupcake decorating.",
        description: "Browse some of our first playful designs and sweet little celebrations from 2023.",
        url: "https://www.canva.com/design/DAG-3dNxQ8A/nnr-ulZez2D4ZyClc8ORWA/edit?utm_content=DAG-3dNxQ8A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        img: "/images/catalogs/2023_Pupcakes.webp"
    },
];

export default function Catalogs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-surface py-24 md:py-32 border-b border-sumi/10 space-section relative overflow-hidden">
            {/* Header Title - Aligned to left screen margin */}
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-16 w-full">
                <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi font-bold">
                    <WordSlideUp text="Explore Our Catalogs." className="justify-start" />
                </h2>
            </div>

            {/* Desktop Section (md:block) - Fluid Left-Aligned 50/50 Grid */}
            <div className="hidden md:block px-6 md:px-12 lg:px-20 xl:px-28 w-full">
                {/* 50/50 split grid where left cell contains image and right cell contains text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-stretch">
                    {/* Left Column: Interactive Image Carousel, left-aligned inside its grid cell */}
                    <div className="w-full flex justify-start">
                        <a
                            href={catalogs[activeIndex].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block w-full max-w-[480px] aspect-[4/5] overflow-hidden rounded-md shadow-lg border border-sumi/10 cursor-pointer"
                        >
                            {/* Overlay Index */}
                            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-baseline gap-2 pointer-events-none">
                                <span className="font-heading text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-none tracking-[0.01em] text-washi drop-shadow-md">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-washi/70 drop-shadow-sm">
                                    / {String(catalogs.length).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Image Cross-fade */}
                            <div className="absolute inset-0 bg-sumi/5 overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeIndex}
                                        src={catalogs[activeIndex].img}
                                        alt={catalogs[activeIndex].title}
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-text-roll group-hover:scale-105"
                                    />
                                </AnimatePresence>
                            </div>
                        </a>
                    </div>

                    {/* Right Column: Descriptions & Tab Triggers - stretches and aligns perfectly */}
                    <div className="flex flex-col justify-between h-full py-2 max-w-[520px] w-full">
                        {/* Top Group: Text & Button */}
                        <div className="relative flex-grow flex flex-col justify-start">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full text-left space-y-6"
                                >
                                    <span className="block font-sans text-xs tracking-[0.2em] uppercase text-sumi/45 font-semibold">
                                        {catalogs[activeIndex].category}
                                    </span>
                                    <h3 className="font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-sumi font-bold">
                                        {catalogs[activeIndex].headline}
                                    </h3>
                                    <p className="font-sans text-base leading-relaxed text-sumi/70">
                                        {catalogs[activeIndex].description}
                                    </p>
                                    
                                    <div className="pt-4">
                                        <a
                                            href={catalogs[activeIndex].url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase text-sumi border border-sumi/25 px-8 py-4 transition-[color,border-color] duration-500 ease-text-roll hover:text-washi hover:border-sumi rounded-[4px]"
                                        >
                                            <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                                                <span className="absolute inset-y-0 -inset-x-px bg-sumi origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100" />
                                            </span>
                                            <span className="relative inline-flex overflow-hidden">
                                                <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[140%]">
                                                    View on Canva
                                                </span>
                                                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                                                    View on Canva
                                                </span>
                                            </span>
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Bottom Group: Interactive Tab bar spanning exactly across the container */}
                        <div className="mt-12 md:mt-0 pt-6">
                            <div className="flex items-center gap-4 lg:gap-6 w-full">
                                {catalogs.map((catalog, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        className="group flex-1 text-left relative pt-4 cursor-pointer focus:outline-none"
                                        aria-label={`Show ${catalog.title}`}
                                    >
                                        {/* Progress Bar Line */}
                                        <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-sumi/10 overflow-hidden rounded-full">
                                            {activeIndex === idx && (
                                                <motion.span
                                                    key={idx}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    style={{ originX: 0 }}
                                                    transition={{ duration: 8, ease: "linear" }}
                                                    className="absolute inset-y-0 left-0 bg-sumi h-full w-full"
                                                    onAnimationComplete={() => {
                                                        setActiveIndex((prev) => (prev + 1) % catalogs.length);
                                                    }}
                                                />
                                            )}
                                        </span>
                                        
                                        {/* Text Label */}
                                        <span className={`block font-sans text-[10px] md:text-[11px] tracking-[0.16em] uppercase whitespace-nowrap transition-colors duration-300 ${
                                            activeIndex === idx ? "text-sumi font-semibold" : "text-sumi/40 group-hover:text-sumi/70"
                                        }`}>
                                            {String(idx + 1).padStart(2, '0')} · {catalog.tabLabel}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Horizontal Scrolling Cards (md:hidden) */}
            <div className="md:hidden w-full overflow-hidden">
                <div className="flex gap-6 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x snap-mandatory">
                    {catalogs.map((catalog, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                            className="flex-shrink-0 w-[78vw] sm:w-[320px] snap-center"
                        >
                            <a
                                href={catalog.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block aspect-[9/15] overflow-hidden rounded-lg border border-sumi/10 shadow-md"
                            >
                                {/* Image */}
                                <img
                                    src={catalog.img}
                                    alt={catalog.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-text-roll group-hover:scale-105"
                                />
                                
                                {/* Bottom vignette shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-sumi/80 via-sumi/20 to-transparent pointer-events-none" />
                                
                                {/* Top index overlay */}
                                <div className="absolute top-5 left-5 z-10 flex items-baseline gap-1 pointer-events-none">
                                    <span className="font-heading text-lg font-bold text-washi">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-sans text-[10px] uppercase text-washi/70">
                                        / {String(catalogs.length).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Text content absolute at bottom */}
                                <div className="absolute inset-x-0 bottom-0 p-6 space-y-2 text-left">
                                    <span className="block font-sans text-[10px] tracking-[0.18em] uppercase text-washi/70 font-semibold">
                                        {catalog.category}
                                    </span>
                                    <h3 className="font-heading text-xl font-bold text-washi tracking-tight leading-snug">
                                        {catalog.headline}
                                    </h3>
                                    <p className="font-sans text-xs text-washi/80 line-clamp-2 leading-relaxed">
                                        {catalog.description}
                                    </p>
                                    
                                    <div className="pt-2 flex items-center text-washi font-sans text-[11px] font-semibold tracking-wider uppercase gap-2 group-hover:text-brand-pink transition-colors">
                                        <span>View on Canva</span>
                                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
