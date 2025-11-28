// Puratan Hindu Tarika Bot
// Node.js + Express + WhatsApp Cloud API + LocationIQ + AstrologyAPI

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// -------------------------------
// ENVIRONMENT VARIABLES
// -------------------------------
//
// Render par aapko ye env vars set karne honge:
//
// WHATSAPP_VERIFY_TOKEN
// WHATSAPP_TOKEN
// WHATSAPP_PHONE_ID
// LOCATIONIQ_KEY
// ASTROLOGY_USER_ID
// ASTROLOGY_API_KEY

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

const LOCATIONIQ_KEY = process.env.LOCATIONIQ_KEY;
const ASTROLOGY_USER_ID = process.env.ASTROLOGY_USER_ID;
const ASTROLOGY_API_KEY = process.env.ASTROLOGY_API_KEY;

// -------------------------------
// IN-MEMORY SESSIONS
// -------------------------------

const sessions = {};

function getSession(userId) {
  if (!sessions[userId]) {
    sessions[userId] = {
      step: "LANG", // LANG -> NAME -> DOB -> TOB -> PLACE -> ANY_OTHER / DONE
      lang: "hi",
      name: null,
      dob: null,
      tob: null,
      place: null,
      lat: null,
      lon: null,
      lastDasha: null
    };
  }
  return sessions[userId];
}

// -------------------------------
// PLANET & PLAYLIST MAPPING
// -------------------------------

const planetMap = {
  Sun: "Surya",
  Moon: "Chandra",
  Mars: "Mangal",
  Mercury: "Budh",
  Jupiter: "Guru",
  Venus: "Shukra",
  Saturn: "Shani",
  Rahu: "Rahu",
  Ketu: "Ketu"
};

// 👉 YAHAN 81 PLAYLISTS KA DATA AAYEGA
// Abhi ke liye sab khali chhoda hai ("")
// Baad me aap apne links daal sakte hain.

const playlists = {
  Surya: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Chandra: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Mangal: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Budh: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Guru: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Shukra: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Shani: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Rahu: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  },
  Ketu: {
    Surya: "",
    Chandra: "",
    Mangal: "",
    Budh: "",
    Guru: "",
    Shukra: "",
    Shani: "",
    Rahu: "",
    Ketu: ""
  }
};

// -------------------------------
// TEXTS (Hindi / English)
// -------------------------------

const texts = {
  hi: {
    welcome:
      "🙏 नमस्ते! Puratan Hindu Tarika bot में आपका स्वागत है।\nकृपया भाषा चुनें:\n1. हिन्दी\n2. English",
    askName: "कृपया अपना नाम भेजिए।",
    askDob: "अपनी जन्म तिथि इस फ़ॉर्मेट में भेजिए:\nDD MM YYYY\nजैसे: 05 09 1985",
    invalidDob:
      "तिथि सही फ़ॉर्मेट में नहीं है। कृपया दोबारा इस तरह भेजिए: DD MM YYYY",
    askTob:
      "अपना जन्म समय इस फ़ॉर्मेट में भेजिए:\nHH MM (24 घंटे प्रारूप)\nजैसे: 14 35",
    invalidTob:
      "समय सही फ़ॉर्मेट में नहीं है। कृपया HH MM जैसे 07 45 दोबारा भेजिए।",
    askPlace:
      "अपना जन्म स्थान (शहर / गाँव, ज़िला, देश सहित) लिखिए:\nजैसे: 'Meerut, Uttar Pradesh, India'",
    placeError:
      "स्थान से latitude/longitude नहीं मिल पाया। कृपया थोड़ा और स्पष्ट लिखिए (जैसे शहर + राज्य + देश)।",
    processing:
      "ध्यान दीजिए… आपकी कुंडली के अनुसार वर्तमान महादशा और अंतरदशा निकाली जा रही है 🔍",
    dashaResult: (name, maha, antar, playlist) =>
      `प्रिय ${name},\nआपकी वर्तमान महादशा: *${maha}*\nऔर अंतरदशा: *${antar}*\n\nइस समय के लिए Puratan Hindu Tarika के अनुसार यह उपाय playlist सुनिए:\n${playlist}\n\nयह playlist हमारे YouTube channel *@skgoel130 (Puratan Hindu Tarika)* पर है।`,
    dashaResultNoPlaylist: (name, maha, antar) =>
      `प्रिय ${name},\nआपकी वर्तमान महादशा: *${maha}*\nऔर अंतरदशा: *${antar}* निकली है।\n\nइस संयोजन के लिए अभी playlist सेट नहीं है। कृपया बाद में पुनः प्रयास करें या SK Goel जी से सीधा संपर्क करें।`,
    askProblem:
      "क्या कोई और समस्या है जिस पर मार्गदर्शन चाहिए?\nकृपया एक विकल्प चुनिए:\n1. नौकरी / करियर\n2. धन / बिजनेस\n3. स्वास्थ्य\n4. परिवार / संबंध\n5. और कोई अन्य",
    extraPlaylistInfo:
      "आपकी चुनी हुई समस्या के लिए एक अतिरिक्त playlist बहुत जल्दी जोड़ी जाएगी। फिलहाल के लिए ऊपर दी गई महादशा-अंतरदशा वाली playlist को नियमित सुनना शुरू कीजिए।\n\nआप कभी भी *Hi* लिखकर नया विश्लेषण ले सकते हैं।"
  },
  en: {
    welcome:
      "🙏 Namaste! Welcome to Puratan Hindu Tarika bot.\nPlease choose your language:\n1. Hindi\n2. English",
    askName: "Please send your full name.",
    askDob:
      "Send your date of birth in this format:\nDD MM YYYY\nExample: 05 09 1985",
    invalidDob:
      "DOB format is not correct. Please send like: DD MM YYYY (e.g. 05 09 1985).",
    askTob:
      "Send your time of birth in this format:\nHH MM (24-hour)\nExample: 14 35",
    invalidTob:
      "Time format is not correct. Please send like: HH MM (e.g. 07 45).",
    askPlace:
      "Please type your place of birth (city/town + state + country):\nExample: 'Meerut, Uttar Pradesh, India'",
    placeError:
      "Could not find coordinates for this place. Please type a bit more clearly (city + state + country).",
    processing:
      "Please wait… Calculating your current Mahadasha and Antardasha based on your birth details 🔍",
    dashaResult: (name, maha, antar, playlist) =>
      `Dear ${name},\nYour current Mahadasha is *${maha}*\nand Antardasha is *${antar}*.\n\nFor this period, as per Puratan Hindu Tarika, please listen to this playlist:\n${playlist}\n\nThis playlist is from our YouTube channel *@skgoel130 (Puratan Hindu Tarika)*.`,
    dashaResultNoPlaylist: (name, maha, antar) =>
      `Dear ${name},\nYour current Mahadasha is *${maha}*\nand Antardasha is *${antar}*.\n\nWe have not yet set a playlist for this combination. Please contact SK Goel ji directly or try later.`,
    askProblem:
      "Would you like guidance on any specific area?\nChoose one option:\n1. Job / Career\n2. Money / Business\n3. Health\n4. Family / Relationship\n5. Something else",
    extraPlaylistInfo:
      "We will soon add an extra playlist for your selected problem. For now, start listening daily to the Mahadasha–Antardasha playlist above.\n\nYou can type *Hi* anytime to start a new analysis."
  }
};

// -------------------------------
// WHATSAPP SEND MESSAGE
// -------------------------------

async function sendWhatsAppText(to, body) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.error("Error sending WhatsApp message:", err.response?.data || err.message);
  }
}

// -------------------------------
// LOCATIONIQ GEOCODING
// -------------------------------

async function geocodePlace(place) {
  try {
    const url = `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(
      place
    )}&format=json&limit=1`;
    const { data } = await axios.get(url);
    if (!Array.isArray(data) || data.length === 0) return null;
    const loc = data[0];
    return {
      lat: parseFloat(loc.lat),
      lon: parseFloat(loc.lon)
    };
  } catch (err) {
    console.error("LocationIQ error:", err.response?.data || err.message);
    return null;
  }
}

// -------------------------------
// ASTROLOGYAPI – CURRENT V DASHA
// -------------------------------

async function getCurrentDasha(session) {
  const [dd, mm, yyyy] = session.dob;
  const [hh, min] = session.tob;
  const { lat, lon } = session;

  const url = "https://api.astrologyapi.com/v1/current_vdasha";

  const payload = {
    day: dd,
    month: mm,
    year: yyyy,
    hour: hh,
    min: min,
    lat,
    lon,
    tzone: 5.5
  };

  const authString = Buffer.from(
    `${ASTROLOGY_USER_ID}:${ASTROLOGY_API_KEY}`
  ).toString("base64");

  try {
    const { data } = await axios.post(url, payload, {
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json"
      }
    });

    const mahaRaw =
      data?.current_vdasha?.mahadasha?.lord ||
      data?.mahadasha?.lord ||
      data?.mahadasha;
    const antarRaw =
      data?.current_vdasha?.antardasha?.lord ||
      data?.antardasha?.lord ||
      data?.antardasha;

    if (!mahaRaw || !antarRaw) return null;

    const mahaKey = planetMap[mahaRaw] || null;
    const antarKey = planetMap[antarRaw] || null;

    const playlist =
      mahaKey && antarKey &&
      playlists[mahaKey] &&
      playlists[mahaKey][antarKey]
        ? playlists[mahaKey][antarKey]
        : null;

    return {
      mahaRaw,
      antarRaw,
      mahaKey,
      antarKey,
      playlist
    };
  } catch (err) {
    console.error("AstrologyAPI error:", err.response?.data || err.message);
    return null;
  }
}

// -------------------------------
// MESSAGE FLOW HANDLER
// -------------------------------

async function handleIncomingMessage(from, text) {
  const cleanText = (text || "").trim();
  const session = getSession(from);

  if (/^hi$/i.test(cleanText) || /^hello$/i.test(cleanText) || /नमस्ते/i.test(cleanText)) {
    session.step = "LANG";
    session.lang = "hi";
    session.name = null;
    session.dob = null;
    session.tob = null;
    session.place = null;
    session.lat = null;
    session.lon = null;
    await sendWhatsAppText(from, texts[session.lang].welcome);
    return;
  }

  const t = texts[session.lang] || texts.hi;

  switch (session.step) {
    case "LANG": {
      if (cleanText === "1") session.lang = "hi";
      else if (cleanText === "2") session.lang = "en";
      else {
        await sendWhatsAppText(from, texts.hi.welcome);
        return;
      }
      session.step = "NAME";
      await sendWhatsAppText(from, texts[session.lang].askName);
      break;
    }

    case "NAME": {
      session.name = cleanText;
      session.step = "DOB";
      await sendWhatsAppText(from, t.askDob);
      break;
    }

    case "DOB": {
      const parts = cleanText.split(/\s+/);
      if (parts.length !== 3) {
        await sendWhatsAppText(from, t.invalidDob);
        return;
      }
      const [ddStr, mmStr, yyyyStr] = parts;
      const dd = parseInt(ddStr, 10);
      const mm = parseInt(mmStr, 10);
      const yyyy = parseInt(yyyyStr, 10);
      if (!dd || !mm || !yyyy || dd < 1 || dd > 31 || mm < 1 || mm > 12) {
        await sendWhatsAppText(from, t.invalidDob);
        return;
      }
      session.dob = [dd, mm, yyyy];
      session.step = "TOB";
      await sendWhatsAppText(from, t.askTob);
      break;
    }

    case "TOB": {
      const parts = cleanText.split(/\s+/);
      if (parts.length !== 2) {
        await sendWhatsAppText(from, t.invalidTob);
        return;
      }
      const [hhStr, mmStr] = parts;
      const hh = parseInt(hhStr, 10);
      const min = parseInt(mmStr, 10);
      if (isNaN(hh) || isNaN(min) || hh < 0 || hh > 23 || min < 0 || min > 59) {
        await sendWhatsAppText(from, t.invalidTob);
        return;
      }
      session.tob = [hh, min];
      session.step = "PLACE";
      await sendWhatsAppText(from, t.askPlace);
      break;
    }

    case "PLACE": {
      session.place = cleanText;
      await sendWhatsAppText(from, t.processing);

      const loc = await geocodePlace(cleanText);
      if (!loc) {
        await sendWhatsAppText(from, t.placeError);
        return;
      }
      session.lat = loc.lat;
      session.lon = loc.lon;

      const dasha = await getCurrentDasha(session);
      if (!dasha) {
        await sendWhatsAppText(
          from,
          "Astrology API से डेटा नहीं मिल पाया। कृपया बाद में पुनः प्रयास करें।"
        );
        return;
      }

      session.lastDasha = dasha;
      session.step = "ANY_OTHER";

      const mahaLabel = dasha.mahaKey || dasha.mahaRaw;
      const antarLabel = dasha.antarKey || dasha.antarRaw;

      if (dasha.playlist) {
        await sendWhatsAppText(
          from,
          t.dashaResult(session.name, mahaLabel, antarLabel, dasha.playlist)
        );
      } else {
        await sendWhatsAppText(
          from,
          t.dashaResultNoPlaylist(session.name, mahaLabel, antarLabel)
        );
      }

      await sendWhatsAppText(from, t.askProblem);
      break;
    }

    case "ANY_OTHER": {
      await sendWhatsAppText(from, t.extraPlaylistInfo);
      session.step = "DONE";
      break;
    }

    case "DONE": {
      await sendWhatsAppText(
        from,
        "Agar aap naya विश्लेषण चाहते हैं तो कृपया 'Hi' लिखकर दोबारा शुरुआत करें।"
      );
      break;
    }

    default: {
      session.step = "LANG";
      await sendWhatsAppText(from, texts.hi.welcome);
    }
  }
}

// -------------------------------
// WHATSAPP WEBHOOK
// -------------------------------

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const body = req.body;
    if (
      body.object === "whatsapp_business_account" &&
      Array.isArray(body.entry) &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const message = body.entry[0].changes[0].value.messages[0];
      const from = message.from;
      const text = message.text?.body || "";
      await handleIncomingMessage(from, text);
    }
    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err);
    res.sendStatus(500);
  }
});

// -------------------------------
// START SERVER
// -------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Puratan Hindu Tarika bot listening on port ${PORT}`);
});
