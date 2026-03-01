"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, PawPrint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/about-us" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-main/80 backdrop-blur-md border-b justify-center flex border-brand-pink">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl pt-1 font-bold text-brand-dark transition-colors group-hover:text-brand-orange">
            2TreatsDown <PawPrint className="w-6 h-6 ml-1 text-brand-orange inline-block" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${pathname === link.href ? "text-brand-orange" : "text-brand-dark/80"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/custom-cake"
              className="bg-brand-orange hover:bg-brand-brown text-white transition-colors duration-300 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm"
            >
              Request Custom Cake
            </Link>
          </div>

          <button
            onClick={openCart}
            className="relative p-2 text-brand-dark hover:text-brand-orange transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6" />
            {mounted && items.length > 0 && (
              <span className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-brand-dark hover:text-brand-orange transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-0 w-full bg-brand-main border-b border-brand-pink shadow-lg"
          >
            <div className="flex flex-col px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors ${pathname === link.href ? "text-brand-orange" : "text-brand-dark/80"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-brand-pink/50">
                <Link
                  href="/custom-cake"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-block text-center bg-brand-orange hover:bg-brand-brown text-white transition-colors duration-300 px-5 py-3 rounded-full text-base font-semibold"
                >
                  Request Custom Cake
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
