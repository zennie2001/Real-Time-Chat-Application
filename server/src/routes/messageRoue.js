import express from "express"
import protectRoute from "../middlewares/auth.js";
import { getMessages, getUserForSidebar, sendMessage } from "../controllers/messageController.js";

const messageRouter = express.Router()

messageRouter.get("/users", protectRoute, getUserForSidebar )
messageRouter.get("/:id", protectRoute, getMessages)
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;