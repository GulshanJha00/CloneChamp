const UserProfile = require("../../models/UserProfile");

const getUserById = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "UID is required" });
    }
   const userProfile = await UserProfile.findOne()
      .populate({
        path: "user", 
        match: { username },
      });
    if (!userProfile) return res.status(404).json({ error: "User not found" });
    res.json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = getUserById;