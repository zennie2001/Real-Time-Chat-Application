import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";





const getUserForSidebar = async (req , res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
         console.log("Error in getUserForSidebar", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
}

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId.toString(), reciverId: userToChatId.toString() },
        { senderId: userToChatId.toString(), reciverId: myId.toString() },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;

        }

        const newMessage = new messageModel({
            senderId,
            reciverId,
            text,
            image: imageUrl,
        })

        await newMessage.save()

        //realtime funtionality => socket.io
        const receiverSocketId = getReceiverSocketId(reciverId);
        if(receiverSocketId){
          io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
         console.log("Error in sendMessage controller", error.message);
    res.status(500).json({message:"Internal Server Error"})
    }
}


export {getUserForSidebar, getMessages, sendMessage}