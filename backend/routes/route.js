const express = require("express")
const uploadQuestion = require("../controllers/uploadQuestion")
const getQuestion = require("../controllers/getQuestion")
const deleteQuestion = require("../controllers/deleteQuestion")

const router = express.Router()
router.post("/api/upload-question",uploadQuestion)
router.get("/api/get-question",getQuestion)
router.delete("/api/delete-question/:id",deleteQuestion)



module.exports =  router