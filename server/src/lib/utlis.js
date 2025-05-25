import { Buffer } from 'buffer';
import jwt from "jsonwebtoken"
import "dotenv/config"

export const createToken = (userId, res)=>{
    
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"2d" //shows in 2 days login will be expires
    })


    //sending token in the form of cookie
    res.cookie("jwt", token , {
        maxAge: 2 * 24 * 60 * 60 * 1000, //in millisecond 
        httpOnly: true, //prevent xss attacks cross-site scripting attacks
        sameSite: "strict",  // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;

}

 
