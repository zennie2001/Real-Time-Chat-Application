import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import messageRouter from "./routes/messageRoue.js";
import cors from "cors";
import { app , server} from "./lib/socket.js";


app.use(express.json());
app.use(cookieParser());



app.use(cors({
   origin:"http://localhost:5173" ,
   credentials: true,

}))

const port = process.env.PORT

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

app.get('/', (req, res)=>{
    res.send('API is working')
})

server.listen(port, ()=>{
    console.log("Server is running on port " + port);
    connectDB();
})