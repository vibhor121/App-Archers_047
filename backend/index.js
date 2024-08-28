
const express=require('express')
// const taskRouter = require('./src/routes/taskRouter')
const auth = require('./src/middleware/auth')
const userRouter = require('./src/routes/userRouter')
const connectDB = require('./src/configs/mongoose')
const app=express()
app.use(express.json())
const cors=require('cors')
app.use(cors())
app.use('/user',userRouter)
// app.use('/task',auth,taskRouter)
const port=3000
// const url=""
app.listen(port,async()=>{
    try{
        await connectDB(url)
        console.log(`server is running on http://localhost:${port}`)
    }catch(err){
        console.log(err)
    }
})
