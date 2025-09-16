const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  avatar: {type:String, default: ""},
  bio: { type: String, default: "" },
  skills: [{ type: String }],
  contact: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" }
  },
  socials: {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);