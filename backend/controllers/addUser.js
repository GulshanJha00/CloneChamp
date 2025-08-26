const User = require("../models/User");
const { nanoid } = require("nanoid");

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

     const adjectives = ["happy", "cool", "brave", "silent"];
    const animals = ["tiger", "panda", "lion", "wolf"];

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];
    const unique = nanoid(5);

    const username = `${adj}-${animal}-${unique}`;


    const UserSchema = await User.create({
      uid,
      username,
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
