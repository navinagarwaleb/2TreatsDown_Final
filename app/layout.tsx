import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import EntranceLoader from "@/components/layout/EntranceLoader";
import TemporaryClosurePopup from "@/components/layout/TemporaryClosurePopup";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-heading",
});

const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "2TreatsDown | Gourmet Dog Treats & Custom Cakes",
    description: "Local Kanata dog bakery specializing in gourmet, healthy, preservative-free dog treats and fully personalized custom dog birthday cakes.",
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon.ico", sizes: "any" }
        ],
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @font-face {
                        font-family: 'Switzer';
                        src: url('https://demo-sophia-pro.wpcustomthemes.com/wp-content/uploads/fonts/Switzer-Variable.woff2') format('woff2');
                        font-weight: 100 900;
                        font-display: swap;
                        font-style: normal;
                    }
                    :root {
                        --font-sans: 'Switzer', var(--font-sans), sans-serif;
                    }
                `}} />
            </head>
            <body
                className={`${sans.variable} ${cormorant.variable} font-sans min-h-screen flex flex-col bg-surface text-sumi antialiased transition-colors overflow-x-hidden`}
            >
                <EntranceLoader />
                <TemporaryClosurePopup />
                <Navbar />
                <CartDrawer />
                <main className="flex-grow flex flex-col">{children}</main>
                <Footer />
            </body>
        </html>
    );
}

