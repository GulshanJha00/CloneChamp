const QuestionSchema = require("../../models/question");
const logger = require("../../utils/logger");

const deleteQuestion = async (req, res) => {

  const { id } = req.params;
  try {
    const deletedQuestion = await QuestionSchema.findOneAndDelete({ qNo: id });
    if (!deletedQuestion) {
      logger.warn("Delete question failed - not found", {
        qNo: id,
        route: "deleteQuestion"
      });

      return res.status(404).json({
        message: "Question not found."
      });
    }

    logger.info("Question deleted successfully", {
      qNo: id
    });

    return res.status(200).json({
      message: "Question deleted successfully."
    });

  } catch (error) {
    logger.error("Error deleting question", {
      qNo: id,
      message: error.message,
      stack: error.stack
    });

    return res.status(500).json({
      message: "Server error while deleting question."
    });
  }
};

module.exports = deleteQuestion;