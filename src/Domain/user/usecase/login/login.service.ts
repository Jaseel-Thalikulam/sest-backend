import { Injectable } from '@nestjs/common';
import { LoginDto} from '../../dto/login.dto';
import { loginGateway } from '../../database/gateways/loginGateway';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  private readonly _loginGateway: loginGateway;
  constructor(loginGateway: loginGateway) {
    this._loginGateway = loginGateway;
}
    public async verifyUser(User:LoginDto) {
        try{
            
         let data = await this._loginGateway.find(User)
          if (data) {
            
            console.log("from login service :", data)
            
            const Verified = await bcrypt.compare(User.password,data.password)
            
            if (Verified) {
              const token = jwt.sign({ userId: data._id }, "your-secret-key");
              return { success: true, message: "Verified", data,token };
            } else {
              return { success:false,message:"Incorrect Password"};
            }
            
          } else {
           
          return { success:false,message:"User Not Exist", };
            
          }
        
        } catch (err) {
            console.log(err)
        }
  }
  
 
}
