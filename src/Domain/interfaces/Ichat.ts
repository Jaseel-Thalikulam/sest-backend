import { ObjectId } from "mongoose"
import User from "../entity/user.entity"


export interface IChat {
    Name: String,
    isGroupChat: Boolean,
    users: User[],
    // latestMessage:
    groupAdmin:ObjectId
 }
