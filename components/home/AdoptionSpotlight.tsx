"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export default function AdoptionSpotlight() {
    // Find the latest rescue spotlight post dynamically to resolve the button link
    const latestSpotlight = blogPosts.find((p) => p.tags.includes("Rescue Spotlight"));
    const buttonHref = latestSpotlight ? `/blog?post=${latestSpotlight.slug}` : "/blog";
    const buttonText = latestSpotlight ? "Read Latest Spotlight" : "View Rescue Blog";

    return (
        <section id="adoption-spotlight" className="relative py-24 md:py-32 bg-surface overflow-hidden border-b border-sumi/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center">
                <span className="font-heading leading-none text-sumi select-none text-[30vw] md:text-[25vw] lg:text-[20vw]">
                    🐕
                </span>
            </div>

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    
                    {/* Left Column: Generic Rescue Dog Photo Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-sumi/10 bg-sumi/5">
                            <Image
                                src="/images/blog/rescue_dog.png"
                                alt="Support Local Dog Adoption - 2 Treats Down"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                            
                            {/* Overlay Badge */}
                            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-sm shadow-sm border border-sumi/10 text-[11px] font-bold uppercase tracking-wider text-sumi">
                                <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                                <span>Rescue Spotlight 🩵</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Generic Info */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="border-b border-sumi/15 pb-4 space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sumi/50"
                                >
                                    <span>Community Partnership</span>
                                </motion.div>
                                <h3 className="font-heading text-3xl md:text-5xl font-bold text-sumi tracking-tight leading-tight">
                                    Support Local Dog Adoption
                                </h3>
                            </div>

                            <p className="font-sans text-base md:text-lg text-sumi/80 leading-relaxed font-medium">
                                Looking to adopt? At 2 Treats Down, we believe every dog deserves a loving home and a healthy start.
                            </p>

                            <p className="font-sans text-sm md:text-base text-sumi/70 leading-relaxed">
                                We partner with local rescue organizations and shelters to help foster dogs find their forever families. Every now and then, we showcase an adoptable pup in our **Rescue Spotlight** blog series—sharing their background, playful quirks, and personality so you can connect with them.
                            </p>

                            <blockquote className="border-l-2 border-sumi/30 pl-4 py-1 italic font-display text-sm md:text-base text-sumi/70 leading-relaxed bg-sumi/[0.01]">
                                "Helping local foster dogs find their perfect match, one story at a time."
                            </blockquote>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-wrap gap-4 items-center">
                                <Link
                                    href={buttonHref}
                                    className="group relative inline-flex items-center justify-center font-sans text-[11px] tracking-[0.16em] uppercase text-washi bg-sumi border border-sumi px-8 py-4.5 transition-[color,background-color] duration-500 ease-text-roll hover:text-sumi hover:bg-transparent rounded-[4px]"
                                >
                                    <span className="relative inline-flex items-center gap-2">
                                        <span>{buttonText}</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-sumi/60 hover:text-sumi border border-sumi/20 hover:border-sumi px-8 py-4.5 rounded-[4px] transition-all duration-300"
                                >
                                    <span>Browse All Stories</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
