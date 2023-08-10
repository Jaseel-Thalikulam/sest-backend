import { StudentHomePageService } from './services/homepage.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TutorIdDto } from '../DTO/tutorIdDTO';

@Controller('learn')
export default class StudentController {
  constructor(private studentHomePageService: StudentHomePageService) {}

  @Get('/tutorlist')
  async getAllTutor(@Res() res: Response) {
    console.log('heloooooo called');

    const response = await this.studentHomePageService.getAllTutors();
    return res.json({ success: true, data: response });
  }
  @Post('/tutordata')
  async getTutor(@Body() tutorId: TutorIdDto, @Res() res: Response) {
    console.log('heloooooo called tutor');

    const response = await this.studentHomePageService.getTutor(tutorId);
    console.log(response);

    return res.json({ success: true, data: response });
  }
}
