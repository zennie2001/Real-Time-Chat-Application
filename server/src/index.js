import express from "express";
import authRouter from "./routes/auth.route";

const app = express()

app.use("/api/auth", authRouter)

app.listen(5001, ()=>{
    console.log("Server is running on port 5001");
    
})