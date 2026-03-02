"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function CustomCakeForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-orange text-brand-dark p-8 rounded-[2rem] text-center shadow-lg"
            >
                <span className="text-6xl mb-4 block">🐾🎉</span>
                <h3 className="text-3xl font-heading font-bold mb-4">Request Sent!</h3>
                <p className="text-lg opacity-90">
                    We've received your custom cake details. We'll review your request and get back to you within 24-48 hours with a quote and confirmation. Thank you!
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-brand-pink relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/50 rounded-bl-[100px] -z-10 mix-blend-multiply"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="name">Your Name</label>
                    <input required type="text" id="name" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors" placeholder="Jane Doe" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="email">Email Address</label>
                    <input required type="email" id="email" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors" placeholder="jane@example.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="dogName">Pup's Name</label>
                    <input required type="text" id="dogName" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors" placeholder="Buster" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="occasion">Occasion & Date</label>
                    <input required type="text" id="occasion" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors" placeholder="Birthday - June 12th" />
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
                <label className="font-semibold text-brand-dark" htmlFor="theme">Theme & Design Vision</label>
                <textarea required id="theme" rows={4} className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors resize-none" placeholder="Looking for a blue icing cake with a paw print pattern..."></textarea>
            </div>

            <div className="flex flex-col gap-2 mb-8">
                <label className="font-semibold text-brand-dark" htmlFor="allergies">Allergies or Restrictions</label>
                <input type="text" id="allergies" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-orange transition-colors" placeholder="No peanut butter, grain-free preferred" />
            </div>

            <button type="submit" className="w-full bg-brand-orange hover:bg-brand-brown text-brand-dark hover:text-white font-bold text-lg p-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md">
                <Send className="w-5 h-5" /> Request Quote
            </button>
            <p className="text-center text-sm text-brand-dark/50 mt-4">* Pickup only in Kanata, ON.</p>
        </form>
    );
}
