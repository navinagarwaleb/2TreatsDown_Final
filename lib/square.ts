export interface SquareProduct {
    id: string;
    title: string;
    price: string;
    priceCents: number;
    description: string;
    descriptionHtml: string;
    imageUrl: string;
    imageUrls: string[];
}

export async function getSquareProducts(): Promise<SquareProduct[]> {
    const token = process.env.SQUARE_ACCESS_TOKEN;
    if (!token) {
        console.warn("Missing SQUARE_ACCESS_TOKEN environment variable");
        return [];
    }

    try {
        // Step 1: Fetch categories to find the "Website" category ID
        const catResponse = await fetch("https://connect.squareup.com/v2/catalog/list?types=CATEGORY", {
            headers: {
                "Square-Version": "2024-02-22",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            cache: 'no-store'
        });

        if (!catResponse.ok) {
            console.error("Failed to fetch square categories", await catResponse.text());
            return [];
        }

        const catJson: any = await catResponse.json();
        const categories = catJson.objects || [];
        const websiteCategory = categories.find((obj: any) => obj.category_data?.name?.toLowerCase() === "website");
        const websiteCategoryId = websiteCategory?.id;

        let objects: any[] = [];

        // Step 2: Fetch items (Using highly-efficient Search API if Website category exists)
        if (websiteCategoryId) {
            const searchResponse = await fetch("https://connect.squareup.com/v2/catalog/search", {
                method: "POST",
                headers: {
                    "Square-Version": "2024-02-22",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    object_types: ["ITEM"],
                    include_related_objects: true,
                    query: {
                        exact_query: {
                            attribute_name: "category_id",
                            attribute_value: websiteCategoryId
                        }
                    }
                }),
                cache: 'no-store'
            });

            if (!searchResponse.ok) {
                console.error("Failed to fetch square items via search", await searchResponse.text());
                return [];
            }
            const searchJson: any = await searchResponse.json();

            // Search API separates items and images into 'objects' and 'related_objects'
            if (searchJson.objects) objects = objects.concat(searchJson.objects);
            if (searchJson.related_objects) objects = objects.concat(searchJson.related_objects);
        } else {
            // Fallback: If no Website category was found, download the entire catalog with pagination manually
            let cursor: string | undefined = undefined;
            do {
                const fetchUrl: string = cursor
                    ? `https://connect.squareup.com/v2/catalog/list?types=ITEM,IMAGE&cursor=${encodeURIComponent(cursor)}`
                    : "https://connect.squareup.com/v2/catalog/list?types=ITEM,IMAGE";

                const reqResponse = await fetch(fetchUrl, {
                    headers: {
                        "Square-Version": "2024-02-22",
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    cache: 'no-store'
                });

                if (!reqResponse.ok) break;

                const reqJson: any = await reqResponse.json();
                if (reqJson.objects) objects = objects.concat(reqJson.objects);
                cursor = reqJson.cursor;
            } while (cursor);
        }

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
            .filter((item: any) => {
                const data = item.item_data;

                // Strip out deleted or archived items immediately
                if (item.is_deleted || data.is_archived) return false;

                // Do not show items explicitly marked as unavailable online
                if (data.ecom_visibility === "UNAVAILABLE" || data.ecom_visibility === "HIDDEN") return false;

                // If fetched via strict Search API, they are in the folder, so just confirm they are alive and visible
                if (websiteCategoryId) return true;

                // Fallback: If no folder, blindly trust Ecom visibility "VISIBLE"
                return data.ecom_visibility === "VISIBLE";
            })
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

                // Extract Images (Use fallback if square image missing)
                let imageUrl = "https://images.unsplash.com/photo-1541364983171-a8ba01e9d7ce?auto=format&fit=crop&q=80";
                let imageUrls: string[] = [];

                if (data.image_ids && data.image_ids.length > 0) {
                    if (images[data.image_ids[0]]) {
                        imageUrl = images[data.image_ids[0]];
                    }
                    imageUrls = data.image_ids.map((id: string) => images[id]).filter(Boolean);
                }

                if (imageUrls.length === 0) {
                    imageUrls = [imageUrl];
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
                    imageUrl,
                    imageUrls
                };
            });

        return items;
    } catch (error) {
        console.error("Error fetching from Square API:", error);
        return [];
    }
}

export async function getSquareProduct(id: string): Promise<SquareProduct | null> {
    const products = await getSquareProducts();
    return products.find(p => p.id === id) || null;
}
