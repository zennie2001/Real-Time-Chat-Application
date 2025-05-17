import bcrypt from "bcryptjs"
import userModel from "../models/userModel.js";

const signup = async (req , res) =>{
try {

    const {name, email, password} = req.body;

    //checking user already exists or not
    const exists = await userModel.findOne({email})
    if(exists){
        return res.status(400).json({ message:"User already exists!"})
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
        //
    }else{

    }

    
} catch (error) {
    
}
   
}

const login = async (req , res) =>{

   
}

const logout = async (req , res) =>{

   
}

export {login, signup, logout}