const QuestionSchema = require("../../models/question");

const getQuestion = async (req, res) => {
  try {
    
    const questions = await QuestionSchema.find({}).lean(); //lean plain js return karega rather than mongoose object

    return res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};
module.exports = getQuestion;