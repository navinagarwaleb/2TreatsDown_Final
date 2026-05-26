"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { sendOrderNotificationEmail } from "@/app/actions/checkout";

export default function CheckoutSuccessHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const clearCart = useCartStore((state) => state.clearCart);
    const [showSuccess, setShowSuccess] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (searchParams?.get("checkout") === "success" && !emailSent) {
            setEmailSent(true);
            
            const orderId = searchParams.get("orderId") || "";
            const transactionId = searchParams.get("transactionId") || "";

            // Trigger server action to retrieve order details and email the merchant
            if (orderId || transactionId) {
                sendOrderNotificationEmail(orderId, transactionId).catch((err) => {
                    console.error("Failed to trigger order email notification:", err);
                });
            }

            clearCart();
            setShowSuccess(true);
            
            // Clean up the URL query parameters
            const newUrl = window.location.pathname;
            router.replace(newUrl);
        }
    }, [searchParams, clearCart, router, emailSent]);

    if (!showSuccess) return null;

    return (
        <AnimatePresence>
            {showSuccess && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSuccess(false)}
                        className="fixed inset-0 bg-brand-brown/40 backdrop-blur-sm"
                    />

                    {/* Dialog Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 350 }}
                        className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-brand-pink shadow-2xl relative z-10 text-center space-y-6"
                    >
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-brand-main rounded-full text-brand-dark/50 hover:text-brand-dark transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-heading font-bold text-brand-dark">Order Placed!</h3>
                            <p className="text-brand-dark/70 text-sm">
                                Thank you for your order! We've received your payment and are starting to bake your fresh, all-natural treats.
                            </p>
                        </div>

                        <div className="p-4 bg-brand-pink/20 rounded-2xl border border-brand-pink text-xs text-brand-dark/80 font-medium">
                            📍 Pickup instructions and date coordination will be sent to your email shortly.
                        </div>

                        <button
                            onClick={() => setShowSuccess(false)}
                            className="w-full bg-brand-pink hover:bg-brand-brown text-brand-dark hover:text-white transition-colors duration-300 py-3.5 rounded-xl font-bold shadow-md cursor-pointer"
                        >
                            Continue Browsing
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
