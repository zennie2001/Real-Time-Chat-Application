import express from "express";
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./lib/db.js";
import messageRouter from "./routes/messageRoue.js";
import cors from "cors";
import { app , server} from "./lib/socket.js";
import path from "path"


app.use(express.json());
app.use(cookieParser());



app.use(cors({
   origin:"http://localhost:5173" ,
   credentials: true,

}))

const port = process.env.PORT
const __dirname = path.resolve()

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}

app.get('/', (req, res)=>{
    res.send('API is working')
})

server.listen(port, ()=>{
    console.log("Server is running on port " + port);
    connectDB();
})