const express = require("express")
const helmet = require('helmet');
const router = require('./routes/route')
const cors = require("cors")
const app = express();
app.use(express.json())

app.use(helmet())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(router)
app.listen(3001,()=>{
    console.log("Working on http://localhost:3001")
})