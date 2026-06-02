"use client";

import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createCheckoutSession } from "@/app/actions/checkout";

export default function CartDrawer() {
    const { isOpen, closeCart, items, removeItem, updateQuantity, getCartTotalCents } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);

    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");

    // Prevent hydration errors with zustand persist
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Calculate maximum prep time required by items currently in the cart
    const maxPrepDays = items.reduce((max, item) => {
        return Math.max(max, item.product.prepTimeDays || 3);
    }, 3);

    const getMinDateString = () => {
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + maxPrepDays);
        const yyyy = minDate.getFullYear();
        const mm = String(minDate.getMonth() + 1).padStart(2, '0');
        const dd = String(minDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    // Auto-reset or adjust date selection if it violates minimum prep time (e.g. after cart item additions)
    useEffect(() => {
        if (!pickupDate) return;
        const minDateStr = getMinDateString();
        if (pickupDate < minDateStr) {
            setPickupDate("");
            setPickupTime("");
        }
    }, [maxPrepDays, pickupDate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPickupDate(e.target.value);
        setPickupTime("");
    };

    const getTimeSlots = (dateString: string) => {
        if (!dateString) return [];
        const parts = dateString.split("-");
        if (parts.length !== 3) return [];
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const date = new Date(year, month, day);

        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        if (isWeekend) {
            // Saturday and Sunday 10:00 am to 5:00 pm
            return [
                "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
                "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
                "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
                "4:00 PM", "4:30 PM", "5:00 PM"
            ];
        } else {
            // Monday to Friday - 2:00 pm to 7:00 pm
            return [
                "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
                "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
                "6:00 PM", "6:30 PM", "7:00 PM"
            ];
        }
    };

    const handleCheckout = async () => {
        if (items.length === 0) return;
        if (!pickupDate || !pickupTime) {
            setCheckoutError("Please select a pickup date and time.");
            return;
        }
        setCheckoutLoading(true);
        setCheckoutError(null);
        try {
            const formattedDateTime = `${pickupDate} at ${pickupTime}`;
            const result = await createCheckoutSession(items, formattedDateTime);
            if (result.success && result.url) {
                window.location.href = result.url;
            } else {
                setCheckoutError(result.error || "Failed to start checkout. Please try again.");
            }
        } catch (err) {
            setCheckoutError("A network error occurred. Please try again.");
        } finally {
            setCheckoutLoading(false);
        }
    };

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
                                {/* Pickup Coordinator UI */}
                                <div className="mb-5 p-4 bg-brand-main/50 rounded-2xl border border-brand-pink/50">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-sm text-brand-dark flex items-center gap-1.5">
                                            <span>📅</span> Coordinated Pickup
                                        </h3>
                                        <span className="text-[10px] bg-brand-pink/30 text-brand-brown font-semibold px-2.5 py-0.5 rounded-full">
                                            Kanata Location Only
                                        </span>
                                    </div>
                                    
                                    <p className="text-[11px] text-brand-dark/70 mb-3 leading-relaxed">
                                        Hours: Mon–Fri 2pm–7pm | Sat–Sun 10am–5pm. 
                                        Requires <strong className="text-brand-brown">{maxPrepDays}-day</strong> lead time.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1 text-left">
                                            <label className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider pl-1">Date</label>
                                            <input
                                                type="date"
                                                min={getMinDateString()}
                                                value={pickupDate}
                                                onChange={handleDateChange}
                                                required
                                                className="w-full text-xs p-2.5 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-brown transition-colors text-brand-dark cursor-pointer"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 text-left">
                                            <label className="text-[10px] font-bold text-brand-dark/60 uppercase tracking-wider pl-1">Time</label>
                                            <select
                                                value={pickupTime}
                                                onChange={(e) => setPickupTime(e.target.value)}
                                                disabled={!pickupDate}
                                                required
                                                className="w-full text-xs p-2.5 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-brown transition-colors text-brand-dark cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <option value="">Select Time</option>
                                                {getTimeSlots(pickupDate).map((slot) => (
                                                    <option key={slot} value={slot}>
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-6 text-xl">
                                    <span className="font-medium text-brand-dark/80">Subtotal</span>
                                    <span className="font-bold font-heading text-brand-dark">${total}</span>
                                </div>

                                {checkoutError && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                                        ⚠️ {checkoutError}
                                    </div>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading || !pickupDate || !pickupTime}
                                    className="w-full bg-brand-pink hover:bg-brand-brown text-brand-dark hover:text-white transition-colors duration-300 py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    {checkoutLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Preparing Checkout...
                                        </>
                                    ) : (
                                        <>
                                            Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
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
