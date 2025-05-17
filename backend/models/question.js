const mongoose = require("mongoose")
const connection = require("../utils/db")
connection()
const QuestionSchema = mongoose.Schema({
    qNo:{
        type: Number,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    difficulty: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    colors: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    html_sol: {
        type: String,
        default: "",
    },
    css_sol: {
        type: String,
        default: "",
    },
    solved: {
        type: Boolean,
        default: false
    }
}) 
module.exports = mongoose.model("QuestionSchema",QuestionSchema)