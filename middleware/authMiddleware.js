const User=require("../model/UserModel");
const JWT=require("jsonwebtoken");

const auth=async(req,res,next)=>{

    try {
        const {token}=req.cookies;

        if (!token){
            return res.status(401).json({
                message:"Please Login First"
            })
        }

        

        const decoded = JWT.verify(token, process.env.SECRECT_TOKEN)

        req.user = decoded.user;

        next()

    } catch (error) {
        res.status(401).json({ message: "Token not valid" })
        console.log(error.message)
    }


   
}

module.exports=auth