"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

interface CharacterRevealProps {
    text: string;
    className?: string;
}

export function CharacterReveal({ text, className = "" }: CharacterRevealProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);
    
    // Track scroll position of the element
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 45%"],
    });

    const words = text.split(" ");
    
    // Calculate total character count to stagger offsets correctly
    let charIndex = 0;
    const totalChars = text.length;

    const justifyClass = className.includes("justify-") ? "" : "justify-center";

    return (
        <p ref={containerRef} className={`${className} flex flex-wrap ${justifyClass}`}>
            {words.map((word, wordIdx) => {
                const wordChars = word.split("");
                
                return (
                    <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                        {wordChars.map((char, charIdx) => {
                            const index = charIndex++;
                            const start = index / totalChars;
                            const end = (index + 1) / totalChars;
                            
                            // Map local scroll progress to opacity (0.2 -> 1.0)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

                            return (
                                <motion.span
                                    key={charIdx}
                                    style={{ opacity }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </span>
                );
            })}
        </p>
    );
}

interface WordSlideUpProps {
    text: string;
    className?: string;
    delay?: number;
}

export function WordSlideUp({ text, className = "", delay = 0 }: WordSlideUpProps) {
    const words = text.split(" ");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: { y: "-100%", opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        },
    };



    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            className={`flex flex-wrap ${className.includes("justify-") ? "" : "justify-center"} overflow-hidden w-full ${className}`}
        >
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden mr-[0.25em] pb-[0.18em] -mb-[0.18em]">
                    <motion.span variants={wordVariants} className="inline-block">
                        {word}
                      </motion.span>
                </span>
            ))}
        </motion.span>
    );
}
