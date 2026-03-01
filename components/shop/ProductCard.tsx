import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    description: string;
    imageUrl: string;
}

export default function ProductCard({ id, title, price, description, imageUrl }: ProductCardProps) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-pink/50 group flex flex-col h-full">
            <Link href={`/shop/item/${id}`} className="relative w-full aspect-square overflow-hidden bg-brand-pink/20 block">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <Link href={`/shop/item/${id}`} className="hover:text-brand-orange transition-colors">
                        <h3 className="font-heading text-xl font-bold text-brand-dark">{title}</h3>
                    </Link>
                    <span className="font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full text-sm shrink-0">
                        {price}
                    </span>
                </div>
                <p className="text-brand-dark/70 text-sm flex-grow mb-6">{description}</p>
                <Link href={`/shop/item/${id}`} className="w-full text-center block bg-brand-main text-brand-brown hover:bg-brand-orange hover:text-white border border-brand-brown/20 transition-colors py-3 rounded-xl font-semibold mt-auto">
                    View Details
                </Link>
            </div>
        </div>
    );
}
