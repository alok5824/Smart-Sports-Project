const express = require("express");
const router = express.Router();
const Message = require("../apis/Chat/ChatModel");
const UserModel = require("../apis/User/UserModel");
const CoachModel = require("../apis/Coach/CoachModel");


// ===============================
// ✅ ADMIN SECTION
// ===============================

// ✅ Get all approved coaches (Admin ↔ Coach)
// ✅ Get all approved coaches (Admin ↔ Coach)
router.post("/get-all-coaches", async (req, res) => {
  try {
    // Use case-insensitive regex to match "approved" regardless of casing
    const coaches = await CoachModel.find({ status: { $regex: /^approved$/i } })
      .populate({
        path: "userId",
        select: "name email contact userType profileImage"
      });

    console.log("Coaches fetched from DB:", coaches); // <-- debug log

    const formatted = coaches
      .filter(coach => coach.userId) // remove entries where userId is missing
      .map(coach => ({
        _id: coach.userId._id,
        name: coach.userId.name,
        email: coach.userId.email,
        userType: coach.userId.userType,
        profileImage: coach.userId.profileImage
      }));

    res.json({ success: true, data: formatted });

  } catch (err) {
    console.error("Error in /get-all-coaches:", err);
    res.json({ success: false, message: err.message });
  }
});



// ===============================
// ✅ COACH SECTION
// ===============================

// ✅ Get Admin (Coach ↔ Admin)
router.post("/get-admin", async (req, res) => {
  try {
    const admins = await UserModel.find({ userType: "admin" })
      .select("name email userType _id profileImage");

    res.json({
      success: true,
      data: admins
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ===============================
// ✅ COMMON CHAT SECTION
// ===============================

// ✅ Load old messages
router.post("/get-messages", async (req, res) => {
  const { userId, receiverId } = req.body;

  if (!userId || !receiverId)
    return res.json({ success: false, message: "userId & receiverId required" });

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId }
      ]
    }).sort({ createdAt: 1 });

    res.json({ success: true, data: messages });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});


// ✅ Get conversations list
router.post("/get-conversations", async (req, res) => {
  const { userId } = req.body;

  if (!userId)
    return res.json({ success: false, message: "userId required" });

  try {
    const messages = await Message.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    });

    const users = new Set();

    messages.forEach(msg => {
      if (msg.senderId.toString() !== userId)
        users.add(msg.senderId.toString());

      if (msg.receiverId.toString() !== userId)
        users.add(msg.receiverId.toString());
    });

    res.json({ success: true, data: Array.from(users) });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
