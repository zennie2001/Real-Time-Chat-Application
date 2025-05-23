import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import messageRouter from "./routes/messageRoue.js";

const app = express()
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT

app.use("/api/auth", authRouter)
app.use("api/message", messageRouter)

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
    connectDB();
})