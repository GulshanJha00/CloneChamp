const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");

const uploadQuestion = async (req, res) => {
  try {
    const {qNo, title, difficulty, description, colors, imageUrl } = req.body;

    if (!qNo || !title || !difficulty || !description || !colors || !imageUrl) {
      logger.warn("Upload question validation failed", {
        body: req.body
      });

      return res.status(400).json({
        error: "All fields are required."
      });

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
    logger.info("Question uploaded", {
      qNo,
      title
    });
    return res.status(201).json({ message: "Question uploaded successfully." });
  } catch (err) {
      logger.error("Error uploading question", {
      route: "uploadQuestion",
      message: err.message,
      stack: err.stack
    });

    return res.status(500).json({ error: "Server error. Try again later." });
  }
};
module.exports = uploadQuestion;