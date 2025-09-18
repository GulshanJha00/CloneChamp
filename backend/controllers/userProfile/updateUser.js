const UserSchema = require("../../models/UserProfile");
const User = require("../../models/User");

const updateUser = async (req, res) => {
  const { value } = req.params;
  const { tempValue, username } = req.body;

  console.log("Inside backend update:", value, tempValue, username);

  try {
    let updatedUser;

    if(value === "username"){
      const foundUser = await User.findOne({ username: tempValue });
      if (foundUser)
        return res.status(402).json({ message: "User Exist" });
      updatedUser = await User.findOneAndUpdate(
        { username },
        { [value]: tempValue },
        { new: true }
      );
    }

    if (value === "name") {
      updatedUser = await User.findOneAndUpdate(
        { username },
        { [value]: tempValue },
        { new: true }
      );
    } else {
      const foundUser = await User.findOne({ username });
      if (!foundUser)
        return res.status(404).json({ message: "User not found" });
      console.log(foundUser);
      updatedUser = await UserSchema.findOneAndUpdate(
        { user: foundUser._id }, // match by ObjectId reference
        { $set: { [value]: tempValue } }, // update dynamic field
        { new: true }
      );
      console.log(updatedUser);
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `${value} updated successfully`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
module.exports = updateUser;
