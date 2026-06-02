"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

/* ─────────────────────── Blog Data ─────────────────────── */

const blogPosts = [
    {
        id: 1,
        slug: "ultimate-guide-dog-birthday-cakes-ottawa",
        title: "The Ultimate Guide to Dog Birthday Cakes in Ottawa (2025)",
        date: "May 2, 2025",
        author: "Akshata",
        readTime: "6 min read",
        excerpt:
            "Planning a celebration for your pup in Ottawa? We cover everything from sizing and flavours to allergies and how to order a custom dog cake in Kanata.",
        body: `Planning a celebration for your dog in Ottawa? You're not alone. More and more pet parents in Kanata, Stittsville, and across the National Capital Region are celebrating their pup with a custom dog cake. Birthdays, gotcha days, gender reveals, or just because. And honestly? Your dog deserves it.

At 2 Treats Down, we've baked hundreds of personalized dog cakes for Ottawa families. Here's everything you need to know about ordering one.

### What Size Dog Cake Should You Order?

We offer two sizes:
* **4-inch cake** - Perfect for smaller breeds or smaller gatherings. Serves 1-3 dogs comfortably.
* **6-inch cake** - Ideal for larger breeds, multi-dog households, or parties with doggy guests.

Both sizes come in either one layer or two layers, depending on the design. Not sure what's right for your pup? We can discuss and recommend a size based on your requirements.

### What Flavours Do Dogs Love Most?

Our best-selling flavour is Peanut Butter & Carrot. We can also accommodate other flavour preferences.

All cakes are made with human-grade ingredients. We only use xylitol-free peanut butter, ensuring every bite is safe for your pup. Every cake is baked fresh in our Kanata kitchen with no preservatives.

### Can You Accommodate Allergies?

Absolutely. We routinely work with dogs who have:
* Peanut or nut allergies
* Sensitive stomachs
* Low-protein dietary needs

Just mention any dietary requirements in your cake order request form, and we'll discuss suitable options while discussing your order.

### Can You Customize the Design?

Every cake is fully customizable. We've made cakes for birthdays, gotcha days, gender reveals, and nature-themed celebrations. Caricatures, portraits, seasonal themes, and more.

You share your vision with us. Colours, theme, reference images. We bring it to life with dog-safe frosting and decorations. Your dog's name can also be added to the cake.

### How Far in Advance Should You Order?

We recommend ordering at least 2 weeks in advance for custom cakes, especially during peak seasons (summer birthday months, holidays). The sooner the better. We've accommodated rush orders when possible, just reach out and we'll see what we can do.

### Pickup in Kanata

All cakes are available for local pickup at **418 Galatina Way, Kanata, ON**. We're easily accessible from Highway 417.

### How to Order

1. **Fill out our Custom Cake Request Form** with your date, size, design ideas, and any allergies.
2. **We'll get back to you within 24 hours** to discuss further details.
3. **After discussing the details, we get back to you** with a vision board and pricing in a week's time.
4. **Confirm your order**, we bake it fresh, and you pick it up.

*Pricing Note:* Cake pricing depends on size, number of layers, and design complexity. We share exact pricing after discussing your requirements so you only pay for what you need.

### Storage Tips

Since we don't use preservatives:
* **Refrigerated:** 5-7 days
* **Frozen:** Up to 6 months (thaw a couple hours before serving)
* Slice and share. One slice is plenty per dog.

### Ready to Order?

Whether it's a birthday, gotcha day, gender reveal, or just because. We'd love to bake something special for your pup.`,
        image: "/images/gallery/1st.webp",
        imagePosition: "center 30%",
        tags: ["Custom Cakes", "Ottawa", "Guide"],
    },
    {
        id: 2,
        slug: "ingredients-you-can-actually-pronounce",
        title: "Ingredients You Can Actually Pronounce",
        date: "June 2, 2025",
        author: "Akshata",
        readTime: "3 min read",
        excerpt:
            "I'll be honest with you: I'm not a pet nutritionist. But at 2 Treats Down, we have a simple rule: if I can't pronounce it, I don't bake with it.",
        body: `I'll be honest with you: I'm not a pet nutritionist. I didn't go to school for this. What I do have is a kitchen, a dog who means the world to me, and a simple rule: if I can't pronounce it, I don't bake with it.

When I started making treats for Piper, I'd flip over bags of store-bought treats and find ingredient lists that looked like a chemistry textbook. Preservatives, artificial flavours, fillers, things I'd never heard of. I'd stand there wondering: do I really want to feed this to my dog? The answer was always no.

So I started simple. Peanut butter. Sweet potatoes. Chicken. Eggs. Things I buy for my own kitchen. Things I understand.

Now, every treat we bake at 2 Treats Down starts with that same question: would I be happy eating this myself? If the answer's yes, it goes in the bowl. If I have to Google an ingredient to know what it is, it stays out.

### What that looks like in practice

Our peanut butter biscuits? Peanut butter, a touch of sweetness, baked simple. That's it. Our sweet potato chews? One ingredient: sweet potato, sliced and dehydrated. Our pupcakes? Flour based with peanut butter and carrot, our bestseller. Every ingredient serves a purpose. No filler, no extras.

This is also why we don't make wild claims about our treats. I'm not here to tell you these are a complete diet or a medical solution. They're treats: real food treats made with simple ingredients I trust.

### What we don't do

We don't claim to accommodate every allergy. If your dog needs a specific protein or a seed butter substitute, our kitchen might not be the right fit, and that's okay. We'd rather be honest about what we can and can't do.

We also draw a line between our treats and our celebration cakes. Treats are everyday rewards: crunchy biscuits, crunchy jerky, soft pupcakes. Our cakes are something special: custom, layered, decorated. Different products, different purposes. Both made with the same simple-ingredient philosophy.

### The short version

I use ingredients I know. I keep the list short. I don't use anything I can't pronounce. And I'd rather you know exactly what's in the bag than wonder.

That's it. That's the whole philosophy.`,
        image: "/images/gallery/5th.webp",
        tags: ["Ingredients", "Behind the Scenes", "Philosophy"],
    },
];

/* ─────────────────── Markdown Renderer ─────────────────── */

function RenderBody({ body }: { body: string }) {
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
                                            <strong className="text-brand-dark">{match[1]}</strong>{match[2]}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{cleanLine}</li>;
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
                                            <strong className="text-brand-dark">{match[1]}</strong>{match[2]}
                                        </li>
                                    );
                                }
                                return <li key={lIdx}>{cleanLine}</li>;
                            })}
                        </ol>
                    );
                }
                if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                    return (
                        <p key={index} className="leading-relaxed text-brand-dark/60 italic">
                            {block.replace(/^\*|\*$/g, "")}
                        </p>
                    );
                }
                return (
                    <p key={index} className="leading-relaxed text-brand-dark/80">
                        {block}
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

                            {/* CTA */}
                            <div className="mt-14 pt-10 border-t border-brand-pink/30 flex justify-center">
                                <Link
                                    href="/custom-cake"
                                    className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-heading text-lg md:text-xl px-10 py-4 rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Order a Custom Birthday Cake Today
                                </Link>
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
