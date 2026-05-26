"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { WordSlideUp } from "@/components/ui/ScrollReveal";

const reviews = [
    {
        id: 1,
        author: "Sarah & Buster",
        text: "Ordered a birthday cake for Buster and it was perfect! The custom design was exactly what we wanted, and he devoured it. Highly recommend for any dog owner.",
    },
    {
        id: 2,
        author: "Mike T.",
        text: "The sweet potato chews are incredible. My dog has heavy allergies and these are the only treats that don't upset his stomach. Customer service is also top-notch.",
    },
    {
        id: 3,
        author: "Emily R.",
        text: "We got a set of pupcakes for our Golden's gotcha day party. Everyone loved them! They looked beautiful and smelled like real human food.",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-surface py-24 border-b border-sumi/10">
            <div className="container max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-sumi">
                        <WordSlideUp text="Happy Tails" />
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg text-sumi/70"
                    >
                        Don't just take our word for it.
                    </motion.p>
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
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
