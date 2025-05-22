import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";
import {createToken} from "../lib/utlis.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req , res) =>{
    const {name, email, password} = req.body;

try {
    if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
    }


    //checking user already exists or not
    const exists = await userModel.findOne({email})
    if(exists){
        return res.status(400).json({ message:"User already exists!"})
    }

    //strong password
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at leat 6 characters"})
    }

    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })

    if(newUser){
        //generate jwt token here
        createToken(newUser._id, res)
        await newUser.save();

        res.send(201).json(
            {_id:newUser._id,
             name: newUser.name,
             email: newUser.email,
             profilePic: newUser.profilePic
             })
    }else{
        res.status(400).json({message:'Invalid user data'});
    }

    
} catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({message:"Internal Server Error"})
    
}
   
}

const login = async (req , res) =>{
    const { email, password} = req.body;

    try {

        const user = await userModel.findOne({email})
        if(!user){
             return res.status(400).json({ message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ message:"Invalid credentials"})
        }

        createToken(user._id, res)

         res.send(200).json(
            {_id:user._id,
             name: user.name,
             email: user.email,
             profilePic: user.profilePic
             })


        
    } catch (error) {
         console.log("Error in login", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
   
}

const logout = async (req , res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.send(200).json({message:"Logged out successfully!"})
        
    } catch (error) {
         console.log("Error in logout", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
   
}

const updateProfile = async (req, res)=>{
    try{
        const{profilePic} = req.body
        const userId = req.user._id;

        if(!profilePic){
             return res.status(400).json({ message:"Profile Picture is required"})
        }

       const uploadResponse =  await cloudinary.uploader.upload(profilePic)
       const updateUser = await userModel.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})

       res.status(200).json(updateUser)


    }catch (error) {
         console.log("Error in update profile", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
}


const checkAuth = async (req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
                 console.log("Error in authentication", error.message);
         res.status(500).json({message:"Internal Server"})
    }
}

export {login, signup, logout, updateProfile, checkAuth}