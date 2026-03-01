"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
        <section className="bg-brand-pink/30 py-24">
            <div className="container max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-heading font-bold text-brand-dark">Happy Tails</h2>
                    <p className="text-lg text-brand-dark/70 mt-4">Don't just take our word for it.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.4 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-brand-pink relative"
                        >
                            <div className="flex gap-1 text-brand-orange mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-current" />
                                ))}
                            </div>
                            <p className="text-brand-dark/80 italic mb-6 text-lg relative z-10">"{review.text}"</p>
                            <p className="font-bold text-brand-brown">— {review.author}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
