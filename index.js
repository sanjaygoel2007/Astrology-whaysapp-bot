const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Verify token (same token you added in Meta dashboard & Render environment)
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "1234";

// ➤ Webhook verification (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook GET request received:", req.query);

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return res.status(200).send(challenge);
  } else {
    console.log("Webhook verification failed!");
    return res.sendStatus(403);
  }
});

// ➤ Webhook receiver (POST)
app.post("/webhook", (req, res) => {
  console.log("Webhook POST Data:", JSON.stringify(req.body, null, 2));

  try {
    if (
      req.body &&
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0].value.messages
    ) {
      const message =
        req.body.entry[0].changes[0].value.messages[0].text.body;

      console.log("Received message:", message);
    }
  } catch (err) {
    console.log("Error processing message:", err);
  }

  res.sendStatus(200);
});

// Default route
app.get("/", (req, res) => {
  res.send("WhatsApp Bot is running.");
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
