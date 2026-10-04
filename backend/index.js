import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import route from "./router/userRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config()


const app = express();

connectDB()

app.use(cookieParser())
app.use(express.json())

app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true,
    }))

app.use("/api/v1/user",route)


const PORT = process.env.PORT ||3000;

app.get("/",(req,res) =>{
    res.send("E-Commerce Backend Server is Running");
});


app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    
});

