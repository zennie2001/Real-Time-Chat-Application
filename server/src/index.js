import express from "express";
import 'dotenv/config'
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";

const app = express()
app.use(express.json())

const port = process.env.PORT

app.use("/api/auth", authRouter)

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
    connectDB();
})