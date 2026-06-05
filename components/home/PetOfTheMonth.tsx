"use client";

import { motion } from "framer-motion";
import { Gift, Globe, Instagram, Sparkles, Calendar, Heart, Award } from "lucide-react";

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
                        <span>Ongoing Monthly Feature</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-sumi tracking-tight"
                    >
                        Pet of the Month
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-sumi/70 font-display leading-relaxed"
                    >
                        Every month, one special pup will be chosen as our ✨ **Pet of the Month** ✨. We are SO excited to finally start this! 💛😄
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                    
                    {/* Left Column: Winner Perks & Deadlines */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-sumi/[0.02] border border-sumi/10 rounded-2xl p-8 space-y-6"
                        >
                            <h3 className="font-heading text-xl font-bold text-sumi flex items-center gap-2 border-b border-sumi/10 pb-4">
                                <Award className="w-5 h-5 text-amber-500" />
                                The Winner Will Receive
                            </h3>

                            <ul className="space-y-4 font-sans text-sm text-sumi/80">
                                <li className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sumi/5 flex items-center justify-center text-sumi">
                                        <Gift className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-sumi block font-medium">Special Treat Box</strong>
                                        A custom box from us filled to the brim with healthy, delicious goodies.
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sumi/5 flex items-center justify-center text-sumi">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-sumi block font-medium">Website Spotlight</strong>
                                        Be featured proudly right here on our brand new website!
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sumi/5 flex items-center justify-center text-sumi">
                                        <Instagram className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <strong className="text-sumi block font-medium">Social Media Feature</strong>
                                        Be highlighted across all our social channels throughout the month.
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Timeline Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-sumi/5 border border-sumi/20 rounded-xl p-6 flex flex-col sm:flex-row justify-around items-center gap-4 text-center sm:text-left"
                        >
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-sumi/70" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-sumi/50">Entries Close</p>
                                    <p className="font-heading font-bold text-sumi">June 6</p>
                                </div>
                            </div>
                            <div className="h-px sm:h-8 w-full sm:w-px bg-sumi/15" />
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-amber-500" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-sumi/50">Winner Announced</p>
                                    <p className="font-heading font-bold text-sumi">June 7 (Evening)</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: How to Enter */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <h3 className="font-heading text-2xl font-bold text-sumi">
                                How to Enter
                            </h3>

                            <div className="space-y-4 font-sans text-sm text-sumi/80">
                                {[
                                    "Post your favorite photo or video of your pup.",
                                    "Tag @2treatsdown in the post.",
                                    "Share goofy, hilarious, or any cute moment of your pup.",
                                    "Add a funny or cute caption for bonus entries.",
                                    "Share to your story and tag us for extra entries.",
                                    "Tag 3 friends in the comments on our Instagram post to spread the word 🐾"
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 items-start bg-sumi/[0.01] hover:bg-sumi/[0.03] transition-colors p-3.5 border border-sumi/5 rounded-xl">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sumi/5 border border-sumi/10 flex items-center justify-center font-bold text-xs text-sumi">
                                            {idx + 1}
                                        </div>
                                        <p className="leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 text-xs flex gap-3 text-sumi/80">
                                <Heart className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-semibold text-sumi">No Limit on Entries!</span> The more you share and tag us, the more chances your pup has to win! We can’t wait to see all your adorable pups 🐾☺️💛
                                </div>
                            </div>

                            {/* CTA button */}
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                                <a
                                    href="https://www.instagram.com/p/DY27QYtunFR/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase text-washi bg-sumi border border-sumi px-10 py-5 transition-[color,background-color] duration-500 ease-text-roll hover:text-sumi hover:bg-transparent rounded-[4px]"
                                >
                                    <span className="relative inline-flex items-center gap-2">
                                        <Instagram className="w-4 h-4" />
                                        <span>Enter on Instagram</span>
                                    </span>
                                </a>
                                <p className="text-[11px] text-sumi/50 leading-relaxed max-w-xs text-center sm:text-left">
                                    By entering, you allow us to repost and share your photos/videos on our socials & website.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
