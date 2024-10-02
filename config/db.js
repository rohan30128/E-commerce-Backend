const mongoose = require("mongoose");

const connectToMongodb = ()=>{
    mongoose.connect("mongodb+srv://rohangupta30128:CwMry6Bx9OxOqPi9@cluster0.bxket.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("Mongodb connected succsee")).catch((err)=>console.log("error in mongodb",err));
}
module.exports = connectToMongodb