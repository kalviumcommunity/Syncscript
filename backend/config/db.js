const mongoose = require("mongoose")
require("dotenv").config();

async function MongoConnection() {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected successfully")
    }catch(err){
        console.log(err);
    }
}

module.exports = MongoConnection;