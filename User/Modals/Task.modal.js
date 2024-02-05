import mongoose, { Schema } from "mongoose";

const tasks = new Schema({
Description :String,
Priority :String,
DueDate :String,
completed  :String,
userID :String
})

export default mongoose.model('tasks',tasks)