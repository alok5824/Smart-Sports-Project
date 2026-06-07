const mongoose = require("mongoose")

const PlayerSchema = mongoose.Schema({
    playerName: { type: String, default: "" },
    age: { type: Number, default: 0 },
    position: { type: String, default: "" },
    jerseyNumber: { type: Number, default: 0 },
    photo: { type: String, default: "" },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "TeamModel", required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("PlayerModel", PlayerSchema)