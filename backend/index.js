
const express=require('express')
const auth = require('./src/middleware/auth')
const userRouter = require('./src/routes/userRouter')
const connectDB = require('./src/configs/mongoose')
const app=express()
app.use(express.json())
const cors=require('cors')
const quizRouter = require('./src/routes/quizRouter')
app.use(cors())
app.use('/user',userRouter)
app.use('/quiz',auth,quizRouter)
const port=3000
const url="mongodb+srv://test:test@cluster0.co3xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.listen(port,async()=>{
    try{
        await connectDB(url)
        console.log(`server is running on http://localhost:${port}`)
    }catch(err){
        console.log(err)
    }
})
