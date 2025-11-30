// index.js
const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

// ENV variables
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "1234";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

app.use(express.json());

// TEST ROOT
app.get("/", (req, res) => {
    res.send("WhatsApp Bot Running ✅");
});

// WEBHOOK VERIFY (GET)
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    } else {
        return res.sendStatus(403);
    }
});

// WEBHOOK RECEIVE (POST)
app.post("/webhook", async (req, res) => {
    res.sendStatus(200);

    try {
        if (
            req.body.entry &&
            req.body.entry[0].changes &&
            req.body.entry[0].changes[0].value.messages
        ) {
            const message = req.body.entry[0].changes[0].value.messages[0];
            const from = message.from;
            const text = message.text?.body || "";

            console.log("📩 Message:", from, text);

            await sendReply(from, "Hello! Message received: " + text);
        }
    } catch (e) {
        console.log("Error:", e);
    }
});

// SEND MESSAGE
async function sendReply(to, body) {
    try {
        const url = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;
        await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: { body }
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${WHATSAPP_TOKEN}`,
                }
            }
        );
    } catch (err) {
        console.log("Send error:", err.response?.data || err);
    }
}

app.listen(PORT, () => console.log("🚀 Running on port " + PORT));
