const User = require("../../models/User");
const Ques = require('../../models/question');

const getCode = async (req, res) => {
  
    const uid = req.body.uid;    
    const qn_id = req.body.qn_id;    
    console.log("User id is:- " + uid);
    console.log("Qn id is:- " + qn_id);

    if (!uid || !qn_id ) {
        return res.status(400).json({ error: "Question Not Found" });
    }
    
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const question = await Ques.findOne({ _id: qn_id });
    if (!question) return res.status(404).json({ error: "Question not found" });

    const solvedQn = await user.solvedQuestions.find((q)=> q.question.toString() === qn_id.toString())
    
    return res.status(200).json({ html_sol: solvedQn.html_sol, css_sol : solvedQn.css_sol  });
    
};
module.exports = getCode;