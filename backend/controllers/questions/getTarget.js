const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");
const redis = require("../../utils/redis");

const getTarget = async (req, res) => {
  try {

    const target_title = req.body.title;

    if (!target_title) {
      return res.status(400).json({ error: "Title required" });
    }

    const cacheKey = `question:target:${target_title}`;

    const cached = await redis.get(cacheKey);

    if (cached) {
      logger.info("Target question served from Redis", {
        title: target_title
      });

      return res.status(200).json(JSON.parse(cached));
    }

    const question = await QuestionSchema.findOne({ title: target_title }).lean();

    if (!question) {
      logger.warn("Target question not found", {
        title: target_title
      });

      return res.status(404).json({
        error: "Question not found."
      });
    }

    // ✅ store cache
    await redis.set(
      cacheKey,
      JSON.stringify(question),
      "EX",
      3600
    );

    logger.info("Fetched target question from DB", {
      title: target_title
    });

    return res.status(200).json(question);

  } catch (err) {

    logger.error("Error fetching target question", {
      route: "getTarget",
      message: err.message
    });

    return res.status(500).json({
      error: "Failed to fetch questions."
    });
  }
};

module.exports = getTarget;