import UserModal from "../Modals/User.modal.js"


export const Login =async (req , res)=>{
    try{
        const {email , password } = req.body
        if( !email , !password )return res.status(404).json({success:false , message:"all fields are mandatory"})
    
    const checkUser = await UserModal.findOne({email})
    if(!checkUser)return res.status(404).json({success:false , message:"user not found"})

    if(checkUser.email === email){
        if(checkUser.type == "admin"){
            res.status(200).json({success:true , message:`welcome admin ${checkUser.name}`})
        }else{
            res.status(200).json({success:true , message:`welcome user ${checkUser.name}`})
        }
    }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:error})
       }


}


export const Register =async (req , res)=>{
   try{
    const{name,email , password , type} = req.body
   
    if(!name , !email , !password , !type)return res.status(404).json({success:false , message:"all fields are mandatory"})

    const user = new UserModal({
       name, email , password , type
    })
    await user.save()
    res.status(200).json({success:true , message:'registeration successful'})
   }
   catch(error){
    console.log(error)
    return res.status(500).json({success:false , message:error})
   }


}


export const DeleteUser = async(req,res)=>{
    try{
        const {id , deleteId} = req.body
        const user =await UserModal.findById(id)
        if(!user)return res.status(404).json({success:false , message:"user not found"})
        if(user.type === "admin"){
            await UserModal.findByIdAndDelete(deleteId)
            res.status(200).json({success:true , message:'User deleted successfully'})

        }else(
            res.status(404).json({success:false , message:"You dont have rights to modify database",user})
        )
    } catch(error){
    console.log(error)
    return res.status(500).json({success:false , message:error})
   }
}