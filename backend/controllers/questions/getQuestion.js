const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");
const redis = require("../../utils/redis");

const getQuestion = async (req, res) => {
  try {

    const cacheKey = "questions:all";

    const cached = await redis.get(cacheKey);

    if (cached) {
      logger.info("Questions served from Redis");
      return res.status(200).json(JSON.parse(cached));
    }

    const questions = await QuestionSchema.find({}).lean();

    await redis.set(
        cacheKey,
        JSON.stringify(questions),
        "EX",
        100
    );

    return res.status(200).json(questions);

  } catch (err) {
    logger.error("Error fetching questions", { message: err.message });
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};

module.exports = getQuestion;