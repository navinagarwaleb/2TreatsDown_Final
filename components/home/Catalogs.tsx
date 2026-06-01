"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WordSlideUp } from "@/components/ui/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    const tabsRef = useRef<HTMLDivElement>(null);

    // Auto-scroll the tab bar to keep the active tab visible (only horizontally, without page scroll)
    useEffect(() => {
        const activeTab = document.getElementById(`catalog-tab-${activeIndex}`);
        if (activeTab && tabsRef.current) {
            const container = tabsRef.current;
            const containerWidth = container.clientWidth;
            const tabOffsetLeft = activeTab.offsetLeft;
            const tabWidth = activeTab.clientWidth;

            // Target scroll left puts active tab in the middle of container
            const targetScrollLeft = tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2);
            
            // Limit scroll boundary to prevent scrolling past start
            container.scrollTo({
                left: Math.max(0, targetScrollLeft),
                behavior: "smooth"
            });
        }
    }, [activeIndex]);

    const goPrev = () => setActiveIndex((prev) => (prev - 1 + catalogs.length) % catalogs.length);
    const goNext = () => setActiveIndex((prev) => (prev + 1) % catalogs.length);

    return (
        <section className="bg-surface py-24 md:py-32 border-b border-sumi/10 space-section relative">
            {/* Header Title row with arrows */}
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-16 w-full flex items-center justify-between gap-4">
                <h2 className="font-heading text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi font-bold">
                    <WordSlideUp text="Explore Our Catalogs." className="justify-start" />
                </h2>

                {/* Navigation arrows — always visible on all screen sizes */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={goPrev}
                        className="w-10 h-10 rounded-full border border-sumi/15 flex items-center justify-center text-sumi/50 hover:text-sumi hover:border-sumi/40 transition-all cursor-pointer"
                        aria-label="Previous catalog"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={goNext}
                        className="w-10 h-10 rounded-full border border-sumi/15 flex items-center justify-center text-sumi/50 hover:text-sumi hover:border-sumi/40 transition-all cursor-pointer"
                        aria-label="Next catalog"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main content — single responsive layout for ALL screen sizes */}
            <div className="px-6 md:px-12 lg:px-20 xl:px-28 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-start">
                    {/* Left Column: Image */}
                    <div className="w-full flex justify-center md:justify-start">
                        <a
                            href={catalogs[activeIndex].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block w-full max-w-[480px] aspect-[4/5] overflow-hidden rounded-md shadow-lg border border-sumi/10 cursor-pointer"
                        >
                            {/* Overlay Index */}
                            <div className="absolute top-6 left-6 z-10 flex items-baseline gap-2 pointer-events-none">
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

                    {/* Right Column: Description + Tabs */}
                    <div className="flex flex-col w-full max-w-[520px]">
                        {/* Text & Button */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full text-left space-y-5"
                            >
                                <span className="block font-sans text-xs tracking-[0.2em] uppercase text-sumi/45 font-semibold">
                                    {catalogs[activeIndex].category}
                                </span>
                                <h3 className="font-heading text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-sumi font-bold">
                                    {catalogs[activeIndex].headline}
                                </h3>
                                <p className="font-sans text-base leading-relaxed text-sumi/70">
                                    {catalogs[activeIndex].description}
                                </p>

                                <div className="pt-2">
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

                        {/* Tab bar — locked to the bottom. Horizontal scroller on mobile, 2x3 grid on desktop */}
                        <div className="mt-12 md:mt-20 xl:mt-28">
                            <div
                                ref={tabsRef}
                                className="flex md:grid md:grid-cols-3 gap-4 md:gap-x-6 md:gap-y-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide"
                            >
                                {catalogs.map((catalog, idx) => (
                                    <button
                                        key={idx}
                                        id={`catalog-tab-${idx}`}
                                        onClick={() => setActiveIndex(idx)}
                                        className="group shrink-0 md:shrink text-left relative pt-4 cursor-pointer focus:outline-none min-w-[110px] md:min-w-0"
                                        aria-label={`Show ${catalog.title}`}
                                    >
                                        {/* Progress Bar Line */}
                                        <span className="absolute top-0 left-0 right-0 h-[1.5px] bg-sumi/10 overflow-hidden rounded-full">
                                            {activeIndex === idx && (
                                                <motion.span
                                                    key={`progress-${idx}`}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    style={{ originX: 0 }}
                                                    transition={{ duration: 8, ease: "linear" }}
                                                    className="absolute inset-y-0 left-0 bg-sumi h-full w-full"
                                                    onAnimationComplete={goNext}
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
        </section>
    );
}
