// controllers/userController.js
const User = require("../../models/User");
const logger = require("../../utils/logger");

const checkOrCreateUser = async (req, res) => {
  const { uid } = req.body;
  if (!uid) {
    logger.warn("UID missing in checkOrCreateUser", {
      body: req.body,
    });
    return res.status(400).json({ error: "UID is required" });
  }

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid });
      await user.save();
      logger.info("User created", {
        uid: user.uid,
        id: user._id,
      });
      return res.status(201).json({ message: "User created", user });
    }
    logger.info("User already exists", {
      uid: user.uid
    });

    return res.status(200).json({ message: "User already exists", user });
  } catch (err) {
    logger.error("Server error", {
      route: "checkOrCreateUser",
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = checkOrCreateUser;
