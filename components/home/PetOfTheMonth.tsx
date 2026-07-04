"use client";

import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart, Award, Instagram, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PetOfTheMonth() {
    return (
        <section id="pet-of-the-month" className="relative py-24 md:py-32 bg-surface overflow-hidden border-b border-sumi/10">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] flex items-center justify-center">
                <span className="font-heading leading-none text-sumi select-none text-[30vw] md:text-[25vw] lg:text-[20vw]">
                    ✨
                </span>
            </div>

            <div className="container max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sumi/5 border border-sumi/10 text-xs font-semibold uppercase tracking-wider text-sumi/70"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>July Pet of the Month</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-sumi tracking-tight"
                    >
                        Meet Our July Winner: Nemo!
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-sumi/70 font-display leading-relaxed"
                    >
                        We are so excited to celebrate our July Pet of the Month. Say hello to Nemo, the Husky-German Shepherd with a heart of gold and a bedtime negotiation strategy! 🐾💛
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16">
                    
                    {/* Left Column: Nemo's Photo Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl border border-sumi/10 bg-sumi/5">
                            <Image
                                src="/images/blog/nemo-1.jpg"
                                alt="Nemo - Pet of the Month July Winner"
                                fill
                                className="object-cover object-[center_25%]"
                                priority
                            />
                            
                            {/* Overlay Badge */}
                            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-sm shadow-sm border border-sumi/10 text-[11px] font-bold uppercase tracking-wider text-sumi">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span>Winner 🏆</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Profile & Info */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="border-b border-sumi/15 pb-4 space-y-2">
                                <h3 className="font-heading text-2xl font-bold text-sumi">
                                    Nemo's Profile
                                </h3>
                                <p className="text-xs text-sumi/50 uppercase tracking-wider">Husky-German Shepherd Mix • 1 Year Old</p>
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm text-sumi/80">
                                <li className="space-y-1">
                                    <span className="text-xs uppercase tracking-wider text-sumi/40 block">Favorite Activity</span>
                                    <span className="font-medium text-sumi">Laying on the lawn, playing with every toy from his bin</span>
                                </li>
                                <li className="space-y-1">
                                    <span className="text-xs uppercase tracking-wider text-sumi/40 block">Favorite Treats</span>
                                    <span className="font-medium text-sumi">2 Treats Down Cheese Nibbles & freeze-dried salmon</span>
                                </li>
                                <li className="space-y-1 sm:col-span-2">
                                    <span className="text-xs uppercase tracking-wider text-sumi/40 block">Funny Habit</span>
                                    <span className="font-medium text-sumi leading-relaxed">Operation Stay Up: launching a full snuggle campaign to avoid bedtime every single night 💛</span>
                                </li>
                            </ul>

                            <blockquote className="border-l-2 border-sumi/30 pl-4 py-1 italic font-display text-sm md:text-base text-sumi/70 leading-relaxed bg-sumi/[0.01]">
                                "Nemo thinks every person he meets is a potential best friend. If he could say one thing to everyone, it would be: please rub my belly and give me treats. 😂"
                            </blockquote>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-wrap gap-4 items-center">
                                <Link
                                    href="/blog?post=july-pet-of-the-month-nemo"
                                    className="group relative inline-flex items-center justify-center font-sans text-[11px] tracking-[0.16em] uppercase text-washi bg-sumi border border-sumi px-8 py-4.5 transition-[color,background-color] duration-500 ease-text-roll hover:text-sumi hover:bg-transparent rounded-[4px]"
                                >
                                    <span className="relative inline-flex items-center gap-2">
                                        <span>Read Nemo's Story</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>

                                <a
                                    href="https://www.instagram.com/northernnemo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.16em] uppercase text-sumi/60 hover:text-sumi border border-sumi/20 hover:border-sumi px-8 py-4.5 rounded-[4px] transition-all duration-300"
                                >
                                    <Instagram className="w-4 h-4 text-rose-500" />
                                    <span>Follow @northernnemo</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Stay Tuned Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-sumi/5 border border-sumi/20 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
                >
                    <div className="space-y-2">
                        <div className="flex justify-center md:justify-start items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sumi/70">
                            <Calendar className="w-4 h-4 text-sumi/60" />
                            <span>Contest Announcement</span>
                        </div>
                        <h4 className="font-heading text-xl font-bold text-sumi">
                            Entries Open Last Week of July
                        </h4>
                        <p className="font-sans text-sm text-sumi/70 max-w-2xl">
                            Entries for the August Pet of the Month will open during the last week of July. Stay tuned and keep sharing your pup's cutest moments, tagging <span className="font-semibold text-sumi">@2treatsdown</span> for a chance to be featured next! 🐾
                        </p>
                    </div>
                    <div className="flex-shrink-0">
                        <a
                            href="https://www.instagram.com/2treatsdown/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-transparent hover:bg-sumi/5 text-sumi border border-sumi/25 px-6 py-3.5 rounded-[4px] font-sans text-xs tracking-wider uppercase transition-all duration-300"
                        >
                            <Instagram className="w-4 h-4" />
                            <span>Tag us for August entries</span>
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}