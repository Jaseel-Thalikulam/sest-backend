import { Body, Controller, Post, UploadedFile, UseInterceptors,Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload_Service } from './upload.service'
import { Response } from 'express';
import { userIdDTO } from './dto/userId.dto';
@Controller('/upload')
export class upload_Controller {
  constructor(private uploadService: upload_Service) {}

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('image'))
  async Upload_avatar(

    @UploadedFile() imageData: Express.Multer.File,
    @Body('userId') userId: userIdDTO,
    @Res() res: Response
  
  ) {

     const response = await this.uploadService.upload_avatar(imageData,userId)

    if (response.success) {
      
      res.json({success:response.success,message:response.message,userData:response.userData})
    } else {
      res.json({success:response.success,message:response.message})
      
    }
      
 
  

  }
}
