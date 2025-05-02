const QuestionSchema = require("../models/question");

const deleteQuestion = async (req,res)=>{
    const {id} = req.params;
    try {
        const deletedQuestion = await QuestionSchema.findOneAndDelete({ qNo: id });
        
        if (deletedQuestion) {
          return res.status(200).json({ message: 'Question deleted successfully.' });
        } else {
          console.log("No question found with the given ID.");
          return res.status(404).json({ message: 'Question not found.' });
        }
      } catch (error) {
        console.error("Error deleting question:", error);
        return res.status(500).json({ message: 'Server error while deleting question.' });
      }
}
module.exports = deleteQuestion