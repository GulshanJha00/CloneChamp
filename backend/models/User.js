// models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  solvedQuestions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionSchema"
    },
    html_sol: { type: String, default: "" },
    css_sol: { type: String, default: "" },
    solved: { type: Boolean, default: false }
  }]
});


module.exports = mongoose.model("User", UserSchema);
