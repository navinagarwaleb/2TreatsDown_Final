import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-brown text-brand-main w-full py-16 flex flex-col items-center">
            <div className="container px-4 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="flex flex-col space-y-4 col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl font-bold transition-colors">
                            2TreatsDown <span className="text-xl">🐾</span>
                        </span>
                    </Link>
                    <p className="text-sm opacity-90 leading-relaxed text-brand-main/80 mt-2">
                        Gourmet, healthy, and preservative-free dog treats and custom celebration cakes made with love in Kanata, ON.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-bold">Shop</h4>
                    <Link href="/shop/pupcakes" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                        Pupcakes
                    </Link>
                    <Link href="/shop/treats" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                        Natural Treats
                    </Link>
                    <Link href="/custom-cake" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                        Custom Cakes
                    </Link>
                </div>

                {/* Contact info */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-bold">Visit & Contact</h4>
                    <p className="text-sm opacity-80">
                        Pickup Only
                        <br />
                        418 Galatina Way
                        <br />
                        Kanata, ON
                    </p>
                    <a href="mailto:2treatsdown@gmail.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                        <Mail className="h-4 w-4" /> 2treatsdown@gmail.com
                    </a>
                </div>

                {/* Social */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-lg font-bold">Follow Us</h4>
                    <div className="flex gap-4">
                        <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-main/10 hover:bg-brand-orange transition-colors" aria-label="Instagram">
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-main/10 hover:bg-brand-orange transition-colors" aria-label="Facebook">
                            <Facebook className="h-5 w-5" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-brand-main/20 text-center container max-w-7xl mx-auto w-full">
                <p className="text-sm opacity-60">
                    &copy; {new Date().getFullYear()} 2TreatsDown. All rights reserved. Made for the pups.
                </p>
            </div>
        </footer>
    );
}
