import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userModel from '../models/userModel.js'

const protectRoute = async (req , res , next)=>{

    try {
        const token = req.cookies.jwt 

        if(!token){
            return res.status(401).json({message:"Unauthorized- No token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid Token"})

        }

        const user = await userModel.findById(decoded.userId).select("-password")

        if(!user){
             return res.status(404).json({message:"User not found"})
        }

        req.user = user
        next()
        
    } catch (error) {
        console.log("Error in middleare", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
}

export default protectRoute;