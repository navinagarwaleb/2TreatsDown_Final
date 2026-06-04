"use server";

import { headers } from "next/headers";
import { CartItem } from "@/store/useCartStore";

function convertToRFC3339(pickupDateTimeStr: string): string {
    try {
        // Expected format: "YYYY-MM-DD at HH:MM AM/PM" (e.g., "2026-05-28 at 2:30 PM")
        const parts = pickupDateTimeStr.split(" at ");
        if (parts.length !== 2) return new Date().toISOString();
        
        const datePart = parts[0]; // "2026-05-28"
        const timePart = parts[1]; // "2:30 PM"
        
        const [time, modifier] = timePart.split(" ");
        const [hoursStr, minutesStr] = time.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        
        if (modifier === "PM" && hours < 12) {
            hours += 12;
        }
        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }
        
        const [year, month, day] = datePart.split("-").map(Number);
        const dateObj = new Date(year, month - 1, day, hours, minutes);
        
        // Return RFC3339 string with local timezone offset
        const tzo = -dateObj.getTimezoneOffset();
        const dif = tzo >= 0 ? "+" : "-";
        const pad = (num: number) => String(num).padStart(2, "0");
        
        return dateObj.getFullYear() +
            "-" + pad(dateObj.getMonth() + 1) +
            "-" + pad(dateObj.getDate()) +
            "T" + pad(dateObj.getHours()) +
            ":" + pad(dateObj.getMinutes()) +
            ":" + pad(dateObj.getSeconds()) +
            dif + pad(Math.floor(Math.abs(tzo) / 60)) +
            ":" + pad(Math.abs(tzo) % 60);
    } catch (err) {
        console.error("Error formatting pickupDateTime to RFC3339:", err);
        const fallbackDate = new Date();
        fallbackDate.setDate(fallbackDate.getDate() + 3);
        return fallbackDate.toISOString();
    }
}

export async function createCheckoutSession(items: CartItem[], pickupDateTime: string) {
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
            const itemName = item.variationName
                ? `${item.product.title} (${item.variationName})`
                : item.product.title;
            const itemPrice = item.variationId && item.product.variations
                ? (item.product.variations.find(v => v.id === item.variationId)?.priceCents ?? item.product.priceCents)
                : item.product.priceCents;
            return {
                name: itemName,
                quantity: item.quantity.toString(),
                base_price_money: {
                    amount: itemPrice,
                    currency: "CAD",
                },
            };
        });

        const rfc3339PickupAt = convertToRFC3339(pickupDateTime);
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
                    metadata: {
                        pickup_date_time: pickupDateTime
                    },
                    fulfillments: [
                        {
                            type: "PICKUP",
                            state: "PROPOSED",
                            pickup_details: {
                                schedule_type: "SCHEDULED",
                                pickup_at: rfc3339PickupAt,
                                note: `Pickup Coordinated: ${pickupDateTime}. Location: Kanata Bakery.`
                            }
                        }
                    ]
                },
                checkout_options: {
                    redirect_url: redirectUrl,
                    note_to_buyer: `Coordinated Pickup Date & Time: ${pickupDateTime}. Location: Kanata Bakery.`
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

export async function sendOrderNotificationEmail(orderId: string, transactionId: string) {
    const token = process.env.SQUARE_ACCESS_TOKEN;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!token) {
        console.error("Missing SQUARE_ACCESS_TOKEN for order email notification");
        return { success: false, error: "Missing Square token" };
    }

    try {
        let orderDetails: any = null;
        let paymentDetails: any = null;

        // Fetch Order Details from Square
        if (orderId) {
            try {
                const ordResponse = await fetch(`https://connect.squareup.com/v2/orders/${orderId}`, {
                    headers: {
                        "Square-Version": "2024-02-22",
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (ordResponse.ok) {
                    const json = await ordResponse.json();
                    orderDetails = json.order;
                } else {
                    console.error("Failed to retrieve Square order details:", await ordResponse.text());
                }
            } catch (err) {
                console.error("Error connecting to Square Orders API:", err);
            }
        }

        // Fetch Payment Details from Square (for buyer email/billing name)
        if (transactionId) {
            try {
                const payResponse = await fetch(`https://connect.squareup.com/v2/payments/${transactionId}`, {
                    headers: {
                        "Square-Version": "2024-02-22",
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (payResponse.ok) {
                    const json = await payResponse.json();
                    paymentDetails = json.payment;
                } else {
                    console.error("Failed to retrieve Square payment details:", await payResponse.text());
                }
            } catch (err) {
                console.error("Error connecting to Square Payments API:", err);
            }
        }

        // Extract Buyer/Order details
        let customerName = "Unknown Customer";
        if (paymentDetails?.billing_address) {
            const addr = paymentDetails.billing_address;
            customerName = `${addr.given_name || ""} ${addr.family_name || ""}`.trim() || "Unknown Customer";
        } else if (paymentDetails?.card_details?.cardholder_name) {
            customerName = paymentDetails.card_details.cardholder_name;
        }

        const customerEmail = paymentDetails?.buyer_email_address || "Not provided";
        const pickupDateTime = orderDetails?.metadata?.pickup_date_time || "Not specified";
        const items = orderDetails?.line_items || [];
        
        const totalAmount = orderDetails?.total_money?.amount 
            ? `$${(orderDetails.total_money.amount / 100).toFixed(2)}` 
            : (paymentDetails?.amount_money?.amount 
                ? `$${(paymentDetails.amount_money.amount / 100).toFixed(2)}` 
                : "Unknown");

        // Format HTML body
        const htmlBodyContent = `
            <div style="font-family: sans-serif; max-width: 600px; color: #0F1623; line-height: 1.6; background-color: #F6F5F2; padding: 20px; border-radius: 16px;">
                <div style="background-color: white; border: 1px solid #D5A5A5; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                    <h2 style="font-size: 24px; color: #8A5858; border-bottom: 2px solid #D5A5A5; padding-bottom: 10px; margin-top: 0;">
                        New Shop Order Placed 🐾🎉
                    </h2>
                    
                    <div style="margin-top: 20px; margin-bottom: 20px; padding: 15px; background-color: #8A5858; color: white; border-radius: 8px; font-weight: bold; text-align: center;">
                        Coordinated Pickup: ${pickupDateTime}
                    </div>

                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #E5E7EB;">Customer Name:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;">${customerName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #E5E7EB;">Customer Email:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB;"><a href="mailto:${customerEmail}" style="color: #8A5858;">${customerEmail}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #E5E7EB;">Order ID:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-family: monospace; font-size: 12px;">${orderId || "N/A"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #E5E7EB;">Transaction ID:</td>
                            <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-family: monospace; font-size: 12px;">${transactionId || "N/A"}</td>
                        </tr>
                    </table>

                    <h3 style="margin-top: 30px; font-size: 18px; color: #8A5858; border-bottom: 1px solid #D5A5A5; padding-bottom: 5px;">
                        Items Ordered
                    </h3>
                    
                    ${items.length === 0 ? `
                        <p style="font-style: italic; color: #6B7280; font-size: 14px;">Order details could not be retrieved from Square API. Please check your merchant dashboard for Order ID: ${orderId}.</p>
                    ` : `
                        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                            <thead>
                                <tr style="border-bottom: 2px solid #E5E7EB; text-align: left; font-size: 13px; color: #6B7280;">
                                    <th style="padding: 8px 0;">Item Name</th>
                                    <th style="padding: 8px 0; text-align: center; width: 80px;">Qty</th>
                                    <th style="padding: 8px 0; text-align: right; width: 100px;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map((item: any) => `
                                    <tr style="border-bottom: 1px solid #E5E7EB; font-size: 14px;">
                                        <td style="padding: 10px 0; font-weight: bold;">${item.name}</td>
                                        <td style="padding: 10px 0; text-align: center;">${item.quantity}</td>
                                        <td style="padding: 10px 0; text-align: right;">
                                            $${((item.base_price_money?.amount || 0) * parseInt(item.quantity) / 100).toFixed(2)}
                                        </td>
                                    </tr>
                                `).join("")}
                            </tbody>
                            <tfoot>
                                <tr style="font-size: 16px; font-weight: bold;">
                                    <td colspan="2" style="padding: 15px 0 0 0; text-align: right;">Total Paid:</td>
                                    <td style="padding: 15px 0 0 0; text-align: right; color: #8A5858; font-size: 18px;">${totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                    `}
                    
                    <div style="margin-top: 40px; padding: 15px; border-top: 1px dashed #D5A5A5; text-align: center; font-size: 12px; color: #6B7280;">
                        This is an automated order notification from your 2TreatsDown online shop.
                    </div>
                </div>
            </div>
        `;

        if (!resendApiKey) {
            console.warn("RESEND_API_KEY is missing. Order logged to console:");
            console.log({
                orderId,
                transactionId,
                customerName,
                customerEmail,
                pickupDateTime,
                items,
                totalAmount
            });
            return { success: true, mocked: true };
        }

        // Send Email via Resend
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Shop Order <onboarding@resend.dev>",
                to: "2treatsdown@gmail.com",
                subject: `🐾 New Shop Order Placed by ${customerName}`,
                html: htmlBodyContent,
            }),
        });

        if (!response.ok) {
            console.error("Failed to send order notification email via Resend:", await response.text());
            return { success: false, error: "Failed to send email" };
        }

        return { success: true };
    } catch (err) {
        console.error("Error in sendOrderNotificationEmail:", err);
        return { success: false, error: "Unexpected error" };
    }
}
