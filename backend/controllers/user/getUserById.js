const UserSchema = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

const getUserById = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "UID is required" });
    }
    console.log(username)

    const user = await UserProfile.findOne({ username }); 
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
module.exports = getUserById;