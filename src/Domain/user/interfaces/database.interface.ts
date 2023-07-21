export interface IDatabaseGateway {
   
    createUser(user: User);
   
  
}


export type User = {
    name: string;
    email: string;
    phoneNumber: number;
    password: string;
    isVerified: boolean;
    role: string;
    isBanned: boolean;
};