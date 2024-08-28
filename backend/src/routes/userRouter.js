
const {Router}=require('express')
const userRouter=Router()
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt=require('jsonwebtoken');
const auth = require('../middleware/auth');
const key="$#1234@*"
userRouter.post('/register',async(req,res)=>{
    const {email,password}=req.body
    try{
        const check=await userModel.findOne({email:email})
        if(check){
            return res.status(400).json({message:"Already an existing user. Try logging in"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.status(401).json({message:'An error occurred while signing up'})
            }
            const user=await userModel.create({
                email:email,
                password:hash,
            })
            return res.status(201).json({message:'Signup successful. Redirecting you to login page...'})
        })
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const check=await userModel.findOne({email:email})
        if(!check){
            return res.status(400).json({message:'User not found. Try signing up'})
        }
        bcrypt.compare(password, check.password, async(err, result)=>{
            if(err){
                return res.status(401).json({message:'An error occurred while verifying the password'})
            }
            if(result){
                const payload={email:check.email}
                jwt.sign(payload,key,(err,token)=>{
                    if(err){
                        return res.status(401).json({message:"Could not log you in"})
                    }
                    return res.status(200).json({message:'Please wait while we log you in',token:token})
                })
            }else{
                return res.status(400).json({message:'Email address and password do not match'})
            }
        });
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
// userRouter.get('/all',async(req,res)=>{
//     try{
//         const user=await userModel.find({role:{$ne:roles.admin}})
//         return res.status(200).send(user)
//     }catch(err){
//         return res.status(500).json({message:'Internal server error'})
//     }
// })
// userRouter.patch('/update-role/:id',async(req,res)=>{
//     const {id}=req.params
//     const {role}=req.body
//     try{
//         const user=await userModel.findByIdAndUpdate(id,{role:role},{new:true});
//         if(!user){
//             return res.status(404).json({message:'User not found'});
//         }
//         return res.status(200).json({message:'Role updated successfully'});
//     }catch(err){
//         return res.status(500).json({message:'Internal server error'});
//     }
// });
userRouter.get('/logout',auth,async(req,res)=>{
    try{
        return res.status(200).json({message:'Logging out...'})
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
module.exports=userRouter
