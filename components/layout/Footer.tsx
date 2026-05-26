"use client";

import Link from "next/link";
import { Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
    const handleHomeClick = (e: React.MouseEvent) => {
        if (window.location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-brand-pink text-washi w-full py-20 px-6 md:px-12 lg:px-20 xl:px-28 border-t border-sumi/10">
            <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
                {/* Brand / Logo Section */}
                <div className="flex flex-col space-y-6">
                    <Link href="/" onClick={handleHomeClick} className="inline-block">
                        <span className="font-heading text-4xl md:text-5xl font-bold tracking-wide text-washi hover:text-sumi transition-colors duration-300">
                            2 Treats Down.
                        </span>
                    </Link>
                    <p className="font-sans text-sm md:text-base leading-relaxed text-washi/80">
                        Indulgence, redefined as a curated, luxurious experience. Gourmet, healthy, and preservative-free dog treats and custom celebration cakes made with love in Kanata, ON.
                    </p>
                    
                    {/* Prominent Social Links with Icons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        <a 
                            href="https://www.instagram.com/2treatsdown/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex items-center gap-2 bg-washi/10 hover:bg-sumi/15 border border-washi/20 hover:border-washi/40 px-4 py-2.5 rounded-full transition-all duration-300 text-xs font-semibold tracking-wider text-washi hover:text-sumi"
                        >
                            <Instagram className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Instagram
                        </a>
                        <a 
                            href="https://www.facebook.com/people/2-Treats-Down/100083028921987/?sk=about" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex items-center gap-2 bg-washi/10 hover:bg-sumi/15 border border-washi/20 hover:border-washi/40 px-4 py-2.5 rounded-full transition-all duration-300 text-xs font-semibold tracking-wider text-washi hover:text-sumi"
                        >
                            <Facebook className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Facebook
                        </a>
                    </div>
                </div>

                {/* Navigation Links (Matching Inspiration Font Sizes) */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-sans text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-washi/60 font-semibold mb-2">Explore</h4>
                    <nav className="flex flex-col space-y-3">
                        <Link href="/" onClick={handleHomeClick} className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            Home
                        </Link>
                        <Link href="/shop" className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            Shop
                        </Link>
                        <Link href="/reviews" className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            Reviews
                        </Link>
                        <Link href="/about-us" className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            About Us
                        </Link>
                        <Link href="/faq" className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            FAQ
                        </Link>
                        <Link href="/custom-cake" className="font-heading text-[20px] md:text-[22px] tracking-[0.01em] text-washi/80 hover:text-sumi transition-colors duration-300">
                            Custom Cake
                        </Link>
                    </nav>
                </div>

                {/* Visit & Contact */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-sans text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-washi/60 font-semibold mb-2">Contact & Hours</h4>
                    <p className="font-heading text-[19px] md:text-[21px] leading-[1.4] text-washi/85">
                        Pickup Only
                        <br />
                        418 Galatina Way
                        <br />
                        Kanata, ON
                    </p>
                    <a 
                        href="mailto:2treatsdown@gmail.com" 
                        className="font-sans text-xs md:text-sm font-semibold hover:text-sumi transition-colors duration-300 inline-flex items-center gap-2 mt-2 self-start"
                    >
                        <Mail className="h-4 w-4" /> 2treatsdown@gmail.com
                    </a>
                </div>

                {/* Newsletter Form */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-sans text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-washi/60 font-semibold mb-2">Newsletter</h4>
                    <h3 className="font-heading text-[24px] md:text-[28px] leading-[1.2] text-washi font-normal">
                        Quiet dispatches, monthly.
                    </h3>
                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 pt-2">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL"
                            className="bg-surface/10 border border-washi/30 rounded-lg px-4 py-3 text-washi placeholder-washi/40 text-xs tracking-wider focus:outline-none focus:border-washi transition-colors"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-washi hover:bg-sumi text-sumi hover:text-washi transition-colors duration-500 font-sans text-xs font-semibold py-3 px-5 rounded-lg tracking-[0.12em] uppercase cursor-pointer"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Copyright / Metadata base */}
            <div className="mt-20 pt-8 border-t border-washi/10 flex flex-col md:flex-row items-center justify-between gap-4 container max-w-7xl mx-auto w-full text-xs md:text-sm text-washi/50 font-sans tracking-wider">
                <p>&copy; {new Date().getFullYear()} 2 Treats Down. All rights reserved.</p>
                <p>Est. 2022 / Made with care</p>
            </div>
        </footer>
    );
}
