import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/data/blog";
import { RenderBody } from "@/lib/components/RenderBody";

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const postIndex = blogPosts.findIndex((p) => p.slug === slug);

    if (postIndex === -1) notFound();

    const post = blogPosts[postIndex];
    const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
    const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

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

            {/* ── Article ── */}
            <div className="container mx-auto px-4 max-w-4xl py-16 md:py-24">

                {/* Back to all posts */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-brand-dark/50 hover:text-brand-orange transition-colors mb-10 cursor-pointer font-medium"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to all posts
                </Link>

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
                        <Link
                            href={`/blog/${prevPost.slug}`}
                            className="group flex items-center gap-3 p-5 rounded-2xl border border-brand-pink/30 bg-white hover:border-brand-orange/40 hover:shadow-sm transition-all text-left cursor-pointer"
                        >
                            <ArrowLeft className="w-5 h-5 text-brand-orange shrink-0" />
                            <div>
                                <span className="text-[11px] font-sans text-brand-dark/40 uppercase tracking-wider block">Previous</span>
                                <span className="text-sm font-heading font-semibold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-1">{prevPost.title}</span>
                            </div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextPost ? (
                        <Link
                            href={`/blog/${nextPost.slug}`}
                            className="group flex items-center justify-end gap-3 p-5 rounded-2xl border border-brand-pink/30 bg-white hover:border-brand-orange/40 hover:shadow-sm transition-all text-right cursor-pointer"
                        >
                            <div>
                                <span className="text-[11px] font-sans text-brand-dark/40 uppercase tracking-wider block">Next</span>
                                <span className="text-sm font-heading font-semibold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-1">{nextPost.title}</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-brand-orange shrink-0" />
                        </Link>
                    ) : (
                        <div />
                    )}
                </nav>
            </div>
        </main>
    );
}