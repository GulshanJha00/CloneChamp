const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const connection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log("Error While connecting " + error)
    }
}
module.exports =  connection