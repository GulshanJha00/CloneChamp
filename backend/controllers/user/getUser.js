const UserSchema = require("../../models/User");
const logger = require("../../utils/logger");

const getUser = async (req, res) => {

  try {

    const { uid } = req.body;

    if (!uid) {

      logger.warn("UID missing in getUser", {
        body: req.body
      });

      return res.status(400).json({
        error: "UID is required"
      });

    }

    const user = await UserSchema.findOne({ uid });

    if (!user) {

      logger.warn("User not found in getUser", {
        uid
      });

      return res.status(404).json({
        error: "User not found"
      });

    }

    logger.info("User fetched successfully", {
      uid
    });

    return res.status(200).json(user);

  } catch (err) {

    logger.error("Error in getUser", {
      route: "getUser",
      message: err.message,
      stack: err.stack
    });

    return res.status(500).json({
      error: "Server error"
    });

  }

};

module.exports = getUser;