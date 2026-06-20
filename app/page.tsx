import Hero from "@/components/home/Hero";
import FeaturedItems from "@/components/home/FeaturedItems";
import Testimonials from "@/components/home/Testimonials";
import { getSquareProducts } from "@/lib/square";
import Intro from "@/components/home/Intro";
import Catalogs from "@/components/home/Catalogs";
import Gallery from "@/components/home/Gallery";
import { CharacterReveal } from "@/components/ui/ScrollReveal";
import PetOfTheMonth from "@/components/home/PetOfTheMonth";
import AdoptionSpotlight from "@/components/home/AdoptionSpotlight";

export const dynamic = "force-dynamic";

export default async function Home() {
    const products = await getSquareProducts();
    const featuredListings = products.slice(0, 3);
    
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Hero />
                
                {/* Parallax rising page content wrapper */}
                <div 
                    id="main-content-start" 
                    className="relative z-10 bg-surface shadow-[0_-25px_60px_rgba(15,22,37,0.06)] border-t border-sumi/5"
                >
                    <Intro />
                    <Catalogs />
                    <Gallery />
                    <FeaturedItems products={featuredListings} />

                    {/* Elegant Editorial Custom Cake Section matching Inspiration style */}
                    <section className="bg-surface py-28 md:py-36 text-sumi text-center relative border-t border-b border-sumi/10">
                        <div className="container max-w-5xl mx-auto px-6 relative z-10 space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-6xl font-heading font-bold text-sumi tracking-tight leading-[1.05]">
                                    Need a Custom Cake?
                                </h2>
                            </div>
                            
                            <CharacterReveal 
                                text="From birthdays to gotcha days, we create the perfect personalized dog cake. Let us know your theme, colors, and allergy guidelines!"
                                className="font-heading text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.3] tracking-tight text-sumi max-w-4xl mx-auto"
                            />
                            
                            <div className="pt-6">
                                <a
                                    href="/custom-cake"
                                    className="group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase text-sumi border border-sumi/25 px-10 py-5 transition-[color,border-color] duration-500 ease-text-roll hover:text-washi hover:border-sumi rounded-[4px]"
                                >
                                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                                        <span className="absolute inset-y-0 -inset-x-px bg-sumi origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100" />
                                    </span>
                                    <span className="relative inline-flex overflow-hidden">
                                        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[140%]">
                                            Request Custom Quote
                                        </span>
                                        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                                            Request Custom Quote
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <PetOfTheMonth />
                    <AdoptionSpotlight />

                    <Testimonials />
                </div>
            </main>
        </div>
    );
}


