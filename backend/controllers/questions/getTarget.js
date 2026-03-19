const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");

const getTarget = async (req, res) => {
  try {
    const target_title = req.body.title;    
    const questions = await QuestionSchema.find({title:target_title});

    if (!question) {
      logger.warn("Target question not found", {
        title: target_title
      });

      return res.status(404).json({
        error: "Question not found."
      });
    }
    logger.info("Fetched target question", {
      title: target_title
    });

    return res.status(200).json(questions);
  } catch (err) {
    logger.error("Error fetching target question", {
      route: "getTarget",
      message: err.message,
      stack: err.stack
    });
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};
module.exports = getTarget;