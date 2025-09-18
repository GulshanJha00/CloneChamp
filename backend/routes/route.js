const express = require("express")
const uploadQuestion = require("../controllers/questions/uploadQuestion")
const getQuestion = require("../controllers/questions/getQuestion")
const deleteQuestion = require("../controllers/questions/deleteQuestion")
const getTarget = require("../controllers/questions/getTarget")
const getSolution = require("../controllers/questions/getSolution")
const checkOrCreateUser = require("../controllers/user/checkOrCreateUser");
const getUser = require("../controllers/user/getUser")
const getCode = require("../controllers/questions/getCode")
const addUser = require("../controllers/user/addUser")
const getUserById = require("../controllers/user/getUserById")
const updateUser = require("../controllers/userProfile/updateUser")
const router = express.Router()

//question routes

router.post("/api/upload-question",uploadQuestion)
router.post("/api/get-target",getTarget)
router.post("/api/get-solution",getSolution)
router.post("/api/user/check-or-create", checkOrCreateUser);
router.post("/api/get-code", getCode);

//user route
router.post("/auth/get-user", getUser);
router.post("/auth/add-user",addUser);
router.post("/auth/get-user-id",getUserById);


//get routes

router.get("/api/get-question",getQuestion)
router.delete("/api/delete-question/:id",deleteQuestion)


//userProfile Route
router.put("/user/:value",updateUser)


module.exports =  router