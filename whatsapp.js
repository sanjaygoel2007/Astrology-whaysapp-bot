// whatsapp.js
// Helper to send WhatsApp messages via Cloud API

const axios = require("axios");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;      // Permanent access token
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID; // Phone Number ID

if (!WHATSAPP_TOKEN) {
  console.warn("⚠ WHATSAPP_TOKEN environment variable missing!");
}
if (!WHATSAPP_PHONE_ID) {
  console.warn("⚠ WHATSAPP_PHONE_ID environment variable missing!");
}

/**
 * Send simple text message on WhatsApp
 * @param {string} to   - User ka WhatsApp number (country code ke saath, e.g. 919891013934)
 * @param {string} text - Message body
 */
async function sendWhatsAppText(to, text) {
  try {
    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
      console.error("❌ Cannot send message: WHATSAPP_TOKEN / WHATSAPP_PHONE_ID missing.");
      return;
    }

    const url = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: to,
      type: "text",
      text: {
        body: text,
        preview_url: false,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
    };

    const res = await axios.post(url, payload, { headers });
    console.log("✅ WhatsApp message sent:", JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(
      "❌ Error sending WhatsApp message:",
      err.response?.data || err.message
    );
  }
}

module.exports = {
  sendWhatsAppText,
};
