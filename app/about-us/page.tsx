"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
    return (
        <div className="container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-center text-brand-dark mb-16">
                About Us – 2 Treats Down
            </h1>

            <div className="space-y-24">
                {/* Section 1 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">How It All Started</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>I’ve always loved dogs. Growing up, dogs were a part of our family, and that love only grew stronger over the years.</p>
                            <p>After moving to Canada, I began working in the pet retail industry, where I spent over 5.5 years closely working with dog treats, and during my initial 2–3 years, cat treats as well. During that time, I saw firsthand what went into many commercially available treats — long ingredient lists filled with ingredients that were hard to understand, and shelf lives that made it clear preservatives were being used.</p>
                            <p>As a dog parent, that didn’t sit right with me. The only treats I truly trusted for my own dog were natural chews, and I knew I wanted something better.</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/1.jpeg" fill alt="How it all started" className="object-cover" />
                    </div>
                </motion.section>

                {/* Section 2 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/2.jpeg" fill alt="From one birthday to a bigger dream" className="object-cover" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">From One Birthday to a Bigger Dream</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>When it came time to celebrate my dog’s first birthday, I discovered that dog-friendly cakes existed — and one bakery in Toronto, in particular, inspired me. That moment planted a seed.</p>
                            <p>After we moved to Ottawa, that idea stayed with me. I started experimenting in our kitchen, creating treats just for my pup. And here’s the funny part — I had zero baking experience. As a young adult, I once tried baking cakes for humans and failed miserably. My sister still reminds me of it and even told me never to bake for people.</p>
                            <p>But dogs? That felt different.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 3 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">Six Months of Trial, Error & Honest Feedback</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>I began testing recipes on Piper and then slowly shared them with our trainer’s and sitters’ dogs to get genuine, unbiased feedback. It was a solid six-month trial-and-error journey — tweaking recipes, adjusting textures, refining flavours, and ensuring everything was safe and enjoyable for dogs.</p>
                            <p>In November 2022, we launched our products at our very first farmers’ market in Richmond, Ottawa — and we sold out.</p>
                            <p>That was the moment I knew — we could do this.</p>
                            <p>I personally asked every customer for feedback, and everything I heard was positive. That encouragement gave me the confidence to keep going.</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/3.jpeg" fill alt="Trial, Error and Honest Feedback" className="object-cover" />
                    </div>
                </motion.section>

                {/* Section 4 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/4.jpeg" fill alt="What Makes Us Different" className="object-cover" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">What Makes Us Different</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>At 2 Treats Down, everything is:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Made in small batches</li>
                                <li>Prepared using human-grade ingredients</li>
                                <li>Thoughtfully crafted as human-style treats, made just for dogs</li>
                            </ul>
                            <p>We source local and high-quality ingredients whenever possible and believe deeply in knowing — and understanding — exactly what goes into your dog’s treats.</p>
                            <p>There are so many ingredient lists out there filled with things we can’t pronounce or don’t understand. That’s something I want to stay far away from. Our recipes are clean, simple, and intentional.</p>
                            <p>We also offer custom cakes that can be tweaked to suit a dog’s dietary needs or allergy restrictions, because every pup deserves to be celebrated safely.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 5 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="order-2 md:order-1 space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">A Bakery Built on Love & Community</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>I want our small bakery to feel like a home — a place where pups are celebrated like family.</p>
                            <p>When I started, I didn’t know how to do any of this. But slowly and steadily, we’ve built a community that loves and supports our small bakery, and that truly means the world to me.</p>
                            <p>After almost three years, I know I’m exactly where I’m meant to be — doing what I love most: showing love to dogs.</p>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/5.png" fill alt="Community love" className="object-cover" />
                    </div>
                </motion.section>

                {/* Section 6 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-brand-pink/50">
                        <Image src="/images/about/6.jpeg" fill alt="Meet the faces" className="object-cover object-top" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-heading font-bold text-brand-orange">Meet the Faces Behind 2 Treats Down</h2>
                        <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                            <p>Hi! I’m Akshata Angre — the founder of 2 Treats Down. I’m a lifelong dog lover, recipe experimenter, and self-taught treat baker who turned a kitchen passion into a growing business. Some days you’ll find me adjusting recipes, packing orders, or chatting with pup parents at markets — and I wouldn’t trade a moment of it.</p>
                            <p>Piper is our beloved English Springer Spaniel and our official Quality Control Manager. His job? Taste testing every new creation with enthusiasm (and a wagging tail). He’s the reason many recipes got tweaked, perfected, or totally reimagined.</p>
                            <p>Together, our little team is fueled by curiosity, care, and a genuine love for dogs — and we’re here to make treats that both pups and their parents feel good about.</p>
                        </div>
                    </div>
                </motion.section>

                {/* Section 7 - Final */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-12 border-t border-brand-pink text-center space-y-6 max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl font-heading font-bold text-brand-orange pb-2">A Milestone I’ll Never Forget</h2>
                    <div className="text-brand-dark/80 space-y-4 leading-relaxed text-lg">
                        <p>Last year, we were honoured to receive the Platinum Award in the Pet Food category at Ottawa Community Votes. It was a huge moment and validation for all the hard work poured into this bakery.</p>
                        <p>I also made the big decision to leave my 9-5 job in December 2024, making 2025 my real test year. It surprised me in the best way.</p>
                        <p>Long days, sleepless nights, a full market season at Carp Farmers’ Market, and part-time weekends at Stittsville Barn— meeting new people, their pups, and hearing their stories has been the highlight of it all.</p>

                        <div className="pt-8">
                            <p className="font-heading text-2xl font-bold bg-brand-pink/60 inline-block px-8 py-4 rounded-full text-brand-brown">
                                This is me.<br />
                                This is 2 Treats Down.<br />
                                And I wouldn’t trade it for anything.
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
