// index.js
const express = require("express");
const bodyParser = require("body-parser");

// agar aapke paas ye files hain to hi use karein
// nahi hain to in 4 lines ko comment kar sakte hain
const playlistRoutes = require("./playlist");
const astrologyRoutes = require("./astrology");
const problemRoutes = require("./problem");
const whatsappRoutes = require("./whatsapp");

const app = express();
const PORT = process.env.PORT || 10000;

// Render ENV me VERIFY_TOKEN = 1234 set hai
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "1234";

app.use(bodyParser.json());

// Health check
app.get("/", (req, res) => {
  res.send("OK");
});

// ✅ WEBHOOK VERIFY (GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  console.log("Webhook GET:", { mode, token, challenge });

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    // Meta ko wahi challenge string wapas deni hai
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// ✅ WEBHOOK RECEIVE (POST) – abhi sirf log karega
app.post("/webhook", (req, res) => {
  console.log("Webhook POST body:", JSON.stringify(req.body, null, 2));
  // Hamesha 200 send karna jaroori hai
  res.sendStatus(200);
});

// Baaki aapke APIs
if (playlistRoutes) app.use("/playlist", playlistRoutes);
if (astrologyRoutes) app.use("/astrology", astrologyRoutes);
if (problemRoutes) app.use("/problem", problemRoutes);
if (whatsappRoutes) app.use("/whatsapp", whatsappRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
