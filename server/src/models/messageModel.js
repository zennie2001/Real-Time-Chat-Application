import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    text:{
        type: String
    },
    image:{
        type: String
    },

}, {timestamps: true})

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema)

export default messageModel;