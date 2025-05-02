const QuestionSchema = require("../models/question");

const uploadQuestion = async (req, res) => {
  try {
    const {qNo, title, difficulty, description, colors, imageUrl } = req.body;

    if (!qNo, !title || !difficulty || !description || !colors || !imageUrl) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const schema = await QuestionSchema.create({
      qNo,
      title,
      difficulty,
      description,
      colors,
      imageUrl,
    });
    schema.save();
    return res.status(201).json({ message: "Question uploaded successfully." });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Server error. Try again later." });
  }
};
module.exports = uploadQuestion;