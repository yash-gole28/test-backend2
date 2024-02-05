import mongoose, { Schema } from "mongoose";

const tasks = new Schema({
Description :String,
Priority :String,
DueDate :String,
completed  :{
    type : String,
    required : true
},
name :String,
userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
},{
    timestamps:true,
})

export default mongoose.model('tasks',tasks)