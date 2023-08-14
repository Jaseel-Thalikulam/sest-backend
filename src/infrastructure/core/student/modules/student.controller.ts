import { StudentHomePageService } from './services/homepage.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TutorIdDto } from '../DTO/tutorIdDTO';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
@Controller('learn')
export default class StudentController {
  constructor(
    private studentHomePageService: StudentHomePageService,
    private _Edit_ProfileService: Edit_ProfileService,
  ) {}

  @Get('/tutorlist')
  async getAllTutor(@Res() res: Response) {
    const response = await this.studentHomePageService.getAllTutors();

    return res.json({ success: true, Tutorsdata: response });
  }
  @Post('/tutordata')
  async getTutor(@Body() tutorId: TutorIdDto, @Res() res: Response) {
    
    const response = await this.studentHomePageService.getTutor(tutorId);
    return res.json({ success: true, Tutorsdata: response });
  }

  @Post('/editprofile')
  async postUser(@Body() user: ProfileDto, @Res() res: Response) {
    const response = await this._Edit_ProfileService.editProfile(user);

    return res.json({
      success: response.success,
      message: response.message,
      userData: response.userData,
    });
  }
}
