"use client";

export default function CustomCakeForm() {
    return (
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-brand-pink relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/50 rounded-bl-[100px] -z-10 mix-blend-multiply"></div>

            {/* Closure Banner */}
            <div className="mb-8 p-6 bg-clay-rose/10 border-l-4 border-clay-rose rounded-2xl text-left">
                <p className="font-heading text-xl font-bold text-clay-rose mb-2">
                    🐾 Custom Cake Bookings — Currently Unavailable
                </p>
                <p className="font-sans text-base text-sumi/80 leading-relaxed">
                    Our October &amp; November custom order bookings are now closed, and we are not accepting any new orders for them.
                </p>
                <p className="font-sans text-base text-sumi/80 leading-relaxed mt-2">
                    December bookings and future dates are currently unavailable for booking.
                </p>
                <p className="font-sans text-base text-sumi/80 leading-relaxed mt-2">
                    We&rsquo;ll share any updates regarding future availability right here on our website and Instagram, so stay tuned! ❤️
                </p>
                <p className="font-sans text-sm text-sumi/60 italic mt-4">
                    Thank you so much for your continued love and support! — 2 Treats Down 🐾
                </p>
            </div>

            {/* Disabled Form Fields — for reference only */}
            <div className="space-y-6 opacity-60 pointer-events-none select-none">
                {/* Customer Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="firstName">First Name</label>
                        <input disabled readOnly type="text" id="firstName" name="firstName" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="Jane" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="lastName">Last Name</label>
                        <input disabled readOnly type="text" id="lastName" name="lastName" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="Doe" />
                    </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-semibold text-brand-dark/60" htmlFor="email">Email Address</label>
                    <input disabled readOnly type="email" id="email" name="email" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="jane@example.com" />
                </div>

                {/* Pup's Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="pupFirstName">Pup's First Name</label>
                        <input disabled readOnly type="text" id="pupFirstName" name="pupFirstName" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="Buster" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="pupLastName">Pup's Last Name</label>
                        <input disabled readOnly type="text" id="pupLastName" name="pupLastName" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="Barker" />
                    </div>
                </div>

                {/* Pup's Age and Celebration Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="pupAge">Pup's Age</label>
                        <input disabled readOnly type="text" id="pupAge" name="pupAge" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="e.g., 2 years" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="celebrationDate">Celebration Date</label>
                        <input disabled readOnly type="date" id="celebrationDate" name="celebrationDate" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50" />
                    </div>
                </div>

                {/* Occasion and Cake Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="occasion">Occasion</label>
                        <select disabled id="occasion" name="occasion" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50">
                            <option value="">Select an occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Gotcha Day">Gotcha Day</option>
                            <option value="Gender Reveal">Gender Reveal</option>
                            <option value="Just Because">Just Because</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-brand-dark/60" htmlFor="cakeSize">Cake Size</label>
                        <select disabled id="cakeSize" name="cakeSize" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50">
                            <option value="">Select a size</option>
                            <option value="4in">4in</option>
                            <option value="6in">6in</option>
                            <option value="not sure">Not Sure</option>
                        </select>
                    </div>
                </div>

                {/* Allergies */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-semibold text-brand-dark/60" htmlFor="allergies">Allergies or Dietary Restrictions</label>
                    <input disabled readOnly type="text" id="allergies" name="allergies" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30" placeholder="e.g., No peanut butter, grain-free, or write 'None'" />
                </div>

                {/* Comments */}
                <div className="flex flex-col gap-2 mb-6">
                    <label className="font-semibold text-brand-dark/60" htmlFor="comments">Comments / Design Vision <span className="text-xs font-normal text-brand-dark/30">(Optional)</span></label>
                    <textarea disabled readOnly id="comments" name="comments" rows={4} className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50 placeholder-brand-dark/30 resize-none" placeholder="Let us know any colors, decorations, themes, or special details you have in mind..."></textarea>
                </div>

                {/* Referral */}
                <div className="flex flex-col gap-2 mb-8">
                    <label className="font-semibold text-brand-dark/60" htmlFor="referral">How did you hear about us?</label>
                    <select disabled id="referral" name="referral" className="p-3 bg-gray-100 border border-gray-300 rounded-xl text-brand-dark/50">
                        <option value="">Select an option</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Word of Mouth">Word of Mouth</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Event or Local Market">Event or Local Market</option>
                        <option value="Other">Other / Referral</option>
                    </select>
                </div>
            </div>

            {/* Disabled Submit Button */}
            <button
                disabled
                className="w-full bg-gray-300 text-brand-dark/50 font-bold text-lg p-4 rounded-xl cursor-not-allowed opacity-60"
            >
                Bookings Currently Unavailable
            </button>
            <p className="text-center text-sm text-brand-dark/50 mt-4">* Pickup only in Kanata, ON.</p>
        </div>
    );
}