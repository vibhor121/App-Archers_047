
const jwt=require('jsonwebtoken')
const key="$#1234@*"
const userModel=require('../models/userModel')
const blackList=new Set()
const auth=async(req,res,next)=>{
    const header=req.headers.authorization
    if(!header){
        return res.status(401).json({message:'Invalid headers'})
    }
    const token=header.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'Invalid token'})
    }
    if(blackList.has(token)){
        return res.status(401).json({message:'This token is blacklisted'})
    }
    try{
        const decode=jwt.verify(token,key)
        if(!decode){
            return res.status(401).json({message:'The token is not verified'})
        }
        req.user=await userModel.findOne({email:decode.email})
        if(!req.user){
            return res.status(401).json({message:'Unauthorized access'})
        }
        next()
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
}
module.exports=auth
