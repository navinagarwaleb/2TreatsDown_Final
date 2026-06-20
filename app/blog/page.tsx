"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

import { blogPosts } from "@/lib/data/blog";

/* ─────────────────── Markdown Renderer ─────────────────── */

function RenderBody({ body }: { body: string }) {
    const renderTextWithLinks = (text: string) => {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <a
                    key={match.index}
                    href={match[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline font-semibold"
                >
                    {match[1]}
                </a>
            );
            lastIndex = regex.lastIndex;
        }
        
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }
        
        return parts.length > 0 ? parts : text;
    };

    return (
        <>
            {body.split("\n\n").map((block, index) => {
                if (block.startsWith("###")) {
                    return (
                        <h3 key={index} className="text-2xl font-bold font-heading text-brand-dark pt-6 pb-1">
                            {block.replace("### ", "")}
                        </h3>
                    );
                }
                if (block.includes("* ")) {
                    const lines = block.split("\n");
                    return (
                        <ul key={index} className="list-disc pl-6 space-y-2 text-brand-dark/80">
                            {lines.map((line, lIdx) => {
                                const cleanLine = line.replace(/^\s*\*\s*/, "");
                                const match = cleanLine.match(/^\*\*(.*?)\*\*(.*)/);
                                if (match) {
                                    return (
                                        <li key={lIdx}>
                                            <strong className="text-brand-dark">{match[1]}</strong>
                                            {renderTextWithLinks(match[2])}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{renderTextWithLinks(cleanLine)}</li>;
                            })}
                        </ul>
                    );
                }
                if (block.match(/^\d+\./)) {
                    const lines = block.split("\n");
                    return (
                        <ol key={index} className="list-decimal pl-6 space-y-2 text-brand-dark/80">
                            {lines.map((line, lIdx) => {
                                const cleanLine = line.replace(/^\s*\d+\.\s*/, "");
                                const match = cleanLine.match(/^\*\*(.*?)\*\*(.*)/);
                                if (match) {
                                    return (
                                        <li key={lIdx}>
                                            <strong className="text-brand-dark">{match[1]}</strong>
                                            {renderTextWithLinks(match[2])}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{renderTextWithLinks(cleanLine)}</li>;
                            })}
                        </ol>
                    );
                }
                if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                    return (
                        <p key={index} className="leading-relaxed text-brand-dark/60 italic">
                            {renderTextWithLinks(block.replace(/^\*|\*$/g, ""))}
                        </p>
                    );
                }
                return (
                    <p key={index} className="leading-relaxed text-brand-dark/80">
                        {renderTextWithLinks(block)}
                    </p>
                );
            })}
        </>
    );
}

/* ─────────────────────── Main Page ─────────────────────── */

export default function Blog() {
    const [activePostId, setActivePostId] = useState<number | null>(null);
    const articleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const slug = params.get("post");
            if (slug) {
                const found = blogPosts.find((p) => p.slug === slug);
                if (found) {
                    setActivePostId(found.id);
                    setTimeout(() => {
                        articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 300);
                }
            }
        }
    }, []);

    const postIndex = activePostId !== null ? blogPosts.findIndex((p) => p.id === activePostId) : -1;
    const post = postIndex !== -1 ? blogPosts[postIndex] : null;
    const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

    const openPost = (id: number) => {
        setActivePostId(id);
        setTimeout(() => {
            articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    };

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
                        <motion.button
                            key={p.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => openPost(p.id)}
                            className={`group text-left rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer p-0 bg-white flex flex-col w-full ${
                                activePostId === p.id
                                    ? "border-brand-orange shadow-lg ring-2 ring-brand-orange/20"
                                    : "border-brand-pink/40 shadow-sm hover:shadow-md hover:border-brand-pink"
                            }`}
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
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* ── Full Article View ── */}
            <AnimatePresence mode="wait">
                {post && (
                    <motion.section
                        key={post.id}
                        ref={articleRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-brand-pink/30"
                    >
                        <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">

                            {/* Back to all posts */}
                            <button
                                onClick={() => {
                                    setActivePostId(null);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="inline-flex items-center gap-2 text-sm text-brand-dark/50 hover:text-brand-orange transition-colors mb-10 cursor-pointer font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back to all posts
                            </button>

                            {/* Article Header */}
                            <header className="space-y-6 mb-12">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-sans tracking-[0.14em] uppercase text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full font-semibold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-dark leading-[1.15]">
                                    {post.title}
                                </h2>
                                <div className="flex items-center gap-5 text-sm text-brand-dark/50 font-sans">
                                    <span className="flex items-center gap-1.5">
                                        <User className="w-4 h-4" /> {post.author}
                                    </span>
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" /> {post.readTime}
                                    </span>
                                </div>
                            </header>

                            {/* Feature Image */}
                            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg mb-14">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                                    priority
                                />
                            </div>

                            {/* Article Body */}
                            <article className="prose prose-lg max-w-none space-y-5">
                                <RenderBody body={post.body} />
                            </article>

                            {/* Additional Gallery Images */}
                            {post.images && post.images.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-brand-pink/20">
                                    <h3 className="text-2xl font-bold font-heading text-brand-dark mb-6">
                                        {post.galleryTitle || "More Photos"}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {post.images.map((imgUrl, i) => (
                                            <div key={i} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group hover:shadow-lg transition-all duration-300">
                                                <Image
                                                    src={imgUrl}
                                                    alt={`${post.galleryTitle || "Gallery"} photo ${i + 2}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="mt-14 pt-10 border-t border-brand-pink/30 flex justify-center">
                                {post.cta ? (
                                    <a
                                        href={post.cta.href}
                                        target={post.cta.external ? "_blank" : undefined}
                                        rel={post.cta.external ? "noopener noreferrer" : undefined}
                                        className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-heading text-lg md:text-xl px-10 py-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        {post.cta.text}
                                    </a>
                                ) : (
                                    <Link
                                        href="/custom-cake"
                                        className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-heading text-lg md:text-xl px-10 py-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Order a Custom Birthday Cake Today
                                    </Link>
                                )}
                            </div>

                            {/* Prev / Next Navigation */}
                            <nav className="mt-10 pt-10 border-t border-brand-pink/30 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {prevPost ? (
                                    <button
                                        onClick={() => openPost(prevPost.id)}
                                        className="group flex items-center gap-3 p-5 rounded-2xl border border-brand-pink/30 bg-white hover:border-brand-orange/40 hover:shadow-sm transition-all text-left cursor-pointer"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-brand-orange shrink-0" />
                                        <div>
                                            <span className="text-[11px] font-sans text-brand-dark/40 uppercase tracking-wider block">Previous</span>
                                            <span className="text-sm font-heading font-semibold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-1">{prevPost.title}</span>
                                        </div>
                                    </button>
                                ) : (
                                    <div />
                                )}
                                {nextPost ? (
                                    <button
                                        onClick={() => openPost(nextPost.id)}
                                        className="group flex items-center justify-end gap-3 p-5 rounded-2xl border border-brand-pink/30 bg-white hover:border-brand-orange/40 hover:shadow-sm transition-all text-right cursor-pointer"
                                    >
                                        <div>
                                            <span className="text-[11px] font-sans text-brand-dark/40 uppercase tracking-wider block">Next</span>
                                            <span className="text-sm font-heading font-semibold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-1">{nextPost.title}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-brand-orange shrink-0" />
                                    </button>
                                ) : (
                                    <div />
                                )}
                            </nav>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </main>
    );
}
