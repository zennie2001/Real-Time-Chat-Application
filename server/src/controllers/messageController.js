import cloudinary from "../lib/cloudinary.js";
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

const getMessages = async (req , res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = await messageModel.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getMessage Controller", error.message);
         res.status(500).json({message:"Internal Server"})
    }
}


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

        //todo:realtime funtionality => socket.io

        res.status(201).json(newMessage)

    } catch (error) {
         console.log("Error in sendMessage controller", error.message);
    res.status(500).json({message:"Internal Server Error"})
    }
}


export {getUserForSidebar, getMessages, sendMessage}