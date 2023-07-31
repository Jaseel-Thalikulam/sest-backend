import { Body, Controller, Get, Post, Res } from '@nestjs/common'; 
import { Edit_tutorService } from './edit_tutor.service';
import { Response } from 'express';
import { Console } from 'console';
import { TutorProfileDto } from '../../dto/tutorProfileDTO';
@Controller('/lead')
export class Edit_tutorController {
    
  constructor(private editTutorPriofileService: Edit_tutorService) { }

  @Post('/editprofile')
  async postUser(@Body() user: TutorProfileDto, @Res() res: Response) {

  const response = await this.editTutorPriofileService.editTutorProfile(user)

    return res.json({ success: response.success, message: response.message,userData:response.userData })


  }

  

}

