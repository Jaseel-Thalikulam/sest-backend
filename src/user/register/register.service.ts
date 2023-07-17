
  import { HttpException, Injectable } from '@nestjs/common';
  import { Model, ObjectId } from 'mongoose';
  import {InjectModel} from '@nestjs/mongoose' 
  import { IUser } from '../interfaces/user.interface';
  import { UserDto } from '../DTO/User.dto';
  import * as bcrypt from 'bcrypt';

  @Injectable()
  export class RegisterService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }
      
      public async postUser(User: UserDto) {
          try {
              
            const  hashedpassword= await bcrypt.hash(User.password,10)
              console.log(User)
              console.log(hashedpassword)
              let newUser = {
                name : User.name,
                email : User.email,
                  phoneNumber: User.phoneNumber,
                  role: User.role,
                  isVerified: User.isVerified,
                  password:hashedpassword,
              }

            const user = new this.userModel(newUser)
            
              return user.save()
          } catch (err) {
              console.log(err)
          }
    }
    
   
  }
