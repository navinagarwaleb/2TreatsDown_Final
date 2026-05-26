"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function EntranceLoader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Complete the exit animation after 1.65 seconds (3/4th of 2.2s)
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1650);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.22, // 3/4th of 0.3s
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8, // 3/4th of 1.1s
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        },
    };


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-surface select-none pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 1.35, // 3/4th of 1.8s
                            ease: [0.4, 0, 0.2, 1],
                        },
                    }}
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-baseline text-sumi/80 font-heading text-[clamp(2.5rem,8vw,6rem)] tracking-[0.12em]"
                    >
                        <motion.span variants={childVariants} className="inline-block">W</motion.span>
                        <motion.span variants={childVariants} className="inline-block">o</motion.span>
                        <motion.span variants={childVariants} className="inline-block">o</motion.span>
                        <motion.span variants={childVariants} className="inline-block text-clay-rose">f</motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
