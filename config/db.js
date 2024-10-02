const mongoose = require("mongoose");

const connectToMongodb = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Mongodb connected succsee")).catch((err)=>console.log("error in mongodb",err));
}
module.exports = connectToMongodb