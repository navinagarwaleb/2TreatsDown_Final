import Link from "next/link";

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: string;
}

export default function ProductCard({ id, title, price, description, imageUrl }: ProductCardProps) {
    // Safely ensure only a single dollar sign is displayed
    const formattedPrice = price.startsWith("$") ? price : `$${price}`;

    return (
        <div className="group flex flex-col h-full bg-transparent">
            {/* Image Container with rounded-2xl corners matching inspiration */}
            <Link 
                href={`/shop/item/${id}`} 
                className="relative w-full aspect-square overflow-hidden rounded-2xl bg-washi block shadow-[0_4px_20px_-4px_rgba(15,22,35,0.05)] border border-sumi/5"
            >
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-text-roll"
                />
            </Link>

            {/* Product Details stacked below the image */}
            <div className="pt-5 flex flex-col flex-grow text-left">
                {/* Small tracking-widest label */}
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-clay-rose mb-2 block">
                    All-Natural Treat
                </span>

                {/* Title and Price standing out */}
                <div className="space-y-1 mb-2">
                    <Link href={`/shop/item/${id}`} className="block hover:text-clay-rose transition-colors duration-300">
                        <h3 className="font-heading text-2xl font-bold tracking-tight text-sumi leading-tight">
                            {title}
                        </h3>
                    </Link>
                    <span className="font-sans text-base font-semibold text-sumi/90 block">
                        {formattedPrice}
                    </span>
                </div>
                
                {/* Description */}
                {description && (
                    <p className="font-sans text-xs text-sumi/60 line-clamp-2 mb-4 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Minimal text details link matching layout */}
                <Link 
                    href={`/shop/item/${id}`} 
                    className="inline-flex items-center gap-1 text-clay-rose hover:text-sumi font-sans text-xs font-semibold uppercase tracking-wider transition-colors mt-auto pb-1 border-b border-clay-rose/25 hover:border-sumi self-start"
                >
                    View Details &rarr;
                </Link>
            </div>
        </div>
    );
}
