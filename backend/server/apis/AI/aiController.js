// server/apis/AI/aiController.js


const MatchModel = require("../Match/MatchModel");
const BookingModel = require("../Booking/BookingModel");
const SportModel = require("../Sport/SportModel");

const { GoogleGenAI } = require("@google/genai");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // set this in .env

if (!GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY is not set");
}

// ============================================
// GEMINI MODEL OPTIONS —
// ============================================

// OPTION 1 — gemini-3.1-flash-lite (500 req/day) — CURRENTLY ACTIVE
const GEMINI_MODEL = "gemini-3.1-flash-lite"

// OPTION 2 — gemini-2.5-flash (20 req/day)
// const GEMINI_MODEL = "gemini-2.5-flash"

// OPTION 3 — gemini-2.5-flash-lite (20 req/day)
// const GEMINI_MODEL = "gemini-2.5-flash-lite"

// OPTION 4 — gemini-3-flash (20 req/day)
// const GEMINI_MODEL = "gemini-3-flash"

// ============================================

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

exports.predictAttendance = async ({ matchDate, matchTime, matchName }) => {
  try {
    // Construct a prompt for prediction
    const prompt = `
      Predict attendance for the following match:
      Match Name: ${matchName}
      Match Date: ${matchDate}
      Match Time: ${matchTime}

      Provide just a numeric estimate (e.g., "3500").
    `;

    // Call the Gemini API
    // const result = await ai.models.generateContent({
    //   model: "gemini-1.5-flash-latest",
    //   contents: prompt,
    // });


    const result = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: projectContext
    })



    // The response text
    const text = result.text?.trim();

    // Attempt to extract a number
    const attendanceMatch = text.match(/\d+/);
    const attendance = attendanceMatch ? parseInt(attendanceMatch[0], 10) : text;

    return { attendance };

  } catch (err) {
    console.error("Gemini predictAttendance error:", err);
    throw new Error("Failed to predict attendance");
  }
};



// aiController.js




// exports.getMatchesBySport = async ({ sportName }) => {
//   try {

//     if (!sportName) {
//       throw new Error("sportName is required");
//     }

//     // 1️⃣ Find sport by name (case insensitive)
//     const sport = await SportsModel.findOne({
//       sportName: { $regex: new RegExp(`^${sportName}$`, "i") }
//     });

//     if (!sport) {
//       return { matches: [] };
//     }

//     // 2️⃣ Find matches for that sport
//     const matches = await MatchModel.find({
//       sportsId: sport._id
//     })
//       .select("matchName matchDate ")
//       .lean();

//     return { matches };

//   } catch (err) {
//     console.error("getMatchesBySport error:", err);
//     throw new Error("Failed to fetch matches by sport");
//   }
// };


exports.getMatchesBySport = async (req, res) => {
  try {

    const { sportName } = req.body || {};

    if (!sportName) {
      return res.status(400).json({
        success: false,
        message: "sportName is required"
      });
    }

    const sport = await SportModel.findOne({
      sportName: { $regex: sportName, $options: "i" }
    });

    if (!sport) {
      return res.status(404).json({
        success: false,
        message: "Sport not found"
      });
    }

    const matches = await MatchModel.find({
      sportsId: sport._id
    })
    .populate("teamId", "teamName")
    .lean();

    const formattedMatches = (matches || []).map(match => ({
      matchName: match.matchName,
      matchDate: match.matchDate,
      teams: (match.teamId || []).map(t => t.teamName)
    }));

    return res.status(200).json({
      success: true,
      data: { matches: formattedMatches }
    });

  } catch (err) {
    console.error("getMatchesBySport error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};






exports.chatBot = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" })
    }

    // Project ka live data fetch karo
    const [matches, teams, sports, players] = await Promise.all([
      MatchModel.find({ status: "Upcoming" })
        .populate("sportsId", "sportName")
        .populate("teamId", "teamName")
        .lean(),
      require("../Team/TeamModel").find({ status: "Active" })
        .populate("sportsId", "sportName")
        .lean(),
      SportModel.find({ status: "Active" }).lean(),
      require("../Player/PlayerModel").find({ status: "Active" })
        .populate("teamId", "teamName")
        .lean()
    ])

    // Project data ko readable format mein convert karo
//     const projectContext = `
// You are a helpful sports assistant for a Sports Management Platform.
// PRIORITY: Always answer from the project data below first. Only use general sports knowledge if the question is not related to this project data.

// === PROJECT DATA ===

// SPORTS AVAILABLE (${sports.length}):
// ${sports.map(s => `- ${s.sportName} (Max Players: ${s.maxPlayers})`).join("\n")}

// ACTIVE TEAMS (${teams.length}):
// ${teams.map(t => `- ${t.teamName} | Sport: ${t.sportsId?.sportName} | Players: ${t.playersCount}`).join("\n")}

// UPCOMING MATCHES (${matches.length}):
// ${matches.map(m => `- ${m.matchName} | Sport: ${m.sportsId?.sportName} | Date: ${new Date(m.matchDate).toLocaleDateString("en-IN")} | Time: ${m.matchTime} | Venue: ${m.venue} | Teams: ${m.teamId?.map(t => t.teamName).join(" vs ")}`).join("\n")}

// ACTIVE PLAYERS (${players.length}):
// ${players.map(p => `- ${p.playerName} | Jersey: #${p.jerseyNumber} | Position: ${p.position} | Age: ${p.age} | Team: ${p.teamId?.teamName}`).join("\n")}

// === END PROJECT DATA ===

// User Question: ${message}


const projectContext = `You are a Sports Assistant. Date: ${new Date().toLocaleDateString("en-IN")}. Answer from PROJECT DATA first, then general sports knowledge.
LANGUAGE: Default English. If user writes Hinglish (Hindi in Roman script), reply in Hinglish. NEVER use Devanagari script.
Keep answers SHORT (3-4 lines max).

PROJECT DATA:
Sports: ${sports.map(s => s.sportName).join(", ")}
Teams: ${teams.map(t => `${t.teamName}(${t.sportsId?.sportName})`).join(", ")}
Matches: ${matches.map(m => `${m.matchName} on ${new Date(m.matchDate).toLocaleDateString("en-IN")} at ${m.venue}`).join(" | ")}
Players: ${players.map(p => `${p.playerName}(${p.teamId?.teamName},#${p.jerseyNumber},${p.position})`).join(", ")}

User: ${message}

Instructions:
- If the question is about this project (matches, teams, sports, players), answer ONLY from the project data above.
- If the question is general sports knowledge (rules, history, famous players, teams, tournaments, records, etc), answer from your own knowledge freely.
- Keep answers SHORT and CONCISE — maximum 3-4 lines. Never dump full lists unless specifically asked. If asked for a list, give names only — no extra details unless asked.
- LANGUAGE RULE: By default always reply in English. If the user writes in Hinglish (Hindi words in Roman script like "kya chal rha", "sab btao"), then switch to Hinglish and stay in Hinglish for the rest of conversation. NEVER use Hindi Devanagari script (क ख ग) under any circumstance. Follow the user's language — English by default, Hinglish when user uses it.
- Never make up project data that is not in the context above.
`

    // const result = await ai.models.generateContent({
    //   model: "gemini-1.5-flash-latest",
    //   contents: projectContext
    // })

    // const reply = result.text?.trim()




    // const result = await ai.models.generateContent({
    // model: "gemini-3.1-flash-lite",
    // contents: projectContext
    // })

    // const reply = result.text?.trim()

    // return res.json({ success: true, data: { reply } })



  let result
  let retries = 3

  while (retries > 0) {
    try {
        result = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: projectContext
        })
        break
    } catch (retryErr) {
        retries--
        if (retries === 0) throw retryErr
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

const reply = result.text?.trim()

return res.json({ success: true, data: { reply } })



  } catch (err) {
    console.error("ChatBot error:", err)
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
}
