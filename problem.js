// problem.js
// This file handles user message → clean reply text.

function getReply(message) {
  if (!message) {
    return "🔍 Mujhe aapka message samajh nahi aaya. Kripya dobara bhejein.";
  }

  const msg = message.toLowerCase().trim();

  // 1. Greeting messages
  if (["hi","hello","namaste","hey"].some(w => msg.includes(w))) {
    return "🙏 Namaste! Main Astrology WhatsApp Assistant hoon. Aap mujhe apni date of birth, time & place bata sakte hain.";
  }

  // 2. Asking for D.O.B
  if (msg.includes("dob") || msg.includes("date of birth")) {
    return "📅 Kripya apni Date of Birth is format me bheje: DD-MM-YYYY";
  }

  // 3. Mahadasha related message
  if (msg.includes("mahadasha") || msg.includes("dasha")) {
    return "🕉 Aapki mahadasha calculate karne ke liye kripya yeh data bheje:\n\n1️⃣ Date of Birth\n2️⃣ Time of Birth\n3️⃣ Place of Birth\n\nExample:\nDOB 21-11-1992\nTime 10:45 PM\nPlace Delhi";
  }

  // 4. Education / Children / Career / Job
  if (msg.includes("education") || msg.includes("study")) {
    return "📘 Education analysis ke liye kripya apna DOB, Time & Place send karein.";
  }

  if (msg.includes("child") || msg.includes("children") || msg.includes("baby")) {
    return "👶 Children / Santan yog dekhne ke liye kripya apni Janam kundli details bhejein.";
  }

  if (msg.includes("job") || msg.includes("career") || msg.includes("work")) {
    return "💼 Career & Job reading ke liye kripya DOB, Time & Place bhejein.";
  }

  // 5. Playlist request
  if (msg.includes("playlist")) {
    return "🎵 Ye lo aapki playlist link:\nhttps://youtube.com/playlist?list=PLzV-R7eJU4ikPR9nkQZyIdJ3UIClxx9AK";
  }

  // 6. If user sends full birth details
  if (msg.match(/\d{1,2}-\d{1,2}-\d{4}/) && msg.includes(":")) {
    return "🧮 Aapki janam details receive ho gayi hain. Kundli calculation ho rahi hai…\n\n(Current API integration pending — please wait!)";
  }

  // Default reply
  return "🙏 Dhanyavaad! Aap apna question detail me likh kar bhej sakte hain.";
}

module.exports = { getReply };
