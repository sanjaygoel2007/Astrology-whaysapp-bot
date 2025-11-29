// whatsapp.js
// Simple helper to send WhatsApp messages via Cloud API (no extra npm package needed)

const https = require("https");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;   // permanent token
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID; // WhatsApp phone number ID

if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
  console.warn("⚠️ WHATSAPP_TOKEN ya PHONE_NUMBER_ID env vars missing hain.");
}

/**
 * Internal helper: call WhatsApp API
 */
function callWhatsAppAPI(payloadObj) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(payloadObj);

    const options = {
      hostname: "graph.facebook.com",
      path: `/v21.0/${PHONE_NUMBER_ID}/messages`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload),
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(body);
            console.log("✅ WhatsApp API success:", json);
            resolve(json);
          } catch (e) {
            console.log("✅ WhatsApp API raw response:", body);
            resolve(body);
          }
        } else {
          console.error("❌ WhatsApp API error:", res.statusCode, body);
          reject(new Error(`WhatsApp API error: ${res.statusCode}`));
        }
      });
    });

    req.on("error", (err) => {
      console.error("❌ WhatsApp API request failed:", err);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Public function: simple text message
 * @param {string} to - user ka WhatsApp number (country code ke sath, jaise 919891013934)
 * @param {string} message - text body
 */
async function sendWhatsAppText(to, message) {
  const data = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body: message,
      preview_url: false,
    },
  };

  return callWhatsAppAPI(data);
}

module.exports = {
  sendWhatsAppText,
};
