

export interface IRegisterGateway {
   
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