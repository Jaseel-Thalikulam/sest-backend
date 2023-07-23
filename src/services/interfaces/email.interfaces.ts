import { ObjectId } from "mongoose";


export interface IemailGateway {
   
    addexpiryOTP(otp:number,id:ObjectId)
  
}
