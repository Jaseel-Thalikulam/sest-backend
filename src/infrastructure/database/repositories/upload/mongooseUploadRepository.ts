import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IUploadRepository from 'src/Domain/interfaces/upload.interface';
import { IUploadReturn } from 'src/Domain/interfaces/updatedUrl.interface';
import { userIdDTO } from 'src/infrastructure/core/upload/dto/userId.dto';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
export class mongooseUploadRepository implements IUploadRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


  async updateAvatarUrl(userID: userIdDTO, avatarUrl: string): Promise<IUploadReturn>{
  
    const userObjectId = new ObjectId(userID); 
    const userData = await this.userModel.findById(userObjectId);
console.log(userData)
    if (userData) {
      userData.avatarUrl = avatarUrl
     await userData.save()
      return { success: true, message: "Avatar Updated SuccessFully", userData}
    } else {
      return {success:false ,message :"User not found"}
    }

    

    
  }
  

    

}
