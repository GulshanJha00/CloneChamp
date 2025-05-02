const express = require("express")
const uploadQuestion = require("../controllers/uploadQuestion")
const getQuestion = require("../controllers/getQuestion")
const router = express.Router()

router.post("/api/upload-question",uploadQuestion)
router.get("/api/get-question",getQuestion)

module.exports =  router