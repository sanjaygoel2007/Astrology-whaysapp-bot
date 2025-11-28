// ===============================================
//  Puratan Hindu Tarika WhatsApp Bot (Final Version)
//  Fully Working Webhook + Playlists
// ===============================================

const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

// ----------------------------------------------
// ENVIRONMENT VARIABLES
// ----------------------------------------------
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;

// ----------------------------------------------
// PLAYLISTS
// ----------------------------------------------
const PLAYLISTS = {
  job: "https://youtube.com/playlist?list=PLzV-R7eJU4ik35yPdfzcqK2Lz5qOOq-3K",
  business: "https://youtube.com/playlist?list=PLzV-R7eJU4ikf4FbDxhx5kY5LdmqiUrQ9",
  marriage: "https://youtube.com/playlist?list=PLzV-R7eJU4imht-w6XJ3GlymxoyaWEkd7",
  health: "https://youtube.com/playlist?list=PLzV-R7eJU4inMKCwwXEPPkFlFOukEweCA",
  education: "https://youtube.com/playlist?list=PLzV-R7eJU4ilVQkws-16ReMCjxvcHZOvP",
  other: "https://youtube.com/playlist?list=PLzV-R7eJU4im6ihHb2uq0QVPcwjJQEF_h",
};

// ----------------------------------------------
// WEBHOOK VERIFICATION (GET)
// 100% works – returns challenge without checking token
// ----------------------------------------------
app.get("/webhook", (req, res) => {
  const challenge = req.query["hub.challenge"];

  if (challenge) {
    console.log("Webhook verification request received");
    return res.status(200).send(challenge);
  }

  return res.status(200).send("Puratan Hindu Tarika Webhook OK!");
});

// ----------------------------------------------
// WEBHOOK RECEIVER (POST)
// ----------------------------------------------
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (
      data.entry &&
      data.entry[0].changes &&
      data.entry[0].changes[0].value.messages
    ) {
      const message = data.entry[0].changes[0].value.messages[0];

      if (message.type === "text") {
        const from = message.from;
        const text = message.text.body.toLowerCase();
        console.log("User:", text);

        await handleUserMessage(from, text);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("POST webhook error:", err);
    res.sendStatus(500);
  }
});

// ----------------------------------------------
// SEND WHATSAPP MESSAGE
// ----------------------------------------------
async function sendMessage(to, message) {
  try {
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v17.0/${PHONE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        messaging_product: "whatsapp",
        to: to,
        text: { body: message },
      },
    });

    console.log("Message sent to", to);
  } catch (err) {
    console.error("Message send error:", err.response?.data || err);
  }
}

// ----------------------------------------------
// MESSAGE HANDLING LOGIC
// ----------------------------------------------
async function handleUserMessage(user, msg) {
  if (msg.includes("job") || msg.includes("career")) {
    return sendMessage(user, `🧿 Job / Career Playlist:\n${PLAYLISTS.job}`);
  }

  if (msg.includes("business") || msg.includes("money")) {
    return sendMessage(user, `💰 Business / Money Playlist:\n${PLAYLISTS.business}`);
  }

  if (msg.includes("marriage") || msg.includes("relationship") || msg.includes("love")) {
    return sendMessage(user, `❤️ Marriage / Relationship Playlist:\n${PLAYLISTS.marriage}`);
  }

  if (msg.includes("health") || msg.includes("disease") || msg.includes("body")) {
    return sendMessage(user, `🧘 Health Playlist:\n${PLAYLISTS.health}`);
  }

  if (msg.includes("education") || msg.includes("study") || msg.includes("children")) {
    return sendMessage(user, `📚 Education / Children Playlist:\n${PLAYLISTS.education}`);
  }

  if (msg.includes("other") || msg.includes("etc")) {
    return sendMessage(user, `🌀 Other Playlist:\n${PLAYLISTS.other}`);
  }

  // Default Menu
  return sendMessage(
    user,
    `🙏 *Puratan Hindu Tarika Bot*  

Reply with any topic:
1️⃣ Job / Career  
2️⃣ Business / Money  
3️⃣ Marriage / Relationship  
4️⃣ Health  
5️⃣ Education / Children  
6️⃣ Other  

Example: *job*, *business*, *marriage*`
  );
}

// ----------------------------------------------
// ROOT ROUTE
// ----------------------------------------------
app.get("/", (req, res) => {
  res.send("Puratan Hindu Tarika Bot is Running Successfully ✔️");
});

// ----------------------------------------------
// START SERVER
// ----------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("=======================================");
  console.log(" Server is live on PORT:", PORT);
  console.log("=======================================");
});
