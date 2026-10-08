"use client";

import CustomCakeForm from "@/components/forms/CustomCakeForm";
import { motion } from "framer-motion";

export default function CustomCakePage() {
    return (
        <div className="container mx-auto px-4 max-w-7xl pt-32 pb-16 md:pt-48 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col space-y-6"
                >
                    <h1 className="text-5xl font-heading font-bold text-brand-dark leading-tight">
                        Design the Perfect Cake for Your <span className="text-brand-orange">Best Friend.</span>
                    </h1>
                    <p className="text-lg text-brand-dark/80">
                        Whether it's a first birthday, a gotcha day, or a Tuesday worth celebrating, our custom cakes are made entirely from scratch using safe, healthy ingredients.
                    </p>

                    <div className="mt-8 p-6 bg-clay-rose/10 border-l-4 border-clay-rose rounded-2xl">
                        <h4 className="font-bold text-clay-rose mb-2">🐾 Custom Cake Bookings — Currently Unavailable</h4>
                        <p className="text-sm text-sumi/80 leading-relaxed">
                            Our October &amp; November custom order bookings are now closed, and we are not accepting any new orders for them. December bookings and future dates are currently unavailable for booking.
                        </p>
                        <p className="text-sm text-sumi/80 leading-relaxed mt-2">
                            We&rsquo;ll share any updates regarding future availability right here on our website and Instagram, so stay tuned! ❤️
                        </p>
                        <p className="text-xs text-sumi/60 italic mt-3">
                            Thank you so much for your continued love and support! — 2 Treats Down 🐾
                        </p>
                    </div>

                    <div className="mt-8 p-6 bg-brand-pink/30 rounded-2xl border border-brand-pink">
                        <h4 className="font-bold text-brand-dark mb-2">Pickup:</h4>
                        <p className="text-sm opacity-90 text-brand-dark/80">
                            When custom orders resume, pickup will be available from our Kanata location. Stay tuned for updates! 🐾
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <CustomCakeForm />
                </motion.div>
            </div>
        </div>
    );
}