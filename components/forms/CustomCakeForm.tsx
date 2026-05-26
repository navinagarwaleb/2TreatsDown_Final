"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { submitCustomCakeRequest } from "@/app/actions/custom-cake";

export default function CustomCakeForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName") as string,
            lastName: formData.get("lastName") as string,
            pupFirstName: formData.get("pupFirstName") as string,
            pupLastName: formData.get("pupLastName") as string,
            pupAge: formData.get("pupAge") as string,
            email: formData.get("email") as string,
            occasion: formData.get("occasion") as string,
            celebrationDate: formData.get("celebrationDate") as string,
            cakeSize: formData.get("cakeSize") as string,
            allergies: formData.get("allergies") as string,
            comments: formData.get("comments") as string || undefined,
            referral: formData.get("referral") as string,
        };

        try {
            const result = await submitCustomCakeRequest(data);
            if (result.success) {
                setSubmitted(true);
            } else {
                setError(result.error || "Failed to submit request. Please try again.");
            }
        } catch (err) {
            setError("A network error occurred. Please verify your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-pink text-brand-dark p-8 rounded-[2rem] text-center shadow-lg"
            >
                <span className="text-6xl mb-4 block">🐾🎉</span>
                <h3 className="text-3xl font-heading font-bold mb-4">Inquiry Submitted!</h3>
                <p className="text-lg opacity-90">
                    Thank you! We've received your custom cake inquiry details. We will review your request and get back to you within 24-48 hours.
                </p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-brand-pink relative overflow-hidden text-left">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/50 rounded-bl-[100px] -z-10 mix-blend-multiply"></div>

            {/* Customer Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="firstName">First Name</label>
                    <input required type="text" id="firstName" name="firstName" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="Jane" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="lastName">Last Name</label>
                    <input required type="text" id="lastName" name="lastName" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="Doe" />
                </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2 mb-6">
                <label className="font-semibold text-brand-dark" htmlFor="email">Email Address</label>
                <input required type="email" id="email" name="email" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="jane@example.com" />
            </div>

            {/* Pup's Name fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="pupFirstName">Pup's First Name</label>
                    <input required type="text" id="pupFirstName" name="pupFirstName" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="Buster" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="pupLastName">Pup's Last Name</label>
                    <input required type="text" id="pupLastName" name="pupLastName" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="Barker" />
                </div>
            </div>

            {/* Pup's Age and Celebration Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="pupAge">Pup's Age</label>
                    <input required type="text" id="pupAge" name="pupAge" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="e.g., 2 years" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="celebrationDate">Celebration Date</label>
                    <input required type="date" id="celebrationDate" name="celebrationDate" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark" />
                </div>
            </div>

            {/* Occasion and Cake Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="occasion">Occasion</label>
                    <select required id="occasion" name="occasion" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark">
                        <option value="">Select an occasion</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Gotcha Day">Gotcha Day</option>
                        <option value="Gender Reveal">Gender Reveal</option>
                        <option value="Just Because">Just Because</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-brand-dark" htmlFor="cakeSize">Cake Size</label>
                    <select required id="cakeSize" name="cakeSize" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark">
                        <option value="">Select a size</option>
                        <option value="4in">4in</option>
                        <option value="6in">6in</option>
                        <option value="not sure">Not Sure</option>
                    </select>
                </div>
            </div>

            {/* Allergies or Dietary Restrictions */}
            <div className="flex flex-col gap-2 mb-6">
                <label className="font-semibold text-brand-dark" htmlFor="allergies">Allergies or Dietary Restrictions</label>
                <input required type="text" id="allergies" name="allergies" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40" placeholder="e.g., No peanut butter, grain-free, or write 'None'" />
            </div>

            {/* Comments (Optional) */}
            <div className="flex flex-col gap-2 mb-6">
                <label className="font-semibold text-brand-dark" htmlFor="comments">Comments / Design Vision <span className="text-xs font-normal text-brand-dark/50">(Optional)</span></label>
                <textarea id="comments" name="comments" rows={4} className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark placeholder-brand-dark/40 resize-none" placeholder="Let us know any colors, decorations, themes, or special details you have in mind..."></textarea>
            </div>

            {/* How did you hear about us */}
            <div className="flex flex-col gap-2 mb-8">
                <label className="font-semibold text-brand-dark" htmlFor="referral">How did you hear about us?</label>
                <select required id="referral" name="referral" className="p-3 bg-brand-main border border-brand-pink rounded-xl outline-none focus:border-brand-pink transition-colors text-brand-dark">
                    <option value="">Select an option</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Word of Mouth">Word of Mouth</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Event or Local Market">Event or Local Market</option>
                    <option value="Other">Other / Referral</option>
                </select>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                    ⚠️ {error}
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-pink hover:bg-brand-brown text-brand-dark hover:text-white font-bold text-lg p-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" /> Submit
                    </>
                )}
            </button>
            <p className="text-center text-sm text-brand-dark/50 mt-4">* Pickup only in Kanata, ON.</p>
        </form>
    );
}
