"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

const reviews = [
    {
        id: 1,
        author: "Emily Mintha",
        date: "June 16, 2023",
        text: "100% recommend! The cake I ordered for my great dane, Honey, was absolutely amazing. I can’t get over how beautiful it was- I almost felt bad watching my dog devour it Thanks again!!!",
    },
    {
        id: 2,
        author: "Norma Newcombe",
        date: "June 16, 2023",
        text: "We had a beautiful cake made for my 13 year old doodle. It was a big hit with his sister and cousin. Not going to lie, I almost took a bite myself\nThe PB treats are also loved around here!\nOrdering and payment was easy, and the option to pay for delivery was perfect for us.",
    },
    {
        id: 3,
        author: "Amanda Ing",
        date: "April 12, 2024",
        text: "We ordered a cake from 2 Treats Down for my dog's birthday and she absolutely loved it! I gave my concept to Akshata and she was able to execute the custom design to perfection. I'd recommend her cakes for anyone looking to spoil their furry friends with an extra special treat!",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-surface py-24 border-b border-sumi/10">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-sumi leading-tight">
                        <WordSlideUp text="Loved By Dogs. Trusted By Pawrents" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white rounded-3xl p-8 shadow-sm border border-brand-pink/30 flex flex-col hover:shadow-md transition-shadow relative text-left"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                                ))}
                            </div>
                            <p className="text-sumi/80 text-base leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                                "{review.text}"
                            </p>
                            <div className="mt-auto pt-6 border-t border-brand-pink/30 flex flex-col">
                                <span className="font-bold text-sumi text-lg">{review.author}</span>
                                <span className="text-xs text-sumi/50 mt-1">{review.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
