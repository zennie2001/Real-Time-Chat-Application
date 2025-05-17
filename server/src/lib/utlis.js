import jwt from "jsonwebtoken"
import "dotenv/config"

const createToken = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"2d" //shows in 2 days login will be expires
    })
}

//sending token in the form of cookie
res.cookie("jwt", token , {
    maxAge: 2 * 24 * 60 * 60 * 1000, //in millisecond 
    httpOnly: true, //
    sameSite: "strict", 
})
