  import { Document } from 'mongoose'

  export interface IUser extends Document{
    
    readonly   name: string;
    readonly email: string;
    readonly  phoneNumber: number;
    readonly password: string;
    readonly  isVerified: boolean;
    readonly role: string;
     isBanned:boolean
  }