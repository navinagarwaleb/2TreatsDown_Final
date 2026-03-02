"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductGallery({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-brand-pink border border-brand-pink shadow-lg">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`${title} - Image ${currentIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover absolute top-0 left-0"
                    />
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar justify-start">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${currentIndex === idx ? "border-brand-orange scale-105" : "border-brand-pink/50 opacity-70 hover:opacity-100"
                                }`}
                        >
                            <img src={img} alt={`${title} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
