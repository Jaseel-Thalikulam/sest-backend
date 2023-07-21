import * as mongoose from 'mongoose'


export const UserSchema = new mongoose.Schema({
   
    name: String,
    email: String,
    phoneNumber: Number,
    password: String,
    isVerified: Boolean,
    isBanned: Boolean,
    role: String,

})