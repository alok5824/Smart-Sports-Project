const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: "MatchModel", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },

  // Number of seats booked
  seatsBooked: { type: Number, default: 1 },

  // Specific seat identifiers, e.g., ["A1", "A2", "B1"]


  // Optional: store price per seat row for audit
  seatsDetail: [
    {
      rowName: { type: String },
      seatNumbers: [{ type: Number }],
      price: { type: Number }
    }
  ],

  totalAmount: { type: Number, default: 0 },
  transactionId: { type: String, default: "" },

  paymentMode: { type: String, enum: ["Upi", "Card", "Cash"], default: "Upi" },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  status: { type: String, enum: ["Confirmed", "Cancelled"], default: "Confirmed" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BookingModel", BookingSchema);
