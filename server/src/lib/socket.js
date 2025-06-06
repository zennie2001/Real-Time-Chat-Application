import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: ["https://real-time-chat-application-ashy.vercel.app",
                "https://real-time-chat-application-cy2bg6w7z-zennie2001s-projects.vercel.app",
                 "http://localhost:5173"]
    }
})

//this function resturn socket.id when userId is passed
export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

//used to store online users
const userSocketMap = {};//{userId: socketId}

io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
        
    })
    
})

export {io, app, server}