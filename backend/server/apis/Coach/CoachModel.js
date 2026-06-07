const mongoose = require("mongoose")

const CoachSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
  organisationName: { type: String, default: "" },
  sportsId: { type: mongoose.Schema.Types.ObjectId, ref: "SportModel" },
  experience: { type: Number, default: 0 },
  bio: { type: String, default: "" },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CoachModel", CoachSchema)
