const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");

const getQuestion = async (req, res) => {
  try {
    
    const questions = await QuestionSchema.find({}).lean(); //lean plain js return karega rather than mongoose object


    logger.info("Fetched all questions", {
      count: questions.length
    });

    return res.status(200).json(questions);
  } catch (err) {
    
    logger.error("Error fetching questions", {
      route: "getQuestion",
      message: err.message,
      stack: err.stack
    });

    res.status(500).json({ error: "Failed to fetch questions." });
  }
};
module.exports = getQuestion;