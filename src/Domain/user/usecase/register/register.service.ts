
  import { HttpException, Injectable } from '@nestjs/common';
  import { RegisterDto } from '../../dto/register.dto';
import * as bcrypt from 'bcrypt';
  import { registerGateway } from '../../database/gateways/registerGateway';
  import * as jwt from 'jsonwebtoken';
  @Injectable()
  export class RegisterService {
    private readonly _registerGateway: registerGateway;
    constructor(registerGateway: registerGateway) {
      this._registerGateway = registerGateway;
  }
      
      public async createUser(User: RegisterDto) {
          try {
              
            const hashedPassword = await bcrypt.hash(User.password, 10);
          
            const userData  = await this._registerGateway.find(User) 

            console.log(userData)
            if (!userData) {
              let newUser = {
                name: User.name,
              email: User.email,
              phoneNumber: User.phoneNumber,
              role: User.role,
              isVerified: User.isVerified,
              password: hashedPassword,
            };

              let response = await this._registerGateway.create(newUser);
              if (response) {
                const token = jwt.sign({ userId: response._id }, "your-secret-key");
                console.log("from token res" ,token);
                return {success:true,message:"Created",token,data:response}
              }else {
                return { success:false,message:"Error Occured"};
              }
              

            } else {
              console.log("NONONNOO")
              return {success:false,message:"User Already Exist"}
          }

          } catch (err) {
              console.log(err)
          }
    }
    
   
  }
