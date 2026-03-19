const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");

const updateUser = async (req, res) => {
  const { value } = req.params;
  const { tempValue, username } = req.body;

  try {
    // USERNAME UPDATE
    if (value === "username") {
      const exists = await User.findOne({ username: tempValue });
      if (exists)
        return res.status(402).json({ message: "Username already exists" });

      const updatedUser = await User.findOneAndUpdate(
        { username },
        { username: tempValue },
        { new: true }
      );

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      return res.json({
        message: "Username updated successfully",
        user: updatedUser,
      });
    }

    // NAME UPDATE (inside User)
    if (value === "name") {
      const updatedUser = await User.findOneAndUpdate(
        { username },
        { name: tempValue },
        { new: true }
      );

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      return res.json({
        message: "Name updated successfully",
        user: updatedUser,
      });
    }

    // OTHER FIELDS (bio, socials, contact etc → inside UserProfile)
    const foundUser = await User.findOne({ username });

    if (!foundUser) return res.status(404).json({ message: "User not found" });

    let updateData = {};

    if (value.startsWith("socials.")) {
      const socialField = value.split(".")[1]; // github, linkedin, portfolio
      updateData = { [`socials.${socialField}`]: tempValue };
    } else if (value.startsWith("contact.")) {
      const contactField = value.split(".")[1];
      updateData = { [`contact.${contactField}`]: tempValue };
    } else {
      updateData = { [value]: tempValue };
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: foundUser._id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedProfile)
      return res.status(404).json({ message: "Profile not found" });

    return res.json({
      message: `${value} updated successfully`,
      profile: updatedProfile,
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = updateUser;
