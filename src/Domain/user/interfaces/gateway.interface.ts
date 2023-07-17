import { RegisterDto } from "../dto/register.dto";

export interface IUserGateway {
   
    create(user: User);
   
  
}

export type User = {
    name: string;
    email: string;
    phoneNumber: number;
    password: string;
    isVerified: boolean;
    role: string;
};