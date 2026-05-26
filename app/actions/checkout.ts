"use server";

import { headers } from "next/headers";
import { CartItem } from "@/store/useCartStore";

export async function createCheckoutSession(items: CartItem[]) {
    const token = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!token || !locationId) {
        console.error("Missing Square configuration environment variables");
        return { success: false, error: "Payment gateway is not configured properly." };
    }

    if (!items || items.length === 0) {
        return { success: false, error: "Your cart is empty." };
    }

    try {
        const headersList = await headers();
        const host = headersList.get("host");
        const protocol = host?.includes("localhost") ? "http" : "https";
        const redirectUrl = `${protocol}://${host}/shop?checkout=success`;

        // Format line items for Square Checkout API
        const lineItems = items.map((item) => {
            return {
                name: item.product.title,
                quantity: item.quantity.toString(),
                base_price_money: {
                    amount: item.product.priceCents,
                    currency: "CAD",
                },
            };
        });

        const idempotencyKey = crypto.randomUUID();

        const response = await fetch("https://connect.squareup.com/v2/online-checkout/payment-links", {
            method: "POST",
            headers: {
                "Square-Version": "2024-02-22",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idempotency_key: idempotencyKey,
                order: {
                    location_id: locationId,
                    line_items: lineItems,
                },
                checkout_options: {
                    redirect_url: redirectUrl,
                },
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Failed to create Square payment link:", errText);
            return { success: false, error: "Failed to initiate payment. Please try again." };
        }

        const json = await response.json();
        const checkoutUrl = json.payment_link?.url;

        if (!checkoutUrl) {
            return { success: false, error: "Invalid response from payment gateway." };
        }

        return { success: true, url: checkoutUrl };
    } catch (error) {
        console.error("Error creating Square checkout session:", error);
        return { success: false, error: "An unexpected error occurred while initiating checkout." };
    }
}
