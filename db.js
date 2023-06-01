const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./CONFIG.env"})
const mongoURI = process.env.MONGO_URI

try{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    console.log("Connection Established.")
}
catch(err){
    console.log("=== ERROR === -> "+err.message)
}