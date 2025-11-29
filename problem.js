// problem.js
// Stores 6 problem-based YouTube playlists for quick replies

const PROBLEM_PLAYLISTS = {
  job: {
    keywords: ["job", "career", "naukri", "rojgar"],
    title: "🧿 Job / Career Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4ik35yPdfzcqK2Lz5qOOq-3K"
  },

  business: {
    keywords: ["business", "money", "finance", "dhandha"],
    title: "💰 Business / Money Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4ikf4FbDxhx5kY5LdmqiUrQ9"
  },

  marriage: {
    keywords: ["marriage", "relationship", "love", "shaadi"],
    title: "❤️ Marriage / Relationship Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4imht-w6XJ3GlymxoyaWEkd7"
  },

  health: {
    keywords: ["health", "disease", "illness", "body"],
    title: "🧘 Health Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4inMKCwwXEPPkFlFOukEweCA"
  },

  education: {
    keywords: ["education", "study", "children", "kids"],
    title: "📚 Education / Children Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4ilVQkws-16ReMCjxvcHZOvP"
  },

  other: {
    keywords: ["other", "else", "baaki", "etc"],
    title: "🌀 Other Playlist",
    link: "https://youtube.com/playlist?list=PLzV-R7eJU4im6ihHb2uq0QVPcwjJQEF_h"
  },
};

/**
 * Identify user problem based on keywords
 * @param {string} message
 * @returns {object|null}
 */
function detectProblem(message) {
  const msg = message.toLowerCase();

  for (const key in PROBLEM_PLAYLISTS) {
    const problem = PROBLEM_PLAYLISTS[key];

    if (problem.keywords.some(k => msg.includes(k))) {
      return problem; // return matched playlist object
    }
  }

  return null;
}

module.exports = {
  PROBLEM_PLAYLISTS,
  detectProblem
};
