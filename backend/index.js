import express from "express";


const app = express();

const PORT = 8080;

app.get("/",(req,res) =>{
    res.send("E-Commerce Backend Server is Running");
});


app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
    
});