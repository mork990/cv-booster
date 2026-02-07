exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);
        
        // --- SECURITY CHECK (PLACEHOLDER) ---
        // Here we would verify the Stripe Session ID to ensure payment happened.
        // const paid = await verifyStripe(data.paymentId);
        // if (!paid) return { statusCode: 403, body: "Payment Required" };
        // ------------------------------------

        // Generate the Legal Text (Server Side - Secure)
        const privacyPolicy = `
# PRIVACY POLICY

**Last Updated:** ${new Date().toLocaleDateString()}

## 1. INTRODUCTION
Welcome to **${data.company}** ("we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to our website **${data.url}** (the "Service").

## 2. INFORMATION WE COLLECT
We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.

## 3. HOW WE USE YOUR INFORMATION
We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.

${data.cookies ? "## 4. COOKIES AND TRACKING TECHNOLOGIES\nWe use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice." : ""}

${data.ads ? "## 5. THIRD-PARTY ADVERTISING\nWe use third-party advertising companies to serve ads when you visit the website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you." : ""}

${data.payments ? "## 6. PAYMENT PROCESSING\nWe may provide paid products and/or services within the Service. In that case, we use third-party services for payment processing (e.g. payment processors). We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy." : ""}

## 7. CONTACT US
If you have questions or comments about this policy, you may email us at **${data.email}**.

**Jurisdiction:** This policy is governed by the laws of **${data.jurisdiction}**.
        `;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                success: true, 
                document: privacyPolicy 
            })
        };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
