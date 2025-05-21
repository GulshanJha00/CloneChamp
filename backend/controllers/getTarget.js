const QuestionSchema = require("../models/question");

const getTarget = async (req, res) => {
  try {
    const target_title = req.body.title;    
    const uid = req.body.uid;    
    const questions = await QuestionSchema.find({title:target_title});
    return res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};
module.exports = getTarget;