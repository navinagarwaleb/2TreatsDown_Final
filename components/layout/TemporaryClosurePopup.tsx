"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";

const STORAGE_KEY = "2td-closure-notice-dismissed";
const CLOSURE_END = new Date("2026-08-27T00:00:00");

export default function TemporaryClosurePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState<boolean | null>(null);

    const handleDismiss = useCallback(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {
            // sessionStorage unavailable (private browsing, etc.)
        }
        setIsVisible(false);
    }, []);

    useEffect(() => {
        // Date check: don't show at all after August 27
        if (Date.now() >= CLOSURE_END.getTime()) {
            setShouldRender(false);
            return;
        }

        // Session check: already dismissed this browsing session
        try {
            const dismissed = sessionStorage.getItem(STORAGE_KEY);
            if (dismissed) {
                setShouldRender(false);
                return;
            }
        } catch {
            // sessionStorage unavailable — proceed to show
        }

        setShouldRender(true);

        // Delay so it appears shortly after EntranceLoader finishes (~1.65s)
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 2200);

        return () => clearTimeout(showTimer);
    }, []);

    // Handle Escape key
    useEffect(() => {
        if (!isVisible) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleDismiss();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isVisible, handleDismiss]);

    if (shouldRender === false) return null;
    if (shouldRender === null) return null; // still deciding on mount

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[180] flex items-center justify-center p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Temporary closure notice"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-sumi/20 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDismiss}
                    />

                    {/* Popup Card */}
                    <motion.div
                        className="relative w-full max-w-sm sm:max-w-md bg-surface rounded-2xl shadow-2xl p-8 sm:p-10 text-center"
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {/* X Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-2 text-sumi/35 hover:text-sumi transition-colors duration-200 rounded-full hover:bg-sumi/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-rose"
                            aria-label="Close notice"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Subtle heart icon */}
                        <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-pink/15">
                            <Heart className="w-6 h-6 text-clay-rose" fill="currentColor" />
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading text-2xl sm:text-3xl text-sumi mb-3">
                            A Little Break 🐾
                        </h2>

                        {/* Message */}
                        <p className="font-sans text-base sm:text-lg text-sumi/70 leading-relaxed mb-3">
                            We&rsquo;ll be closed for pickups from{" "}
                            <strong className="text-clay-rose font-semibold">
                                August 22&ndash;26
                            </strong>
                            .
                        </p>
                        <p className="font-sans text-base sm:text-lg text-sumi/70 leading-relaxed mb-6">
                            Pickups will resume on{" "}
                            <strong className="text-clay-rose font-semibold">
                                August 27
                            </strong>
                            .
                        </p>
                        <p className="font-sans text-sm sm:text-base text-sumi/50 italic mb-8 leading-relaxed">
                            Thank you for your understanding and for supporting 2 Treats Down! 💛
                        </p>

                        {/* Got it Button */}
                        <button
                            onClick={handleDismiss}
                            className="inline-block px-9 py-3 bg-clay-rose text-washi font-sans font-medium text-base rounded-full hover:bg-clay-rose/90 active:bg-clay-rose/80 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-rose focus-visible:ring-offset-2 min-h-[44px]"
                        >
                            Got it
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}