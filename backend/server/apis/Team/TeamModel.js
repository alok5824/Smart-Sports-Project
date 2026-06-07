const mongoose = require("mongoose")

const TeamSchema = mongoose.Schema({
  teamName: { type: String, default: "" },
  description: { type: String, default: "" },
  sportsId: { type: mongoose.Schema.Types.ObjectId, ref: "SportModel", required: true },
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  playersCount: { type: Number, default: 0 },
  logo: { type: String, default: "" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("TeamModel", TeamSchema);