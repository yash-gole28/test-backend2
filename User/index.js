import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './Routes/index.js'
import { connect } from 'nats' 


const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
dotenv.config()

app.get('/hello',async(req , res)=>{
    const completedTaskEvent = {
        eventType :'TASK_COMPLETED',
        // taskId : taskId,
        // userID :userID,
        comoletedAt :new Date().toISOString()
    }
    try{
        await publishEvent('TASK_COMPLETED',JSON.stringify(completedTaskEvent))
    }catch(error){
        console.error("error publishing event :",error)
    }
    res.status(201).json({success:true})
})

app.get('/',function(req , res){
res.send('server initiated')
})


// const natsOptions = {
//     servers: ['nats://localhost:4222'],
//   };
  
//   const handleTaskCompletedEvent = (msg) => {
//     const eventData = JSON.parse(msg.data);
//     console.log(`User completed task ${eventData.taskId} at ${eventData.completedAt}`);
//   };
  
//   const subscribeToTaskCompletedEvent = async () => {
//     try {
//       const nc = await connect(natsOptions);
//       console.log('Connected to NATS server.');
//       const subscription = nc.subscribe('TASK_COMPLETED', (err, msg) => {
//         try {
//           handleTaskCompletedEvent(msg);
//           console.log('Received TASK_COMPLETED event');
//         } catch (error) {
//           console.error('Error handling TASK_COMPLETED event:', error);
//         }
//       });
//       // subscription.unsubscribe();
//     } catch (error) {
//       console.error('Error connecting to NATS server:', error);
//     }
//   };
  
//   subscribeToTaskCompletedEvent().catch((err) => {
//     console.error('Error:', err.message);
//   });

app.use('/api/v1',router)



mongoose.connect(process.env.MONGOURL).then(console.log('MongoDb connected'))
app.listen(8001,()=>console.log('Auth backend started at port 8001'))