import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose' 
import { IUser } from '../../interfaces/user.interface';
import { Model } from 'mongoose';
import { LoginDto} from '../../DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
@Injectable()
export class LoginService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    public async verifyUser(User:LoginDto) {
        try {
            
         
          const user = await this.userModel.findOne({ email: User.email });
         console.log ("user from login :", user);
         
        
        
        } catch (err) {
            console.log(err)
        }
  }
  
 
}
