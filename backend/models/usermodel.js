import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name : {
        type:String,
        required: true,

    },
    email : {
        type: String
    },

    image : {
        type : String
    }
})

export const User = mongoose.model("User", userSchema)
