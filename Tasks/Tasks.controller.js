import TaskModal from "../Modals/Task.modal.js"
import UserModal from "../Modals/User.modal.js"

export const AssignTask = async (req ,res)=>{
    try{
        const{Description,Priority,DueDate,completed,userID,adminId}= req.body 
    const findAdmin = await UserModal.findById(adminId)

    if(!adminId)return res.status(404).json({success:false , message:"user not found"})
    if(findAdmin.type ==="admin"){
        const saveTasks = await new TaskModal({
            Description,Priority,DueDate,completed,userID
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
    const findTask =await TaskModal.find({userID:id})
    if(!findTask)return res.status(404).json({success:false , message:"no tasks assigned"})
    return res.status(200).json({success:true , message:'your tasks',findTask})
   }catch(error){
    console.log(error)
    return res.status(500).json({success:false , message:error})
   }


}