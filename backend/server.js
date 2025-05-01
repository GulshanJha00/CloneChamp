const express = require("express")
const helmet = require('helmet');

const app = express();
const connection = require("./utils/db")
app.use(helmet())
connection()

app.listen(3001,()=>{
    console.log("Working on http://localhost:3001")
})