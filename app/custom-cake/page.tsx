"use client";

import CustomCakeForm from "@/components/forms/CustomCakeForm";
import { motion } from "framer-motion";

export default function CustomCakePage() {
    return (
        <div className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col space-y-6"
                >
                    <h1 className="text-5xl font-heading font-bold text-brand-dark leading-tight">
                        Design the Perfect Cake for Your <span className="text-brand-orange">Best Friend.</span>
                    </h1>
                    <p className="text-lg text-brand-dark/80">
                        Whether it's a first birthday, a gotcha day, or just a Tuesday worth celebrating, our custom cakes are made entirely from scratch using safe, healthy ingredients.
                    </p>
                    <div className="mt-8 space-y-4">
                        <h3 className="text-2xl font-bold font-heading">How it works:</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-brand-main text-brand-orange font-bold rounded-full shrink-0">1</span>
                                <span><strong className="text-brand-dark">Fill out the request form</strong> with your pup's details, occasion, and your design vision.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-brand-main text-brand-orange font-bold rounded-full shrink-0">2</span>
                                <span><strong className="text-brand-dark">We review it</strong> and send you a custom quote and confirmation within 48 hours.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="w-8 h-8 flex items-center justify-center bg-brand-main text-brand-orange font-bold rounded-full shrink-0">3</span>
                                <span><strong className="text-brand-dark">Pick it up</strong> from our Kanata bakery on your scheduled day and celebrate!</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 p-6 bg-brand-pink/30 rounded-2xl border border-brand-pink">
                        <h4 className="font-bold text-brand-dark mb-2">Notice:</h4>
                        <p className="text-sm opacity-90 text-brand-dark/80">
                            Please allow at least 1-2 weeks notice for custom cakes. Rush orders may be accommodated depending on availability. Local pickup only (Kanata).
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <CustomCakeForm />
                </motion.div>
            </div>
        </div>
    );
}
