const express = require("express");
const router = express.Router();
const aiController = require("../apis/AI/aiController");

// POST /ai/predict-attendance
router.post("/predict-attendance", async (req, res) => {
  try {
    const { matchDate, matchTime, matchName } = req.body;

    if (!matchDate || !matchTime || !matchName) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const result = await aiController.predictAttendance({ matchDate, matchTime, matchName });
    res.json({ success: true, data: result });

  } catch (err) {
    console.error("predictAttendance error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});



// aiRoutes.js
// router.post("/suggest-match-from-db", async (req, res) => {
//   try {
//     const { userId } = req.body;

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         error: "userId is required"
//       });
//     }

//     const result = await aiController.suggestMatchFromDB(userId);

//     res.json({ success: true, data: result });

//   } catch (err) {
//     console.error("suggestMatchFromDB error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// });



router.post("/get-matches-by-sport", aiController.getMatchesBySport)

router.post("/chatbot", aiController.chatBot)




module.exports = router;
