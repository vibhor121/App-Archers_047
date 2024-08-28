
const {Schema,model}=require('mongoose')
const userSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})
const userModel=model('pollingUser',userSchema)
module.exports=userModel
