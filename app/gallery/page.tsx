"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
    { src: "/images/gallery/1st.webp", alt: "Custom dog birthday cake with specialty frosting" },
    { src: "/images/gallery/2nd.webp", alt: "Premium dehydrated dog treats and healthy ingredients" },
    { src: "/images/gallery/3rd.webp", alt: "Organic preservative-free celebration dog cookies" },
    { src: "/images/gallery/4th.webp", alt: "Handmade small-batch gourmet pupcakes and cupcakes" },
    { src: "/images/gallery/5th.webp", alt: "Artisan dog treats prepared in Kanata" },
    { src: "/images/gallery/6th.webp", alt: "Gourmet decorated celebration cookies for dogs" },
    { src: "/images/gallery/ComfyUI_00028_.webp", alt: "Gourmet decorated celebration cake for dogs" },
    { src: "/images/gallery/ComfyUI_00029_.webp", alt: "Freshly baked dog treats and cookies" },
    { src: "/images/gallery/ComfyUI_00030_.webp", alt: "Custom dog birthday cake with natural frosting" },
    { src: "/images/gallery/ComfyUI_00031_.webp", alt: "All-natural dehydrated healthy dog treats" },
    { src: "/images/gallery/ComfyUI_00040_.webp", alt: "Artisan birthday cake for dogs" },
    { src: "/images/gallery/end.webp", alt: "Fresh from our kitchen, baked with love" }
];

export default function GalleryPage() {
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (selectedIdx === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIdx(null);
            else if (e.key === "ArrowRight") handleNext();
            else if (e.key === "ArrowLeft") handlePrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIdx]);

    const handleNext = () => {
        if (selectedIdx === null) return;
        setSelectedIdx((prevIdx) => (prevIdx !== null && prevIdx < galleryImages.length - 1 ? prevIdx + 1 : 0));
    };

    const handlePrev = () => {
        if (selectedIdx === null) return;
        setSelectedIdx((prevIdx) => (prevIdx !== null && prevIdx > 0 ? prevIdx - 1 : galleryImages.length - 1));
    };

    return (
        <main className="min-h-screen bg-brand-light pb-24 animate-in fade-in duration-500">
            {/* Header Section (Consistent with About & Reviews) */}
            <section className="bg-brand-main py-20 border-b border-brand-pink relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-dark mb-6 tracking-tight">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-xl text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
                        A visual celebration of our custom dog cakes, small-batch gourmet treats, and the happy pups who love them.
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-brown/10 rounded-full blur-2xl"></div>
            </section>

            {/* Gallery Grid */}
            <section className="container mx-auto px-4 max-w-7xl py-16 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {galleryImages.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx % 4 * 0.1 }}
                            onClick={() => setSelectedIdx(idx)}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-washi border border-sumi/5 shadow-sm cursor-pointer"
                        >
                            {/* Next.js Image for optimization */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-text-roll"
                                priority={idx < 4}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    className="bg-white/95 text-brand-dark p-3.5 rounded-full shadow-lg"
                                >
                                    <ZoomIn className="w-5 h-5 text-brand-brown" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedIdx !== null && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-4">
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedIdx(null)}
                            className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation - Previous */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 md:left-8 z-50 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        {/* Lightbox Content Container */}
                        <div className="relative max-w-5xl w-full h-[75vh] md:h-[80vh] flex flex-col items-center justify-center">
                            <motion.div
                                key={selectedIdx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={galleryImages[selectedIdx].src}
                                    alt={galleryImages[selectedIdx].alt}
                                    fill
                                    sizes="100vw"
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                            {/* Caption Text */}
                            <motion.p
                                key={`caption-${selectedIdx}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-white/80 font-sans text-sm md:text-base text-center mt-6 max-w-xl"
                            >
                                {galleryImages[selectedIdx].alt}
                            </motion.p>
                        </div>

                        {/* Navigation - Next */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 md:right-8 z-50 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-colors cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
