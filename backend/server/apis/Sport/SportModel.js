const mongoose = require("mongoose")
const SportSchema = mongoose.Schema({
  sportName: { type: String, default: "" },
  description: { type: String, default: "" },
 image: { type: String, default: "" },
  maxPlayers: { type: Number, default: 11 },
  matchDuration: { type: Number, default: 90 }, // in minutes
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("SportModel", SportSchema);