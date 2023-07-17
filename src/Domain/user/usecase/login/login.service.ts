import { Injectable } from '@nestjs/common';
import { LoginDto} from '../../dto/login.dto';
import { UserGateway } from '../../database/gateway';
import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
@Injectable()
export class LoginService {
  private readonly _userGateway: UserGateway;
  constructor(userGateway: UserGateway) {
    this._userGateway = userGateway;
}
    public async verifyUser(User:LoginDto) {
        try {
            
         let data = await this._userGateway.find(User)
          if (data) {
           
            console.log("from login service :", data)
            
            const Verified = await bcrypt.compare(User.password,data.password)
            
            if (Verified) {
              return { success:true,messsage:"Verified"};
            } else {
              return { success:false,messsage:"Incorrect Password"};
            }
            
          } else {
           
          return 
            
          }
        
        } catch (err) {
            console.log(err)
        }
  }
  
 
}
