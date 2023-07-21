import { ObjectId } from "mongoose";

export interface IUserListGateway {
   
    getAllUsers(user: User);
    changeUserAccess(id:ObjectId)
  
}


export type User = {
    name: string;
    email: string;
    phoneNumber: number;
    password: string;
    isVerified: boolean;
    role: string;
    isBanned:boolean
};