const mongoose = require("mongoose")

const MatchApplicationSchema = mongoose.Schema({
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel", required: true },
  sportsId: { type: mongoose.Schema.Types.ObjectId, ref: "SportModel", required: true },
  leagueId:{type: mongoose.Schema.Types.ObjectId, ref: "AnnouncmentModel", required: true},
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("MatchApplicationModel", MatchApplicationSchema);