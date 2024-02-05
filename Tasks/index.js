import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './Routes/index.js'



const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
dotenv.config()

// app.get('/hello',async(req , res)=>{
//     const completedTaskEvent = {
//         eventType :'TASK_COMPLETED',
//         comoletedAt :new Date().toISOString()
//     }
//     try{
//         await publishEvent('TASK_COMPLETED',JSON.stringify(completedTaskEvent))
//     }catch(error){
//         console.error("error publishing event :",error)
//     }
//     res.status(201).json({success:true})
// })



app.get('/',function(req , res){
res.send('server initiated')
})

app.use('/api/v1',router)

mongoose.connect(process.env.MONGOURL).then(console.log('MongoDb connected'))
app.listen(8000,()=>console.log('Task backend started at port 8000'))