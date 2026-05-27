"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
    {
        id: 1,
        title: "The Peanut Butter & Banana Pupcakes Are Here!",
        date: "May 15, 2025",
        author: "Akshata",
        excerpt:
            "Our newest flavour combination has been a hit at the farmers' market. Made with real peanut butter, ripe bananas, and oat flour — these pupcakes are fluffy, fragrant, and got four paws up from Piper himself.",
        body: "After weeks of testing in our Kanata kitchen, we're thrilled to introduce our Peanut Butter & Banana Pupcakes — a flavour combination that Piper simply couldn't get enough of during trials (and trust us, he's a tough critic).\n\nThese pupcakes are baked with human-grade ingredients: creamy peanut butter (no xylitol, of course), mashed ripe bananas for natural sweetness, oat flour for a gentle digestible base, and a touch of cinnamon for warmth. No preservatives, no fillers — just real food that happens to look like a treat.\n\nEach pupcake is hand-frosted with a yogurt-based topping and finished with a single freeze-dried banana chip. They're perfect for birthdays, gotcha days, or just because your pup deserves something special.\n\nYou can find them at the Carp Farmers' Market every Saturday, or order online for local pickup in Kanata.",
        image: "/images/blog/pupcakes.jpg",
        tags: ["New Products", "Recipes", "Pupcakes"],
    },
    {
        id: 2,
        title: "Why We Source Locally & What It Means for Your Dog",
        date: "April 28, 2025",
        author: "Akshata",
        excerpt:
            "Ever wondered what goes into our treats beyond the ingredient list? We're sharing our sourcing philosophy and why local ingredients make a real difference — for your pup and our community.",
        body: "At 2 Treats Down, we believe that great treats start with great ingredients — and great ingredients come from people who care as much as we do.\n\nWhenever possible, we source our ingredients from local farms and suppliers here in Eastern Ontario. That means our oats come from a family-run mill in the Ottawa Valley, our peanut butter is made by a small batch producer just outside of town, and our eggs (yes, we use eggs in some recipes!) come from free-range hens at a farm in Carp.\n\nWhy does this matter for your dog? Fresher ingredients mean higher nutritional value, better flavour, and fewer preservatives. Ingredients that travel shorter distances arrive at our kitchen closer to their natural state — and your pup gets to taste that difference.\n\nIt also means we can trace every batch back to its source. When a customer asks what's in a treat, we don't just read the label — we can tell you which farm the oats came from and when they were harvested.\n\nAnd of course, it strengthens our local food community. Small businesses supporting small businesses — that's how a community grows.\n\nNext time you pick up a bag of our treats, know that every ingredient carries a story. And every bite supports something bigger than just one bakery.",
        image: "/images/blog/local-sourcing.jpg",
        tags: ["Behind the Scenes", "Ingredients", "Community"],
    },
];

export default function Blog() {
    return (
        <main className="min-h-screen bg-brand-light pb-24 animate-in fade-in duration-500">
            {/* Header Section */}
            <section className="bg-brand-main py-20 border-b border-brand-pink relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-dark mb-6 tracking-tight">
                        Blog
                    </h1>
                    <p className="text-lg md:text-xl text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
                        Stories, recipes, and behind-the-scenes updates from our Kanata kitchen.
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-brown/10 rounded-full blur-2xl"></div>
            </section>

            {/* Blog Posts */}
            <div className="container mx-auto px-4 max-w-5xl py-20 md:py-28 space-y-24">
                {blogPosts.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    >
                        {/* Image */}
                        <div className={index % 2 === 0 ? "" : "order-2 md:order-1"}>
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className={index % 2 === 0 ? "order-2" : "order-2 md:order-2"}>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-sans tracking-wide uppercase text-clay-rose bg-brand-pink/30 px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Date & Author */}
                            <p className="text-sm font-sans text-brand-dark/50 mb-3">
                                {post.date} &middot; by {post.author}
                            </p>

                            {/* Title */}
                            <h2 className="text-3xl font-heading font-bold text-brand-orange mb-4 leading-tight">
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-brand-dark/80 leading-relaxed text-lg mb-6">
                                {post.excerpt}
                            </p>

                            {/* Body (truncated preview) */}
                            <div className="text-brand-dark/70 leading-relaxed text-base space-y-3 line-clamp-4 md:line-clamp-5">
                                {post.body.split("\n\n").slice(0, 2).map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>

                            {/* Read More */}
                            <div className="mt-6">
                                <span className="inline-block font-heading text-lg text-clay-rose hover:text-brand-brown transition-colors duration-300 cursor-pointer group">
                                    Read More
                                    <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </main>
    );
}
