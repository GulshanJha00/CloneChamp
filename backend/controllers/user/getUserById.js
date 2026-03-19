const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");
const logger = require("../../utils/logger");

const getUserById = async (req, res) => {

  try {

    const { username } = req.body;

    if (!username) {

      logger.warn("Username missing in getUserById", {
        body: req.body
      });

      return res.status(400).json({
        error: "Username is required"
      });

    }

    const user = await User.findOne({ username });

    if (!user) {

      logger.warn("User not found in getUserById", {
        username
      });

      return res.status(404).json({
        error: "User not found"
      });

    }

    const userProfile = await UserProfile
      .findOne({ user: user._id })
      .populate("user");

    if (!userProfile) {

      logger.warn("User profile not found", {
        userId: user._id
      });

      return res.status(404).json({
        error: "User profile not found"
      });

    }

    logger.info("User profile fetched", {
      username,
      userId: user._id
    });

    return res.status(200).json(userProfile);

  } catch (err) {

    logger.error("Error in getUserById", {
      route: "getUserById",
      message: err.message,
      stack: err.stack
    });

    return res.status(500).json({
      error: "Server error"
    });

  }

};

module.exports = getUserById;