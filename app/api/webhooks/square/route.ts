import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Helper to verify Square Webhook Signature
function verifySquareSignature(
    rawBody: string,
    signatureHeader: string,
    signatureKey: string,
    notificationUrl: string
): boolean {
    if (!signatureHeader || !signatureKey) return false;
    
    try {
        const hmac = crypto.createHmac("sha256", signatureKey);
        hmac.update(notificationUrl + rawBody);
        const calculatedSignature = hmac.digest("base64");
        return calculatedSignature === signatureHeader;
    } catch (err) {
        console.error("Error verifying Square signature:", err);
        return false;
    }
}

// Helper to find customer email and name across fulfillments and payments
async function getCustomerEmailAndName(order: any, token: string) {
    let email = "";
    let name = "";

    // 1. Try to check fulfillment recipient
    const fulfillment = order.fulfillments?.[0];
    if (fulfillment?.pickup_details?.recipient) {
        const r = fulfillment.pickup_details.recipient;
        if (r.email_address) email = r.email_address;
        if (r.display_name) name = r.display_name;
    }

    // 2. If email/name not found, search payments for this order
    if (!email || !name) {
        try {
            const payResponse = await fetch(`https://connect.squareup.com/v2/payments?order_id=${order.id}`, {
                headers: {
                    "Square-Version": "2024-02-22",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (payResponse.ok) {
                const json = await payResponse.json();
                const payment = json.payments?.[0];
                if (payment) {
                    if (!email && payment.buyer_email_address) {
                        email = payment.buyer_email_address;
                    }
                    if (!name) {
                        if (payment.billing_address) {
                            const addr = payment.billing_address;
                            name = `${addr.given_name || ""} ${addr.family_name || ""}`.trim();
                        }
                        if (!name && payment.card_details?.cardholder_name) {
                            name = payment.card_details.cardholder_name;
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Error searching payments for order:", err);
        }
    }

    return { 
        email: email || "", 
        name: name || "Valued Customer" 
    };
}

// Helper to send "Ready for Pickup" email
async function sendReadyForPickupEmail(order: any, customerName: string, customerEmail: string, resendApiKey: string) {
    const pickupDateTime = order.metadata?.pickup_date_time || "Not specified";
    const items = order.line_items || [];
    
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; color: #0F1623; line-height: 1.6; background-color: #F6F5F2; padding: 20px; border-radius: 16px;">
            <div style="background-color: white; border: 1px solid #D5A5A5; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 40px;">🐾🎉</span>
                </div>
                <h2 style="font-size: 22px; color: #8A5858; border-bottom: 2px solid #D5A5A5; padding-bottom: 10px; margin-top: 0; text-align: center;">
                    Your Order is Ready for Pickup!
                </h2>
                
                <p style="font-size: 15px; margin-top: 20px;">
                    Hi <strong>${customerName}</strong>,
                </p>
                <p style="font-size: 15px;">
                    Great news! Your fresh, small-batch dog treats are prepared and ready for pickup at our Kanata location.
                </p>

                <div style="margin: 25px 0; padding: 20px; background-color: #F3F0E8; border-left: 4px solid #8A5858; border-radius: 8px;">
                    <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 16px; color: #8A5858;">Pickup Details</h3>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Coordinated Time:</strong> ${pickupDateTime}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> Kanata Bakery (Address provided during coordination)</p>
                </div>

                <h3 style="font-size: 15px; color: #0F1623; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px; margin-top: 25px;">
                    Order Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <tbody>
                        ${items.map((item: any) => `
                            <tr style="border-bottom: 1px solid #F3F4F6; font-size: 14px;">
                                <td style="padding: 8px 0;"><strong>${item.name}</strong> x ${item.quantity}</td>
                                <td style="padding: 8px 0; text-align: right;">
                                    $${((item.base_price_money?.amount || 0) * parseInt(item.quantity) / 100).toFixed(2)}
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>

                <p style="font-size: 14px; margin-top: 30px; color: #6B7280; text-align: center;">
                    If you have any questions or need to adjust your pickup window, feel free to reply directly to this email or reach us at <a href="mailto:2treatsdown@gmail.com" style="color: #8A5858;">2treatsdown@gmail.com</a>.
                </p>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #D5A5A5; text-align: center; font-size: 12px; color: #9CA3AF;">
                    Thank you for choosing 2TreatsDown! 🐾
                </div>
            </div>
        </div>
    `;

    return fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "2TreatsDown Bakery <onboarding@resend.dev>",
            to: customerEmail,
            reply_to: "2treatsdown@gmail.com",
            subject: "🐾 Your 2TreatsDown order is ready for pickup!",
            html: htmlContent,
        }),
    });
}

// Helper to send "Picked Up / Completed" email
async function sendCompletedEmail(customerName: string, customerEmail: string, resendApiKey: string) {
    const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; color: #0F1623; line-height: 1.6; background-color: #F6F5F2; padding: 20px; border-radius: 16px;">
            <div style="background-color: white; border: 1px solid #D5A5A5; border-radius: 12px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 40px;">🐾❤️</span>
                </div>
                <h2 style="font-size: 22px; color: #8A5858; border-bottom: 2px solid #D5A5A5; padding-bottom: 10px; margin-top: 0; text-align: center;">
                    Thank You for Your Order!
                </h2>
                
                <p style="font-size: 15px; margin-top: 20px;">
                    Hi <strong>${customerName}</strong>,
                </p>
                <p style="font-size: 15px;">
                    Thank you so much for picking up your fresh, small-batch dog treats from 2TreatsDown! We hope your pup enjoys every single bite.
                </p>
                <p style="font-size: 15px;">
                    We are dedicated to baking healthy, preservative-free goodies. We would love to hear your feedback or see a photo of your pup enjoying their treats! Feel free to tag us on social media or reply to this email.
                </p>

                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #D5A5A5; text-align: center; font-size: 12px; color: #9CA3AF;">
                    Baking with love in Kanata, ON. 🐾
                </div>
            </div>
        </div>
    `;

    return fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "2TreatsDown Bakery <onboarding@resend.dev>",
            to: customerEmail,
            reply_to: "2treatsdown@gmail.com",
            subject: "🐾 Thank you from 2TreatsDown!",
            html: htmlContent,
        }),
    });
}

// Helper to update Square Order metadata
async function updateOrderMetadata(
    orderId: string,
    currentVersion: number,
    metadataUpdate: Record<string, string>,
    token: string
) {
    try {
        const response = await fetch(`https://connect.squareup.com/v2/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Square-Version": "2024-02-22",
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    version: currentVersion,
                    metadata: metadataUpdate,
                },
                idempotency_key: crypto.randomUUID(),
            }),
        });

        if (!response.ok) {
            console.error("Failed to update order metadata in Square:", await response.text());
        }
    } catch (err) {
        console.error("Error updating order metadata:", err);
    }
}

export async function POST(req: NextRequest) {
    const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    const token = process.env.SQUARE_ACCESS_TOKEN;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!signatureKey || !token) {
        console.error("Webhook processing aborted: missing SQUARE_WEBHOOK_SIGNATURE_KEY or SQUARE_ACCESS_TOKEN");
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    try {
        // 1. Get raw request body as string
        const rawBody = await req.text();

        // 2. Reconstruct the absolute notification URL registered on Square
        const host = req.headers.get("host");
        const protocol = host?.includes("localhost") || host?.includes("127.0.0.1") ? "http" : "https";
        const notificationUrl = `${protocol}://${host}/api/webhooks/square`;

        // 3. Verify Signature header
        const signatureHeader = req.headers.get("x-square-hmacsha256-signature") || "";
        
        const isVerified = verifySquareSignature(rawBody, signatureHeader, signatureKey, notificationUrl);
        if (!isVerified) {
            console.warn("Unauthorized webhook request signature");
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 4. Parse the payload
        const payload = JSON.parse(rawBody);
        
        // We only care about order.updated events
        if (payload.type !== "order.updated") {
            return NextResponse.json({ status: "ignored" });
        }

        const order = payload.data?.object?.order;
        if (!order) {
            return NextResponse.json({ error: "Invalid Payload" }, { status: 400 });
        }

        const orderId = order.id;
        const fulfillments = order.fulfillments || [];
        if (fulfillments.length === 0) {
            return NextResponse.json({ status: "ignored_no_fulfillments" });
        }

        const firstFulfillment = fulfillments[0];
        const currentMetadata = order.metadata || {};

        // Case 1: Order is ready for pickup (PREPARED state) and email not sent yet
        if (firstFulfillment.state === "PREPARED" && currentMetadata.ready_email_sent !== "true") {
            const { email, name } = await getCustomerEmailAndName(order, token);
            
            if (email) {
                if (resendApiKey) {
                    await sendReadyForPickupEmail(order, name, email, resendApiKey);
                } else {
                    console.log("Mocking 'Ready for Pickup' email to:", email, "Name:", name);
                }
                
                // Write flag back to Square Order metadata to prevent double email triggers
                const updatedMetadata = { ...currentMetadata, ready_email_sent: "true" };
                await updateOrderMetadata(orderId, order.version, updatedMetadata, token);
                console.log(`Fulfillment email sent to ${email} for order ${orderId}`);
            } else {
                console.warn(`Could not resolve customer email address for ready order: ${orderId}`);
            }
        }

        // Case 2: Order is picked up (COMPLETED state) and completion email not sent yet
        if (firstFulfillment.state === "COMPLETED" && currentMetadata.completed_email_sent !== "true") {
            const { email, name } = await getCustomerEmailAndName(order, token);
            
            if (email) {
                if (resendApiKey) {
                    await sendCompletedEmail(name, email, resendApiKey);
                } else {
                    console.log("Mocking 'Order Completed' thank-you email to:", email, "Name:", name);
                }
                
                // Write flag back to Square Order metadata to prevent double email triggers
                const updatedMetadata = { ...currentMetadata, completed_email_sent: "true" };
                await updateOrderMetadata(orderId, order.version, updatedMetadata, token);
                console.log(`Completion email sent to ${email} for order ${orderId}`);
            } else {
                console.warn(`Could not resolve customer email address for completed order: ${orderId}`);
            }
        }

        return NextResponse.json({ status: "processed" });
    } catch (err) {
        console.error("Error processing Square webhook:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
