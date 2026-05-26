"use client";

import { motion } from "framer-motion";
import { CharacterReveal } from "@/components/ui/ScrollReveal";

export default function Intro() {
    return (
        <section id="intro" className="relative scroll-mt-16 md:scroll-mt-20 px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-32 bg-surface overflow-hidden border-b border-sumi/10">
            {/* Background Paw Print Glyph */}
            <div className="hidden lg:block pointer-events-none select-none absolute top-1/2 -translate-y-1/2 lg:right-12 xl:right-20 opacity-[0.03]">
                <span aria-hidden="true" className="font-heading leading-none text-sumi" style={{ fontSize: "clamp(16rem, 38vw, 30rem)" }}>
                    🐾
                </span>
            </div>

            <div className="relative max-w-[880px] z-10 text-left">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="block font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45 m-0 font-normal">
                        How It All Started
                    </h2>
                </motion.div>

                <div className="mt-6 md:mt-10">
                    <CharacterReveal
                        text="After years in the pet industry, I realized that our dogs’ treats should be just as wholesome as the meals we cook for ourselves. What started as a personal mission to find cleaner, preservative-free treats blossomed into a kitchen dedicated to small-batch, handmade goodies. We believe the best ingredients are the ones you already know and trust."
                        className="font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[0.005em] text-sumi justify-start text-left"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 md:mt-14"
                >
                    <a
                        className="group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase text-sumi border border-sumi/25 px-8 py-4 transition-[color,border-color] duration-500 ease-text-roll hover:text-surface hover:border-sumi rounded-full"
                        href="/about-us"
                    >
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                            <span className="absolute inset-y-0 -inset-x-px bg-sumi origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100" />
                        </span>
                        <span className="relative inline-flex overflow-hidden">
                            <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[140%]">
                                Our Story
                            </span>
                            <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                                Our Story
                            </span>
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
