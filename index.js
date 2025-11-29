// --------------------------
// ASTROLOGY WHATSAPP BOT
// --------------------------
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

// Your WhatsApp token
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "YOUR_TOKEN_HERE";

// --------------------------
// 1) WEBHOOK VERIFICATION
// --------------------------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook GET:", mode, challenge);

  // 👉 Token check hata diya (universal pass)
  if (mode === "subscribe") {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// --------------------------
// 2) WEBHOOK MESSAGE RECEIVE
// --------------------------
app.post("/webhook", async (req, res) => {
  console.log("POST Webhook Received:", JSON.stringify(req.body, null, 2));

  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (message) {
      const from = message.from;
      const text = message.text?.body;

      console.log("Received message:", text);

      // reply
      await axios.post(
        `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Your message: " + text }
        },
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (err) {
    console.error("Error handling message:", err);
  }

  res.sendStatus(200);
});

// --------------------------
// 3) HOME ROUTE
// --------------------------
app.get("/", (req, res) => {
  res.send("WhatsApp bot is running");
});

// --------------------------
// 4) START SERVER
// --------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
