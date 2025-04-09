import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuthenticated=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return res.status(402).json({message:"Not authorized", success:false});
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRECT);
        req.user=await User.findById(decoded.id).select("-password");
        if(!req.user){
            return res.status(401).json({message:"User not found", success:false});
        }
        next();
    } catch (error) {
       console.log("Error in authentication", error); 
    }
}