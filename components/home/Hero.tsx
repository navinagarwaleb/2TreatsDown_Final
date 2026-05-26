"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const handleScroll = () => {
        const introSection = document.getElementById("main-content-start");
        if (introSection) {
            introSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const { scrollY } = useScroll();

    // Smoothly blur and dim brightness as the user scrolls
    const filterEffect = useTransform(
        scrollY,
        [0, 800],
        ["blur(0px) brightness(0.88)", "blur(16px) brightness(0.65)"]
    );

    // Subtle scale-up zoom parallax effect
    const scaleEffect = useTransform(scrollY, [0, 800], [1.05, 1.15]);

    // Fades image slightly as the content scrolls up
    const opacityEffect = useTransform(scrollY, [0, 800], [1, 0.65]);

    return (
        <section className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-surface">
            {/* Background Image (Single Image Hero with scroll-driven blur & scale) */}
            <div className="absolute inset-0 w-full h-full select-none pointer-events-none overflow-hidden">
                <motion.img
                    src="/images/hero-image.webp"
                    alt="Happy dog enjoying 2 Treats Down treats"
                    className="w-full h-full object-cover object-center"
                    style={{
                        filter: filterEffect,
                        scale: scaleEffect,
                        opacity: opacityEffect,
                    }}
                />
                
                {/* Radial Vignette Mask (darkens edges using Sumi) */}
                <div 
                    className="absolute inset-0 z-[2]" 
                    style={{
                        background: "radial-gradient(circle, transparent 20%, rgba(15, 22, 37, 0.5) 100%)",
                    }}
                />

                {/* Top/Bottom Gradient Overlay */}
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sumi/40 to-transparent z-[3]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-sumi/40 to-transparent z-[3]" />
            </div>


            {/* Scroll Cue (Top Right/Bottom Center Overlay matching inspiration) */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                onClick={handleScroll}
                className="group absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2 focus:outline-none"
            >
                <span className="relative inline-flex overflow-hidden font-sans text-[11px] tracking-[0.18em] uppercase text-washi/80">
                    <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
                        Scroll
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                        Scroll
                    </span>
                </span>
                <span aria-hidden="true" className="scroll-cue-line block w-px h-8 md:h-12 bg-washi/60 origin-top" />
            </motion.button>
        </section>
    );
}
