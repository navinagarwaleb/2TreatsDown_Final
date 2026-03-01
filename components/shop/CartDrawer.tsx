"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, getCartTotalCents } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    // Prevent hydration errors with zustand persist
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const total = (getCartTotalCents() / 100).toFixed(2);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-brand-brown/50 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-brand-main shadow-2xl z-[101] flex flex-col border-l border-brand-pink"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-brand-pink bg-white/50 backdrop-blur-sm">
                            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                                <ShoppingBag className="w-6 h-6 text-brand-orange" />
                                Your Cart
                            </h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-brand-pink rounded-full transition-colors text-brand-dark/70 hover:text-brand-dark"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4 opacity-70">
                                    <span className="text-6xl">🐾</span>
                                    <p className="text-lg">Your cart is feeling a bit empty.</p>
                                    <button
                                        onClick={closeCart}
                                        className="text-brand-orange font-bold hover:underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-brand-pink shadow-sm">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-pink shrink-0">
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-bold text-brand-dark leading-tight">{item.product.title}</h4>
                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="pt-1 text-brand-orange hover:text-brand-brown transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-brand-dark/70 text-sm mt-1">{item.product.price}</p>

                                            <div className="mt-auto flex items-center gap-4 pt-4">
                                                <div className="flex items-center gap-3 bg-brand-main rounded-full px-3 py-1 border border-brand-pink">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="text-brand-dark/50 hover:text-brand-orange transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-semibold text-sm w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="text-brand-dark/50 hover:text-brand-orange transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-6 border-t border-brand-pink bg-white">
                                <div className="flex justify-between items-center mb-6 text-xl">
                                    <span className="font-medium text-brand-dark/80">Subtotal</span>
                                    <span className="font-bold font-heading text-brand-dark">${total}</span>
                                </div>
                                <button className="w-full bg-brand-orange hover:bg-brand-brown text-white transition-colors duration-300 py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center gap-2 group">
                                    Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-center text-xs text-brand-dark/50 mt-4 px-4">
                                    Taxes & shipping calculated at checkout. Local pickup at our Kanata location available.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
