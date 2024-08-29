const Router=require('express')
const quizRouter=Router()
const quizModel=require('../models/quizModel')
const auth = require('../middleware/auth')
quizRouter.use(auth)
quizRouter.post('/',async(req,res)=>{
    const {title,description,questionText,options,correctAnswer}=req.body
    try{
        if(!title || !description || !questionText || !Array.isArray(options) || options.length < 2  || correctAnswer===undefined){
            return res.status(400).json({message:'All fields are neccessary'})
        }
        const quiz=await quizModel.create({
            title:title,
            description:description,
            questionText:questionText,
            options:options,
            correctAnswer:correctAnswer,
            user:req.user._id
        })
        return res.status(201).json({message:'New Question created'})
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
quizRouter.get('/',async(req,res)=>{
    try{
        const quiz=await quizModel.find({user:req.user._id}).populate('user','email')
        return res.status(200).send(quiz)
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
quizRouter.post('/response/:id',async(req,res)=>{
    const {id}=req.params
    const {index}=req.body
    try{
        const question=await quizModel.findById(id)
        if(!question){
            return res.status(404).json({message:'Question not found'})
        }
        if(index===question.correctAnswer){
            return res.status(200).json({message:'Correct answer'})
        }else if(index!==question.correctAnswer){
            return res.status(200).json({message:'Wrong answer'})
        }
    }catch(err){
        return res.status(500).json({message:'Internal server error'})
    }
})
module.exports=quizRouter