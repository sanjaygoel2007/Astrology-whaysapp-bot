// ===============================================
// Puratan Hindu Tarika WhatsApp Bot - index.js
// Full integration: WhatsApp + Problems + Dasha + Playlists
// ===============================================

require("dotenv").config();
const express = require("express");
const app = express();

// Local modules
const { sendWhatsAppText } = require("./whatsapp");
const { detectProblem } = require("./problem");
const { MAHADASHA_PLAYLISTS } = require("./playlists");
const { getCurrentDasha } = require("./astrology"); // make sure astrology.js => module.exports = { getCurrentDasha }

app.use(express.json());

// ----------------------------------------------
// Helpers
// ----------------------------------------------

// Graha map: user text -> proper key in MAHADASHA_PLAYLISTS
const GRAHA_MAP = {
  surya: "Surya",
  सूर्य: "Surya",
  sun: "Surya",

  chandra: "Chandra",
  चन्द्र: "Chandra",
  moon: "Chandra",

  mangal: "Mangal",
  मंगल: "Mangal",
  mars: "Mangal",

  budh: "Budh",
  बुध: "Budh",
  mercury: "Budh",

  guru: "Guru",
  बृहस्पति: "Guru",
  jupiter: "Guru",

  shukra: "Shukra",
  शुक्र: "Shukra",
  venus: "Shukra",

  shani: "Shani",
  शनि: "Shani",
  saturn: "Shani",

  rahu: "Rahu",
  राहु: "Rahu",

  ketu: "Ketu",
  केतु: "Ketu",
};

function normalizeGraha(word) {
  if (!word) return null;
  const key = word.toLowerCase().trim();
  return GRAHA_MAP[key] || null;
}

// Dasha se playlist nikalna (81 combos)
function getDashaPlaylist(maha, antara) {
  if (
    !maha ||
    !antara ||
    !MAHADASHA_PLAYLISTS[maha] ||
    !MAHADASHA_PLAYLISTS[maha][antara]
  ) {
    return null;
  }
  return MAHADASHA_PLAYLISTS[maha][antara];
}

// ----------------------------------------------
// Webhook Verification (GET)
// ----------------------------------------------
app.get("/webhook", (req, res) => {
  const challenge = req.query["hub.challenge"];
  console.log("Webhook GET query:", req.query);

  // Token check optional: Meta ko sirf challenge wapas chahiye
  if (challenge) {
    return res.status(200).send(challenge);
  }
  return res.status(200).send("OK");
});

// ----------------------------------------------
// Webhook Receiver (POST)
// ----------------------------------------------
app.post("/webhook", async (req, res) => {
  console.log("Webhook POST body:", JSON.stringify(req.body, null, 2));

  try {
    const entry = req.body.entry && req.body.entry[0];
    const changes = entry && entry.changes && entry.changes[0];
    const value = changes && changes.value;
    const messages = value && value.messages;

    if (!messages || !messages[0]) {
      return res.sendStatus(200);
    }

    const msg = messages[0];

    // Only handle text messages for now
    if (msg.type !== "text") {
      return res.sendStatus(200);
    }

    const from = msg.from; // user WhatsApp number
    const text = (msg.text && msg.text.body) || "";

    console.log("New message from:", from, "text:", text);

    await handleUserMessage(from, text);
  } catch (err) {
    console.error("Error in POST /webhook:", err);
  }

  // Always respond 200 to WhatsApp
  res.sendStatus(200);
});

// ----------------------------------------------
// MAIN CHAT LOGIC
// ----------------------------------------------
async function handleUserMessage(user, text) {
  const raw = (text || "").trim();
  const lower = raw.toLowerCase();

  // 0) Basic greeting / menu
  if (
    ["hi", "hello", "namaste", "namaskar", "menu", "start"].some((w) =>
      lower.startsWith(w)
    )
  ) {
    return sendWhatsAppText(
      user,
      "🙏 *Puratan Hindu Tarika Bot mein aapka swagat hai*\n\n" +
        "Aap 2 tareeke se madad le sakte hain:\n\n" +
        "1️⃣ *Mahadasha / Antardasha playlist* (agar aapko pata hai)\n" +
        "   → Example:  _Surya Budh_,  _Shani Shukra_,  _Rahu Mangal_\n\n" +
        "2️⃣ *Samasya ke hisaab se playlist*:\n" +
        "   - job / career\n" +
        "   - business / money\n" +
        "   - marriage / relationship\n" +
        "   - health\n" +
        "   - education / children\n" +
        "   - other\n\n" +
        "Aap apni samasya ya dasha type karke bhej sakte hain. 🙂"
    );
  }

  // 1) Problem-based playlist (job, business, health, etc.)
  const problem = detectProblem(raw);
  if (problem) {
    return sendWhatsAppText(
      user,
      `${problem.title}\n${problem.link}\n\n👉 YouTube channel: *@skgoel130 (Puratan Hindu Tarika)*`
    );
  }

  // 2) User directly Surya Budh / Guru Shani type karta hai → dasha playlist
  const parts = raw.split(/\s+/);
  if (parts.length === 2) {
    const maha = normalizeGraha(parts[0]);
    const antara = normalizeGraha(parts[1]);

    if (maha && antara) {
      const url = getDashaPlaylist(maha, antara);
      if (url) {
        return sendWhatsAppText(
          user,
          `🕉 *Mahadasha:* ${maha}\n` +
            `🔹 *Antardasha:* ${antara}\n\n` +
            `📺 Aapke liye playlist:\n${url}\n\n` +
            "👉 YouTube channel: *@skgoel130 (Puratan Hindu Tarika)*"
        );
      }
    }
  }

  // 3) Optional: command-based calculation from DOB & TOB using astrology.js
  // Format example:  calc 1990-05-12 10:30
  if (lower.startsWith("calc ")) {
    const tokens = raw.split(/\s+/);
    if (tokens.length >= 3) {
      const dob = tokens[1]; // YYYY-MM-DD
      const tob = tokens[2]; // HH:MM

      try {
        const dasha = getCurrentDasha(dob, tob); // from astrology.js
        const maha = dasha.mahadasha;
        const antara = dasha.antardasha;
        const endDate = dasha.antardasha_end_date;

        let msg =
          "🧮 *Current Dasha (approx calculation)*\n\n" +
          `Mahadasha: *${maha}*\n` +
          `Antardasha: *${antara}*\n` +
          `Antardasha khatam hone ki approximate date: *${endDate}*\n\n`;

        const url = getDashaPlaylist(maha, antara);
        if (url) {
          msg += `📺 Is dasha ke hisaab se playlist:\n${url}\n\n`;
        }

        msg += "👉 YouTube channel: *@skgoel130 (Puratan Hindu Tarika)*";

        return sendWhatsAppText(user, msg);
      } catch (e) {
        console.error("Error in getCurrentDasha:", e);
        return sendWhatsAppText(
          user,
          "❌ Dasha calculate karne mein dikkat aa rahi hai. Kripya DOB format `calc YYYY-MM-DD HH:MM` jaisa bhejein."
        );
      }
    } else {
      return sendWhatsAppText(
        user,
        "ℹ️ Dasha calculate karne ke liye format:\n\n`calc YYYY-MM-DD HH:MM`\n\nExample:\n`calc 1985-11-21 10:45`"
      );
    }
  }

  // 4) Default reply – help text
  return sendWhatsAppText(
    user,
    "🙏 Aapka message mila: *" +
      raw +
      "*\n\n" +
      "Aap yeh try kar sakte hain:\n" +
      "• Dasha ke naam:  _Surya Budh_,  _Shani Rahu_,  _Rahu Mangal_ ...\n" +
      "• Samasya:  job, business, health, marriage, education, other\n" +
      "• Ya dasha calculate karne ke liye:\n" +
      "`calc YYYY-MM-DD HH:MM`\n\n" +
      "Example:\n`calc 1990-05-12 10:30`\n\n" +
      "👉 YouTube: *@skgoel130 (Puratan Hindu Tarika)*"
  );
}

// ----------------------------------------------
// Root Route
// ----------------------------------------------
app.get("/", (req, res) => {
  res.send("Puratan Hindu Tarika WhatsApp Bot is running ✅");
});

// ----------------------------------------------
// Start Server
// ----------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("=======================================");
  console.log(" Puratan Hindu Tarika Bot running on:", PORT);
  console.log("=======================================");
});
