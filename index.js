// Puratan Hindu Tarika / Astrology WhatsApp Bot
// Node.js + Express + WhatsApp Cloud API

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// --------------------------------------
// ENVIRONMENT VARIABLES (Render pe set karna)
// --------------------------------------
//
// WHATSAPP_VERIFY_TOKEN  -> Meta webhook verify token
// WHATSAPP_TOKEN         -> Permanent access token
// WHATSAPP_PHONE_ID      -> WhatsApp Cloud API phone number ID
// PORT                   -> Render dega (locally 3000 rakh sakte hain)
// --------------------------------------

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const PORT = process.env.PORT || 3000;

// ---------------------------
// YouTube Playlist Links
// (Problem based suggestions)
// ---------------------------

const PLAYLISTS_PROBLEM = {
  JOB: "https://youtube.com/playlist?list=PLzV-R7eJU4ik35yPdfzcqK2Lz5qOOq-3K&si=X0k6rtWweaZWQkU-",
  BUSINESS: "https://youtube.com/playlist?list=PLzV-R7eJU4ikf4FbDxhx5kY5LdmqiUrQ9&si=KWRGRHURTugisseE",
  MARRIAGE: "https://youtube.com/playlist?list=PLzV-R7eJU4imht-w6XJ3GlymxoyaWEkd7&si=oVvA72KZXZny39M1",
  HEALTH: "https://youtube.com/playlist?list=PLzV-R7eJU4inMKCwwXEPPkFlFOukEweCA&si=Wlk57V2UoMroX4AQ",
  EDUCATION: "https://youtube.com/playlist?list=PLzV-R7eJU4ilVQkws-16ReMCjxvcHZOvP&si=u54lynUYsspiWdPp",
  OTHER: "https://youtube.com/playlist?list=PLzV-R7eJU4im6ihHb2uq0QVPcwjJQEF_h&si=EVX0n9VuJeHl-9Iu"
};

// Main channel link (optional – agar aap dikhana chahen)
const MAIN_CHANNEL_LINK = "https://www.youtube.com/@AncientHinduWay"; // change if needed

// ---------------------------
// Helper: WhatsApp send text
// ---------------------------
async function sendWhatsAppText(to, body) {
  try {
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json"
      },
      data: {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          preview_url: true,
          body
        }
      }
    });
  } catch (err) {
    console.error("Error sending WhatsApp message:", err.response?.data || err.message);
  }
}

// ---------------------------
// Helper: Normalise incoming text
// ---------------------------
function normalizeText(text) {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

// ---------------------------
// Welcome / Main Menu message
// ---------------------------
function getWelcomeMessage() {
  return (
    "🙏 Namaste, Main *Puratan Hindu Tarika* WhatsApp bot hoon.\n\n" +
    "Please apni *category* select kijiye:\n\n" +
    "*1)* Job / Career (नौकरी, प्रमोशन, जॉब समस्याएँ)\n" +
    "*2)* Business / Money (व्यवसाय, धन, पैसा)\n" +
    "*3)* Marriage / Relationship (शादी, रिश्ते, वैवाहिक समस्याएँ)\n" +
    "*4)* Health (स्वास्थ्य, बीमारी)\n" +
    "*5)* Education / Children (पढ़ाई, बच्चे)\n" +
    "*6)* Other Problems (अन्य समस्याएँ)\n\n" +
    "Aap sirf *number* likh kar bhej sakte हैं. \n" +
    "Example: 1 ya \"job\", 2 ya \"business\" etc.\n\n" +
    "📺 Hamara YouTube channel:\n" +
    MAIN_CHANNEL_LINK
  );
}

// ---------------------------
// Problem wise reply text
// ---------------------------
function getProblemReply(key) {
  switch (key) {
    case "JOB":
      return (
        "👨‍💼 *Job / Career Samasya*\n\n" +
        "Naukri, promotion, interview, job loss ya kaam se judi kisi bhi samasya ke liye " +
        "ye special playlist dekhiye:\n\n" +
        PLAYLISTS_PROBLEM.JOB +
        "\n\nAap apni exact problem bhi likh sakte hain, main related video suggest karunga. 🙏"
      );
    case "BUSINESS":
      return (
        "💰 *Business / Money Samasya*\n\n" +
        "Vyapar mein nuksaan, dhande ka na chalna, paisa atakna, EMI, loan, etc. ke liye " +
        "ye playlist especially bani hai:\n\n" +
        PLAYLISTS_PROBLEM.BUSINESS +
        "\n\nZyada detail likhen, main sahi mantra / video suggest karunga. 🙏"
      );
    case "MARRIAGE":
      return (
        "❤️ *Marriage / Relationship Samasya*\n\n" +
        "Shaadi ruk jana, rishta na milna, pati–patni tension, love marriage problem, " +
        "relationship issues ke liye ye playlist dekhiye:\n\n" +
        PLAYLISTS_PROBLEM.MARRIAGE +
        "\n\nApni situation short mein likhiye, main specific video suggest karunga. 🙏"
      );
    case "HEALTH":
      return (
        "🩺 *Health Samasya*\n\n" +
        "Bar-bar bimar hona, reports normal par takleef, operation ka dar, chronic illness – " +
        "in sab ke liye ye health related remedies playlist hai:\n\n" +
        PLAYLISTS_PROBLEM.HEALTH +
        "\n\nDhyaan rahe: ye *adhyatmik upay* hain, doctor ki salah ka replacement nahi. 🙏"
      );
    case "EDUCATION":
      return (
        "📚 *Education / Children Samasya*\n\n" +
        "Padhai mein mann na lagna, exam fear, result weak, bachchon ki aadatein, etc. ke liye " +
        "ye special playlist dekhiye:\n\n" +
        PLAYLISTS_PROBLEM.EDUCATION +
        "\n\nProblem detail likhen (age, class, issue), main sahi video suggest karunga. 🙏"
      );
    case "OTHER":
    default:
      return (
        "🔍 *Other Problems*\n\n" +
        "Jo upar wali category mein fit nahi hoti – jaise ghar ki tension, court case, " +
        "darr, depression, spiritual confusion, grah dosh ka doubt – in sab ke liye ye mixed playlist hai:\n\n" +
        PLAYLISTS_PROBLEM.OTHER +
        "\n\nAap apni problem short mein likh dijiyega, main uske hisaab se video suggest karunga. 🙏"
      );
  }
}

// ---------------------------
// WhatsApp Webhook VERIFY (GET)
// ---------------------------
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    return res.status(200).send(challenge);
  }

  console.log("Webhook verification failed");
  return res.sendStatus(403);
});

// ---------------------------
// WhatsApp Webhook RECEIVE (POST)
// ---------------------------
app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;

    if (body.object !== "whatsapp_business_account") {
      return res.sendStatus(404);
    }

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!messages || !messages[0]) {
      return res.sendStatus(200);
    }

    const message = messages[0];
    const from = message.from; // whatsapp number (without +)
    let text = "";

    // Different possible message types
    if (message.text && message.text.body) {
      text = message.text.body;
    } else if (message.button && message.button.text) {
      text = message.button.text;
    } else if (message.interactive) {
      if (message.interactive.type === "button_reply") {
        text = message.interactive.button_reply.title || "";
      } else if (message.interactive.type === "list_reply") {
        text = message.interactive.list_reply.title || "";
      }
    }

    const norm = normalizeText(text);

    console.log("Incoming msg from:", from, "| text:", text);

    // --------- BASIC FLOWS ---------

    // New chat / hi / hello – send welcome menu
    if (
      !norm ||
      ["hi", "hello", "namaste", "ram ram", "jai shri ram"].includes(norm)
    ) {
      await sendWhatsAppText(from, getWelcomeMessage());
      return res.sendStatus(200);
    }

    // User asking for menu again
    if (norm === "menu" || norm === "start" || norm === "help" || norm === "restart") {
      await sendWhatsAppText(from, getWelcomeMessage());
      return res.sendStatus(200);
    }

    // 1–6 or text keywords se problem detect
    let problemKey = null;

    if (["1", "01", "ek", "one"].includes(norm) || norm.includes("job") || norm.includes("naukri") || norm.includes("career")) {
      problemKey = "JOB";
    } else if (
      ["2", "02", "do", "two"].includes(norm) ||
      norm.includes("business") ||
      norm.includes("vyapar") ||
      norm.includes("dhandha") ||
      norm.includes("paise") ||
      norm.includes("paisa") ||
      norm.includes("money")
    ) {
      problemKey = "BUSINESS";
    } else if (
      ["3", "03", "teen", "three"].includes(norm) ||
      norm.includes("marriage") ||
      norm.includes("shaadi") ||
      norm.includes("shadi") ||
      norm.includes("relationship") ||
      norm.includes("rishta")
    ) {
      problemKey = "MARRIAGE";
    } else if (
      ["4", "04", "char", "four"].includes(norm) ||
      norm.includes("health") ||
      norm.includes("bimari") ||
      norm.includes("bimar") ||
      norm.includes("sehat")
    ) {
      problemKey = "HEALTH";
    } else if (
      ["5", "05", "paanch", "five"].includes(norm) ||
      norm.includes("education") ||
      norm.includes("padhai") ||
      norm.includes("study") ||
      norm.includes("school") ||
      norm.includes("child") ||
      norm.includes("bachcha") ||
      norm.includes("bache")
    ) {
      problemKey = "EDUCATION";
    } else if (
      ["6", "06", "chhe", "six"].includes(norm) ||
      norm.includes("other") ||
      norm.includes("koi aur") ||
      norm.includes("dusri") ||
      norm.includes("alag")
    ) {
      problemKey = "OTHER";
    }

    if (problemKey) {
      const reply = getProblemReply(problemKey);
      await sendWhatsAppText(from, reply);
      return res.sendStatus(200);
    }

    // Agar message kuch bhi random hai, toh user ko menu reminder + soft reply
    const fallback =
      "Aapne likha:\n\n" +
      `"${text}"\n\n` +
      "Is problem ko thoda short mein bata sakte hain? Saath hi agar chahen toh pehle ye menu se category choose karein:\n\n" +
      getWelcomeMessage();

    await sendWhatsAppText(from, fallback);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Error in /webhook POST:", err.response?.data || err.message);
    return res.sendStatus(500);
  }
});

// ---------------------------
// Health check route
// ---------------------------
app.get("/", (req, res) => {
  res.send("Astrology WhatsApp Bot is running ✅");
});

// ---------------------------
// Start server
// ---------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
