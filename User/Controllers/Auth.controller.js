import UserModal from "../Modals/User.modal.js"
import bcrypt from 'bcrypt'
import  Jwt  from "jsonwebtoken"


export const Login =async (req , res)=>{
    try{
        const {email , password } = req.body.userData
        if( !email , !password )return res.status(404).json({success:false , message:"all fields are mandatory"})
    
    const User = await UserModal.findOne({email})
    
    if(!User)return res.status(404).json({success:false , message:"user not found"})
     const checkUser = await bcrypt.compare(password , User.password)
    if(!checkUser)return res.status(404).json({success:false , message:"user not found"})
        const token = await Jwt.sign({id:User._id},process.env.JWT_SECRET)
    
        if(User.type == "admin"){
            res.status(200).json({success:true , message:`welcome admin ${User.name}`,user:{name:User.name,type :User.type},token})
        }else{
            res.status(200).json({success:true , message:`welcome user ${User.name}`,user:{name:User.name,type :User.type},token})
        }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:error})
       }


}

export const CurrentUser = async (req , res)=>{
try{
    const {token} = req.body
    if(!token)return res.status(404).json({success:false , message:"token not found"})
    const {id} = await Jwt.verify(token , process.env.JWT_SECRET)
    const user = await UserModal.findById(id)
    if(!user)return res.status(404).json({success:false , message:"user not found"})

    return res.status(200).json({success:true , message:"user found", user:{id:user._id , name:user.name , type:user.type}})

} catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:"current user not found"})
       }

}


export const Register =async (req , res)=>{
   try{
    const{name,email , password , type} = req.body.userData
   
    if(!name , !email , !password , !type)return res.status(404).json({success:false , message:"all fields are mandatory"})

    const hashedPassword =await bcrypt.hash(password,10)
    const user = new UserModal({
       name, email , password:hashedPassword , type
    })
    await user.save()
    res.status(200).json({success:true , message:'registeration successful',user})
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
