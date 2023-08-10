
import { Injectable } from '@nestjs/common';
import { IUploadResponse } from 'src/Domain/interfaces/uploadresponse.interface';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { mongooseUploadRepository } from 'src/infrastructure/database/repositories/upload/mongooseUploadRepository';
import { userIdDTO } from './dto/userId.dto';
let URL = ''
@Injectable()
export class upload_Service {
  private readonly _cloudinaryUploaduseCase: cloudinaryUploaduseCase;
  private readonly _mongooseUploadRepository: mongooseUploadRepository;

  constructor(
    cloudinaryUploaduseCase: cloudinaryUploaduseCase,
    mongooseUploadRepository: mongooseUploadRepository) {
    this._cloudinaryUploaduseCase = cloudinaryUploaduseCase;
    this._mongooseUploadRepository = mongooseUploadRepository;
  }


  public async upload_avatar(imageData:Express.Multer.File, userId:userIdDTO) {


    const response:IUploadResponse = await this._cloudinaryUploaduseCase.execute(imageData).then((URL) => {

      return {success:true,URL} 

    }).catch(() => {

      return {success:false,message:"Something went wrong"}

    })

    if (response.success) {
      return await this._mongooseUploadRepository.updateAvatarUrl(userId, response.URL);  
      
    } else {
      return {success:false,message:response.message}
    }

   

  }
}
