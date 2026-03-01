"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";

export default function Hero() {
    return (
        <section className="relative bg-brand-main pt-12 md:pt-24 pb-16 md:pb-32 overflow-hidden">
            {/* Background Boxes Mask */}
            <div className="absolute inset-0 w-full h-full bg-brand-main z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />

            <div className="container relative z-20 px-4 mx-auto max-w-7xl pointer-events-none">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col space-y-6 text-center lg:text-left pointer-events-auto"
                    >
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-brand-dark leading-tight">
                            Celebrate Your Pup with <span className="text-brand-orange">Handmade</span> Treats 🐾
                        </h1>
                        <p className="text-lg md:text-xl text-brand-dark/80 max-w-lg mx-auto lg:mx-0">
                            Gourmet, healthy, and preservative-free dog treats and fully personalized custom dog birthday cakes made with love in Kanata.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link
                                href="/custom-cake"
                                className="bg-brand-orange hover:bg-brand-brown transition-colors text-white px-8 py-4 rounded-full font-bold text-lg shadow-md"
                            >
                                Order Custom Cake
                            </Link>
                            <Link
                                href="/shop/pupcakes"
                                className="bg-white border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors px-8 py-4 rounded-full font-bold text-lg shadow-sm"
                            >
                                Shop Pupcakes
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Image / Collage Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative lg:h-[500px] w-full flex justify-center items-center pointer-events-auto"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl bg-brand-pink border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80"
                                    alt="Happy dog eating a gourmet treat"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white px-6 py-4 rounded-full shadow-xl flex items-center gap-3 border border-brand-pink animate-bounce z-10 w-max max-w-[90vw]">
                                <span className="text-2xl">🎂</span>
                                <span className="font-bold text-brand-brown whitespace-nowrap">100% Custom</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
