import { getSquareProduct } from "@/lib/square";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = await getSquareProduct(resolvedParams.id);

    if (!product) {
        return notFound();
    }

    return (
        <div className="container mx-auto px-4 max-w-7xl py-12 md:py-24 animate-in fade-in duration-500">
            <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-brand-dark/60 hover:text-brand-orange transition-colors mb-8 font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back to shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-brand-pink border border-brand-pink shadow-lg">
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4 leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-3xl font-bold font-sans text-brand-orange">
                            {product.price}
                        </p>
                    </div>

                    <div className="prose prose-lg text-brand-dark/80 bg-white p-8 rounded-3xl shadow-sm border border-brand-pink/50">
                        <h3 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <span className="text-brand-orange">🐾</span> Product Details
                        </h3>

                        {product.descriptionHtml ? (
                            <div
                                className="leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2 [&>strong]:font-bold"
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                        ) : (
                            <p className="italic opacity-80">Fresh out the oven and completely delicious. Perfect for rewarding your best friend!</p>
                        )}

                        {/* We removed the hardcoded list because your Square description now handles it fully! */}
                    </div>

                    <div className="pt-4 border-t border-brand-pink">
                        <AddToCartButton product={product} />
                        <p className="text-center text-sm text-brand-dark/50 mt-4">
                            Local Kanata Pickup Only &bull; Allow 48 hours for fresh baking
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
