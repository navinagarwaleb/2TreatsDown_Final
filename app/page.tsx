import Hero from "@/components/home/Hero";
import FeaturedItems from "@/components/home/FeaturedItems";
import Testimonials from "@/components/home/Testimonials";
import { getSquareProducts } from "@/lib/square";
import Catalogs from "@/components/home/Catalogs";
import Gallery from "@/components/home/Gallery";
export const dynamic = "force-dynamic";

export default async function Home() {
    const products = await getSquareProducts();
    const featuredListings = products.slice(0, 3);
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Hero />
                <Catalogs />
                <Gallery />
                <FeaturedItems products={featuredListings} />

                {/* Banner Section */}
                <section className="bg-brand-orange py-16 text-brand-dark overflow-hidden text-center relative">
                    <div className="container max-w-4xl mx-auto px-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Need a Custom Cake?</h2>
                        <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            From birthdays to gotcha days, we create the perfect personalized dog cake. Let us know your theme, colors, and allergies!
                        </p>
                        <a
                            href="/custom-cake"
                            className="inline-block bg-white text-brand-brown hover:bg-brand-brown hover:text-white transition-colors duration-300 font-bold px-10 py-5 rounded-full text-lg shadow-xl"
                        >
                            Request Custom Quote
                        </a>
                    </div>
                </section>

                <Testimonials />
            </main>
        </div>
    );
}
