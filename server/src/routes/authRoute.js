import express from "express"

const authRouter = express.Router()

authRouter.get("/signup", (req, res)=>{
    res.send("signup route")
})
authRouter.get("/login", (req, res)=>{
    res.send("login route")
})
authRouter.get("/logout", (req, res)=>{
    res.send("logout route")
})


export default authRouter;