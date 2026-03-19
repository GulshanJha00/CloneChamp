const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

const getUserById = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find UserProfile linked to that user
    const userProfile = await UserProfile.findOne({ user: user._id }).populate(
      "user"
    );

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getUserById;
