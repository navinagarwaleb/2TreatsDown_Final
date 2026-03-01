export interface SquareProduct {
    id: string;
    title: string;
    price: string;
    priceCents: number;
    description: string;
    descriptionHtml: string;
    imageUrl: string;
}

export async function getSquareProducts(): Promise<SquareProduct[]> {
    const token = process.env.SQUARE_ACCESS_TOKEN;
    if (!token) {
        console.warn("Missing SQUARE_ACCESS_TOKEN environment variable");
        return [];
    }

    try {
        const response = await fetch("https://connect.squareup.com/v2/catalog/list?types=ITEM,IMAGE", {
            headers: {
                "Square-Version": "2024-02-22",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            cache: 'no-store' // Fetch fresh data on every request
        });

        if (!response.ok) {
            console.error("Failed to fetch square products", await response.text());
            return [];
        }

        const json = await response.json();
        const objects = json.objects || [];

        // Map all images by ID for quick lookup
        const images: Record<string, string> = {};
        objects
            .filter((obj: any) => obj.type === "IMAGE")
            .forEach((imgObj: any) => {
                if (imgObj.image_data && imgObj.image_data.url) {
                    images[imgObj.id] = imgObj.image_data.url;
                }
            });

        // Map products and match with images
        const items: SquareProduct[] = objects
            .filter((obj: any) => obj.type === "ITEM")
            .map((item: any) => {
                const data = item.item_data;

                // Extract Price (Cent manipulation)
                let priceString = "Contact for Price";
                let priceCents = 0;
                if (data.variations && data.variations.length > 0) {
                    const priceMoney = data.variations[0].item_variation_data?.price_money;
                    if (priceMoney && priceMoney.amount !== undefined) {
                        priceCents = priceMoney.amount;
                        priceString = `$${(priceMoney.amount / 100).toFixed(2)}`;
                    }
                }

                // Extract Image (Use fallback if square image missing)
                let imageUrl = "https://images.unsplash.com/photo-1541364983171-a8ba01e9d7ce?auto=format&fit=crop&q=80";
                if (data.image_ids && data.image_ids.length > 0) {
                    if (images[data.image_ids[0]]) {
                        imageUrl = images[data.image_ids[0]];
                    }
                }

                // Extract Description HTML or Plain Text
                const description = data.description_plaintext || data.description || "Fresh from our bakery.";
                const descriptionHtml = data.description_html || `<p>${description}</p>`;

                return {
                    id: item.id,
                    title: data.name || "Unknown Item",
                    description: description,
                    descriptionHtml: descriptionHtml,
                    price: priceString,
                    priceCents,
                    imageUrl
                };
            });

        // Add fallback hardcoded products so that links for 1, 2, 3 don't throw 404 errors during migration
        const mockProducts: SquareProduct[] = [
            {
                id: "1",
                title: "Peanut Butter & Carrot Pupcake",
                price: "$32.00",
                priceCents: 3200,
                description: "Classic pupcakes with our signature cream cheese frosting. Set of 4.",
                descriptionHtml: "<p>Classic pupcakes with our signature cream cheese frosting. Set of 4.</p>",
                imageUrl: "https://images.unsplash.com/photo-1541364983171-a8ba01e9d7ce?auto=format&fit=crop&q=80",
            },
            {
                id: "2",
                title: "Sweet Potato Chews",
                price: "$12.00",
                priceCents: 1200,
                description: "Single ingredient, limited batch sweet potato chews. Great for sensitive tummies.",
                descriptionHtml: "<p>Single ingredient, limited batch sweet potato chews. Great for sensitive tummies.</p>",
                imageUrl: "https://images.unsplash.com/photo-1579737118552-44ce1db8d4cb?auto=format&fit=crop&q=80",
            },
            {
                id: "3",
                title: "Chicken Jerky Strips",
                price: "$18.00",
                priceCents: 1800,
                description: "High-protein, 100% chicken breast dehydrated to perfection. No preservatives.",
                descriptionHtml: "<p>High-protein, 100% chicken breast dehydrated to perfection. No preservatives.</p>",
                imageUrl: "https://images.unsplash.com/photo-1623356075306-38fed53e1a0b?auto=format&fit=crop&q=80",
            }
        ];

        return [...items, ...mockProducts];
    } catch (error) {
        console.error("Error fetching from Square API:", error);
        return [];
    }
}

export async function getSquareProduct(id: string): Promise<SquareProduct | null> {
    const products = await getSquareProducts();
    return products.find(p => p.id === id) || null;
}
