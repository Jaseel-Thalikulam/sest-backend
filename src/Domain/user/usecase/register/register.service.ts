
  import { HttpException, Injectable } from '@nestjs/common';
  import { RegisterDto } from '../../dto/register.dto';
import * as bcrypt from 'bcrypt';
  import { UserGateway } from '../../database/gateway';

  @Injectable()
  export class RegisterService {
    private readonly _userGateway: UserGateway;
    constructor(userGateway: UserGateway) {
      this._userGateway = userGateway;
  }
      
      public async createUser(User: RegisterDto) {
          try {
              
            const hashedPassword = await bcrypt.hash(User.password, 10);
          
            let newUser = {
              name: User.name,
              email: User.email,
              phoneNumber: User.phoneNumber,
              role: User.role,
              isVerified: User.isVerified,
              password: hashedPassword,
            };
        
            return await this._userGateway.create(newUser);
          } catch (err) {
              console.log(err)
          }
    }
    
   
  }
