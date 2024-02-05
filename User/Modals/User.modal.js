import mongoose, { Schema } from "mongoose";

const User = new Schema ({
    name: String,
    email:String,
    password:String,
    type : String

},{
    timestamps:true
}
)

export default mongoose.model('User',User)