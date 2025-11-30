// index.js
// Simple WhatsApp webhook server + optional routes

const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

// ------------ CONFIG FROM ENV ---------------

// VERIFY_TOKEN: Meta webhook verify ke liye
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "1234";

// WHATSAPP_TOKEN: permanent access token
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

// PHONE_NUMBER_ID: WhatsApp Business "phone number ID"
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// --------------------------------------------

app.use(express.json());

// ----- OPTIONAL ROUTES (agar files na ho to error mat do) -----

let playlistRoutes, astrologyRoutes, problemRoutes, whatsappRoutes;

try {
  playlistRoutes = require("./playlist");
  console.log("playlist.js loaded");
} catch (e) {
  console.log("playlist.js not found, skipping route");
}

try {
  astrologyRoutes = require("./astrology");
  console.log("astrology.js loaded");
} catch (e) {
  console.log("astrology.js not found, skipping route");
}

try {
  problemRoutes = require("./problem");
  console.log("problem.js loaded");
} catch (e) {
  console.log("problem.js not found, skipping route");
}

try {
  whatsappRoutes = require("./whatsapp");
  console.log("whatsapp.js loaded");
} catch (e) {
  console.log("whatsapp.js not found, skipping route");
}

// In routes ko sirf tab use karo jab load ho gaye hon
if (playlistRoutes) app.use("/playlist", playlistRoutes);
if (astrologyRoutes) app.use("/astrology", astrologyRoutes);
if (problemRoutes) app.use("/problem", problemRoutes);
if (whatsappRoutes) app.use("/whatsapp", whatsappRoutes);

// --------------- BASIC ROUTE ----------------

app.get("/", (req, res) => {
  res.send("Astrology WhatsApp Bot is running ✅");
});

// --------------- WEBHOOK VERIFY (GET) ----------------

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook GET:", { mode, token, challenge });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified successfully");
    return res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook verification failed");
    return res.sendStatus(403);
  }
});

// --------------- WEBHOOK RECEIVE (POST) ----------------

app.post("/webhook", async (req, res) => {
  console.log("Webhook POST body:", JSON.stringify(req.body, null, 2));

  // Meta ko turant 200 bhejna zaroori hai
  res.sendStatus(200);

  try {
    if (
      req.body.object === "whatsapp_business_account" &&
      Array.isArray(req.body.entry) &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0].value &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      const message =
        req.body.entry[0].changes[0].value.messages[0];

      const from = message.from; // user ka number (with country code)
      const text =
        message.text && message.text.body
          ? message.text.body
          : "";

      console.log("📩 Incoming message from:", from, "text:", text);

      // Simple auto-reply (test ke liye)
      await sendWhatsAppText(
        from,
        "Namaste 🙏\nAapka message mila: " + text
      );
    }
  } catch (err) {
    console.error("Error handling incoming message:", err.message);
  }
});

// --------------- SEND MESSAGE HELPER ----------------

async function sendWhatsAppText(to, body) {
  try {
    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      console.error(
        "WHATSAPP_TOKEN ya PHONE_NUMBER_ID missing hai – env variables check karo."
      );
      return;
    }

    const url = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${WHATSAPP_TOKEN}`,
    };

    const resp = await axios.post(url, payload, { headers });
    console.log("✅ Message sent response:", resp.data);
  } catch (err) {
    if (err.response) {
      console.error(
        "❌ Error from WhatsApp API:",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("❌ Error sending WhatsApp message:", err.message);
    }
  }
}

// --------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`VERIFY_TOKEN: ${VERIFY_TOKEN}`);
});
