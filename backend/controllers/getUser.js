const UserSchema = require("../models/User");

const getUser = async (req, res) => {
  try {
    
    const {uid} = req.body;
    const schema = await UserSchema.findOne({uid});

    const htmlCode = schema.htmlCode
    const cssCode = schema.cssCode
    const status = schema.status

    res.status(500).send({htmlCode,cssCode,status})


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};
module.exports = getUser;