// controllers/userController.js
const User = require("../models/User");

const checkOrCreateUser = async (req, res) => {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json({ error: "UID is required" });
  }
  console.log("Coming to register")


  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid });
      await user.save();
      return res.status(201).json({ message: "User created", user });
    }

    return res.status(200).json({ message: "User already exists", user });
  } catch (err) {
    console.error("Error in user check/create:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = checkOrCreateUser;
