// import { json } from "express";
import TaskModal from "../Modals/Task.modal.js"
import UserModal from "../Modals/User.modal.js"
// import {connect} from 'nats'

// const natsOptions = {
//     servers:['nats://localhost:4222']
// };
// let natsConnection;

// const publishEvent = async (subject , data)=>{
//     if(!natsConnection){
//         natsConnection = await connect(natsOptions)
//         console.log("connected to nats server")
//     }

//     try{
//         natsConnection.publish(subject,data)
//         console.log("event published successfully")
//         await natsConnection.flush()

//     }catch(error){
//         console.error("error publishing event :",error)
//     }
// };


// const completedTaskEvent = {
//     eventType :'TASK_COMPLETED',
//     // taskId : taskId,
//     // userID :userID,
//     comoletedAt :new Date().toISOString()
// }
// try{
//     await publishEvent('TASK_COMPLETED',JSON.stringify(completedTaskEvent))
// }catch(error){
//     console.error("error publishing event :",error)
// }




export const AssignTask = async (req ,res)=>{
    try{
        const{Description,Priority,DueDate,completed,id,adminId}= req.body 
    const findAdmin = await UserModal.findById(adminId)

    if(!adminId)return res.status(404).json({success:false , message:"user not found"})
    if(findAdmin.type ==="admin"){
        const saveTasks = await new TaskModal({
            Description,Priority,DueDate,completed,id
        })

        await saveTasks.save()
        return res.status(200).json({success:true , message:'Task saved'})

    }else{
        return res.status(404).json({success:false , message:'only admin have rights to assign tasks'})
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:error})
       }
}

export const GetTask = async(req,res)=>{
   try{
    const{id} = req.body
    const tasks =await TaskModal.find({userID:id})
    if(!tasks)return res.status(404).json({success:false , message:"no tasks assigned"})
    return res.status(200).json({success:true , message:'your tasks',tasks})
   }catch(error){
    console.log(error)
    return res.status(500).json({success:false , message:error})
   }


}
export const SingleTask = async(req , res) => {
    try{
        const {id:Id} = req.query
        const task =await TaskModal.findById(Id)
        if(!task)return res.status(404).json({success:false , message:'not found'})

        return res.status(200).json({ success:true , message:"task found",task})
    }catch(error){
    console.log(error)
    return res.status(500).json({success:false , message:error})
   }
}

export const myTask = async(req ,res)=>{
    try{
        const {taskId, completed} = req.body

        const update = await TaskModal.findByIdAndUpdate(taskId,{completed})

        const completedTaskEvent = {
            eventType: 'TASK_COMPLETED',
            taskId: taskId,
            completedAt: new Date().toISOString()
        };
        try {
            await publishEvent('TASK_COMPLETED', JSON.stringify(completedTaskEvent));
        } catch (error) {
            console.error('Error publishing event:', error);
        }

        return res.status(200).json({success:true , message : "task updated" ,update})

    }catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:error})

       }
}

// export const CompleteTask = async (req, res) => {
//     try {
//         const { taskId, userId } = req.body;
//         if (!taskId || !userId) {
//             return res.status(400).json({ error: 'Invalid request. Both taskId and userId are required.' });
//         }
//         const updatedTask = await TaskModal.findOneAndUpdate(
//             { _id: taskId, userId },
//             { completed: true },
//             { new: true, useFindAndModify: false }
//         );
//         if (!updatedTask) {
//             return res.status(404).json({ error: 'User not belong to task or Task not found' });
//         }

//         const completedTaskEvent = {
//             eventType: 'TASK_COMPLETED',
//             taskId: taskId,
//             userId: userId,
//             completedAt: new Date().toISOString()
//         };
//         try {
//             await publishEvent('TASK_COMPLETED', JSON.stringify(completedTaskEvent));
//         } catch (error) {
//             console.error('Error publishing event:', error);
//         }
//         res.status(201).json({ success: true, message: 'Task marked as complete'});

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({ success: false, error: error })
//     }
// }

export const UpdateTask = async (req ,res)=>{
    const {Description , Priority , DueDate , name , completed ,_id} = req.body.tasks
    console.log(req.body.tasks)
    if(!_id)return res.status(404).json({success:false , message:"cannot update without taskId and userId"})
    const update = await TaskModal.findByIdAndUpdate(_id , {Description , Priority , DueDate , name , completed })
    if(update){
        console.log(update)
        return res.status(200).json({success:true,message:'task updated' , update})
    }
}

export const AllTasks = async(req , res)=>{
   try{
    const tasks = await TaskModal.find({})
    if(!tasks) return res.status(404).json({ error: 'Tasks not found' })

    return res.status(200).json({success:true,message:' all tasks' , tasks})
   } catch (error) {
    console.log(error) 
    return res.status(500).json({ success: false, error: error })
}
}

