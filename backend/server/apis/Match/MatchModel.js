const mongoose = require("mongoose");

/* ================= Row Schema ================= */
const SeatRowSchema = new mongoose.Schema({
  rowName: {
    type: String,        // A, B, C
    required: true
  },
  price: {
    type: Number,        // price per seat in this row
    required: true
  },
  seats: {
    type: Number,        // total seats in this row
    required: true
  },
   bookedSeats: [{ type: Number, default: [] }]
});

/* ================= Match Schema ================= */
const MatchSchema = new mongoose.Schema({
  sportsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SportModel",
    required: true
  },

  teamId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamModel",
      required: true
    }
  ],

  matchName: {
    type: String,
    required: true
  },

  matchDate: {
    type: Date,
    required: true
  },

  matchTime: {
    type: String,
    required: true
  },

  venue: {
    type: String,
    required: true
  },

  /* 🔥 IMPORTANT PART */
  seatLayout: {
    type: [SeatRowSchema],   // multiple rows
    required: true
  },

  
  // availableSeats: {
  //   type: Number,
  //   required: true
  // },
 
    leagueId:{type: mongoose.Schema.Types.ObjectId, ref: "AnnouncmentModel", required: true},

  status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("MatchModel", MatchSchema);
