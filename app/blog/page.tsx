"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";

import { blogPosts } from "@/lib/data/blog";

export default function Blog() {
    return (
        <main className="min-h-screen bg-brand-light pb-24 animate-in fade-in duration-500">

            {/* ── Hero Header ── */}
            <section className="bg-brand-main pt-36 pb-16 md:pt-44 md:pb-20 border-b border-brand-pink relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-dark mb-4 tracking-tight">
                        Blog
                    </h1>
                    <p className="text-lg md:text-xl text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
                        Stories, recipes, and guides from our Kanata kitchen.
                    </p>
                </div>
                <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-brown/10 rounded-full blur-2xl"></div>
            </section>

            {/* ── Post Listing Grid ── */}
            <section className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.map((p, idx) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href={`/blog/${p.slug}`}
                                className="group block rounded-3xl overflow-hidden border border-brand-pink/40 shadow-sm hover:shadow-md hover:border-brand-pink transition-all duration-300 bg-white"
                            >
                                {/* Card Image */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-pink/10">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                                    />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 md:p-8 bg-white space-y-4">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {p.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] font-sans tracking-[0.14em] uppercase text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full font-semibold"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl md:text-2xl font-heading font-bold text-brand-dark leading-tight group-hover:text-brand-orange transition-colors duration-300">
                                        {p.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-brand-dark/65 text-sm leading-relaxed line-clamp-3">
                                        {p.excerpt}
                                    </p>

                                    {/* Meta Row */}
                                    <div className="flex items-center gap-4 pt-2 text-xs text-brand-dark/45 font-sans">
                                        <span className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" /> {p.author}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" /> {p.readTime}
                                        </span>
                                        <span>{p.date}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}