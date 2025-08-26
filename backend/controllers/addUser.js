const User = require("../models/User");

const addUser = async (req, res) => {
  try {
    const { uid, name, email } = req.body;
    if (!uid || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists." });
    }
    const UserSchema = await User.create({
      uid,
      name,
      email,
    });
    UserSchema.save();
    return res.status(201).json({ message: "User Added Successfully." });
  } catch (error) {
    return res.status(400).json({ message: "Error while saving user" });
  }
};
module.exports = addUser;
