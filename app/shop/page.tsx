import { getSquareProducts } from "@/lib/square";
import ProductGrid from "@/components/shop/ProductGrid";

export const dynamic = "force-dynamic";

export default async function Shop() {
    // Fetch live inventory from Square API
    const treats = await getSquareProducts();

    return (
        <div className="container mx-auto px-4 max-w-7xl py-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6 text-center">Shop</h1>
            <p className="text-center text-lg text-brand-dark/70 max-w-2xl mx-auto mb-16">
                Healthy, natural, everyday treats for your dog. All our treats are preservative-free and perfectly crafted.
            </p>

            <ProductGrid items={treats} />
        </div>
    );
}
