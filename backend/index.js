import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"


dotenv.config()


const app = express();

connectDB()

dotenv.config();
const PORT = process.env.PORT ||3000;

app.get("/",(req,res) =>{
    res.send("E-Commerce Backend Server is Running");
});


app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    
});