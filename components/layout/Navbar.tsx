"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Gallery", href: "/gallery" },
    { name: "Reviews", href: "/reviews" },
    { name: "About Us", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { items, openCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            const isHomePage = window.location.pathname === "/";
            // On homepage, wait until near the end of the 100vh hero section before turning dark
            const threshold = isHomePage ? window.innerHeight - 100 : 50;
            if (window.scrollY > threshold) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        // Trigger once to set initial state
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll); // Handle window resize dynamically

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleHomeClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            setIsOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const totalItems = mounted ? items.reduce((total, item) => total + item.quantity, 0) : 0;

    return (
        <>
            {/* Main Floating Navbar Header */}
            <header 
                className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-500 py-6 md:py-8 lg:py-10 px-6 md:px-12 lg:px-20 xl:px-28 flex items-center justify-between pointer-events-none`}
            >
                {/* Logo Section (Top Left) */}
                <div className="pointer-events-auto">
                    <Link href="/" onClick={handleLogoClick} className="block group">
                        <div className="relative w-[200px] h-[55px] md:w-[440px] md:h-[120px] transition-transform duration-500 ease-text-roll group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="2TreatsDown Logo"
                                fill
                                sizes="440px"
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Control Actions (Top Right - Cart + Hamburger Trigger) */}
                <div className="flex items-center gap-6 md:gap-8 pointer-events-auto">
                    {/* Cart Trigger */}
                    <button
                        onClick={openCart}
                        className={`relative p-2 transition-colors duration-300 ${
                            isOpen 
                                ? "text-sumi hover:text-clay-rose" 
                                : (scrolled || pathname !== "/") 
                                    ? "text-sumi hover:text-clay-rose" 
                                    : "text-surface hover:text-brand-pink"
                        }`}
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-6 w-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-clay-rose text-washi text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Morphing Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`relative w-[28px] h-[22px] flex flex-col justify-between cursor-pointer focus:outline-none ${
                            isOpen 
                                ? "text-sumi" 
                                : (scrolled || pathname !== "/") 
                                    ? "text-sumi" 
                                    : "text-surface"
                        }`}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <motion.span
                            animate={{
                                top: isOpen ? "10px" : "2px",
                                rotate: isOpen ? 45 : 0,
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-0 w-full h-[2px] bg-current origin-center"
                            style={{ top: "2px" }}
                        />
                        <motion.span
                            animate={{
                                opacity: isOpen ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-[10px] w-full h-[2px] bg-current"
                        />
                        <motion.span
                            animate={{
                                top: isOpen ? "10px" : "18px",
                                rotate: isOpen ? -45 : 0,
                            }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-0 w-full h-[2px] bg-current origin-center"
                            style={{ top: "18px" }}
                        />
                    </button>
                </div>
            </header>

            {/* Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop dim overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="fixed inset-0 z-[88] bg-sumi pointer-events-none"
                        />

                        {/* Sliding Menu Panel */}
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed inset-0 z-[90] bg-surface overflow-y-auto"
                        >
                            <div className="relative flex flex-col h-full px-6 md:px-12 lg:px-20 xl:px-28 pt-28 pb-10">

                                {/* Nav links — centered in remaining space */}
                                <nav className="flex-1 flex items-center justify-center text-center">
                                    <ul className="flex flex-col items-center">
                                        {navLinks.map((link, index) => (
                                            <motion.li
                                                key={link.name}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 0 }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    ease: [0.16, 1, 0.3, 1], 
                                                    delay: isOpen ? 0.5 + 0.06 * index : 0
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={link.href === "/" ? handleHomeClick : undefined}
                                                    className={`group relative inline-block font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-[0.005em] transition-colors duration-300 ${
                                                        pathname === link.href ? "text-sumi" : "text-sumi/45 hover:text-sumi"
                                                    }`}
                                                >
                                                    <span className="relative inline-block overflow-hidden pb-[0.12em]">
                                                        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[110%]">
                                                            {link.name}
                                                        </span>
                                                        <span aria-hidden="true" className="absolute inset-0 translate-y-[110%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                                                            {link.name}
                                                        </span>
                                                    </span>
                                                    {pathname === link.href && (
                                                        <motion.span 
                                                            layoutId="activeDot"
                                                            className="absolute -right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-clay-rose"
                                                        />
                                                    )}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>

                                {/* Bottom section — pinned to bottom of panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: isOpen ? 0.5 + 0.06 * navLinks.length + 0.08 : 0 }}
                                >
                                    <div aria-hidden="true" className="h-px w-10 mx-auto bg-sumi/15 mb-8" />
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
                                        <div className="space-y-4 flex flex-col items-center md:items-start">
                                            <span className="block font-sans text-xs tracking-[0.2em] uppercase text-sumi/40 font-medium">
                                                Custom Celebrations
                                            </span>
                                            <Link
                                                href="/custom-cake"
                                                className="group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase text-sumi border border-sumi/25 px-6 py-3 transition-[color,border-color] duration-500 ease-text-roll hover:text-washi hover:border-sumi"
                                            >
                                                <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                                                    <span className="absolute inset-y-0 -inset-x-px bg-sumi origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100" />
                                                </span>
                                                <span className="relative inline-flex overflow-hidden">
                                                    <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[140%]">
                                                        Request Custom Cake
                                                    </span>
                                                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                                                        Request Custom Cake
                                                    </span>
                                                </span>
                                            </Link>
                                        </div>

                                        <div className="text-center md:text-right">
                                            <p className="font-heading italic text-lg text-sumi/60">
                                                Quiet indulgence, deliberately crafted.
                                            </p>
                                            <span className="block font-sans text-[10px] tracking-[0.16em] uppercase text-sumi/45 mt-2">
                                                Est. 2022 / Kanata, ON
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
