const mongoose = require("mongoose")

const AnnouncmentSchema = mongoose.Schema({
  leagueName: { type: String, required: true },
  venue: { type: String, required: true },

  sportsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SportModel",
    required: true
  },

  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  lastApplyDate: { type: Date, required: true },

  maxTeams: { type: Number, required: true },

  description: { type: String, default: "" },
  image:{type:String,default:""},
  status: {
    type: String,
    enum: ["Upcoming", "Open", "Closed", "Completed"],
    default: "Upcoming"
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AnnouncmentModel", AnnouncmentSchema);
