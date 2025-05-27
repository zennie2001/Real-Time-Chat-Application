import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, //linking message model to user model
        ref: "user",  //This ObjectId refers to a document in the User collection.
        required : true
    },
    reciverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required : true
    },
    text:{
        type: String
    },
    image:{
        type: String
    },

}, {timestamps: true})

const messageModel = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default messageModel;