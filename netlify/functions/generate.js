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
# PRIVACY POLICY for ${data.company}
Last Updated: ${new Date().toLocaleDateString()}

1. INTRODUCTION
Welcome to ${data.company} ("we", "us"). We operate ${data.url}.

2. DATA COLLECTION
${data.cookies ? "We use cookies to improve experience." : "We do not use cookies."}
${data.ads ? "We partner with advertising networks." : "We do not run ads."}
${data.payments ? "We process payments securely." : "We do not collect payments."}

3. CONTACT
Contact us at ${data.email}.
Jurisdiction: ${data.jurisdiction}.
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
