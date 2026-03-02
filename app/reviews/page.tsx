import { Metadata } from 'next';
import { reviews } from '@/lib/data/reviews';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Customer Reviews - 2TreatsDown',
    description: 'See what our amazing customers have to say about our handmade treats and custom cakes.',
};

export default function ReviewsPage() {
    return (
        <main className="min-h-screen bg-brand-light pb-24">
            {/* Header Section */}
            <section className="bg-brand-main py-20 border-b border-brand-pink relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-dark mb-6 tracking-tight">
                        Happy Tails & <span className="text-brand-orange">Happy Tales</span>
                    </h1>
                    <p className="text-lg md:text-xl text-brand-dark/80 max-w-2xl mx-auto leading-relaxed">
                        Read the wonderful experiences from our community of dog lovers. We put love into every treat and cake we bake!
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-brown/10 rounded-full blur-2xl"></div>
            </section>

            {/* Reviews Grid Section */}
            <section className="container mx-auto px-4 max-w-7xl -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl p-8 shadow-sm border border-brand-pink/30 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                                ))}
                            </div>

                            <p className="text-brand-dark/80 text-base leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                                "{review.text}"
                            </p>

                            {review.imageUrl && (
                                <div className="mb-6 rounded-2xl overflow-hidden bg-brand-main/50 relative aspect-[4/3]">
                                    {/* Using standard img to avoid next.config.js domain issues with external urls */}
                                    <img
                                        src={review.imageUrl}
                                        alt={`Review from ${review.name}`}
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                                    />
                                </div>
                            )}

                            <div className="mt-auto pt-6 border-t border-brand-pink/30 flex flex-col">
                                <span className="font-bold text-brand-dark text-lg">{review.name}</span>
                                <span className="text-sm text-brand-dark/50 mt-1">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
