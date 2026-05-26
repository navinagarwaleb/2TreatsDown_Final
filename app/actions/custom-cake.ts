"use server";

export async function submitCustomCakeRequest(formData: {
    firstName: string;
    lastName: string;
    pupFirstName: string;
    pupLastName: string;
    pupAge: string;
    email: string;
    occasion: string;
    celebrationDate: string;
    cakeSize: string;
    allergies: string;
    comments?: string;
    referral: string;
}) {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
        console.warn("RESEND_API_KEY environment variable is missing. Submission logged to console:");
        console.log(formData);
        // Return a mock success so developers/users can test the UI local state
        return { success: true, mocked: true };
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Custom Cake Form <onboarding@resend.dev>",
                to: "2treatsdown@gmail.com",
                subject: `🐾 New Custom Cake Request for ${formData.pupFirstName}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; color: #0F1623; line-height: 1.6;">
                        <h2 style="font-size: 24px; color: #8A5858; border-bottom: 2px solid #D5A5A5; padding-bottom: 10px;">
                            New Custom Cake Request 🐾
                        </h2>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; width: 180px;">Customer Name:</td>
                                <td style="padding: 8px 0;">${formData.firstName} ${formData.lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Customer Email:</td>
                                <td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #8A5858;">${formData.email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Pup's Name:</td>
                                <td style="padding: 8px 0;">${formData.pupFirstName} ${formData.pupLastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Pup's Age:</td>
                                <td style="padding: 8px 0;">${formData.pupAge}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Occasion:</td>
                                <td style="padding: 8px 0;">${formData.occasion}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Celebration Date:</td>
                                <td style="padding: 8px 0;">${formData.celebrationDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Cake Size:</td>
                                <td style="padding: 8px 0;">${formData.cakeSize}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">Allergies / Dietary Restrictions:</td>
                                <td style="padding: 8px 0; color: ${formData.allergies ? '#c2410c' : 'inherit'}; font-weight: bold;">
                                    ${formData.allergies}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold;">How did you hear about us:</td>
                                <td style="padding: 8px 0;">${formData.referral}</td>
                            </tr>
                        </table>
                        
                        <h3 style="margin-top: 30px; font-size: 18px; color: #0F1623;">Comments / Design Vision:</h3>
                        <div style="background-color: #F6F5F2; border: 1px solid #D5A5A5; border-radius: 8px; padding: 15px; font-style: italic; white-space: pre-wrap;">
                            "${formData.comments || "None"}"
                        </div>
                    </div>
                `,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Failed to send email via Resend API:", errText);
            return { success: false, error: "Failed to submit request to email service." };
        }

        return { success: true };
    } catch (error) {
        console.error("Error submitting cake request server action:", error);
        return { success: false, error: "An unexpected error occurred while sending your request." };
    }
}
