"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const rows = new Array(30).fill(1);
    const cols = new Array(45).fill(1);

    const colors = [
        "#eacbc0", // darker brand-pink 
        "#be815d", // darker soft-terracotta / accent
        "#e4c0ab", // darker soft-peach
        "#ddcfc9", // darker tertiary
        "#d5ae99", // darker table-heading-color
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
                className
            )}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={`row` + i}
                    className="w-16 h-8 border-l border-[#e4cebf] relative"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            whileHover={{
                                backgroundColor: getRandomColor(),
                                transition: { duration: 0 },
                            }}
                            key={`col` + j}
                            className="w-16 h-8 border-r border-t border-[#e4cebf] relative flex items-center justify-center"
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <Plus
                                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-[#e4cebf] pointer-events-none stroke-[1px]"
                                />
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
