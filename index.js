const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToMongodb = require("./config/db");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
connectToMongodb();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false 
}));

//routes
app.get("/",(req,res)=>{
    res.send("Hello world")
})


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)


//private route


app.listen(PORT, () => console.log(`server running on port ${PORT}`));