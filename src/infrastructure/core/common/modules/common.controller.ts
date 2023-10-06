import { Body, Controller, Post, Res, Get, Query } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../DTO/register.dto';
import { Response } from 'express';
import { VerifyDto } from '../DTO/verifyotpdto';
import { resendOTPDto } from '../DTO/resendOTPdto';
import { ForgetPasswordDto } from '../DTO/forgetPassword.dto';
import { verifyOTPandUpdateDTO } from '../DTO/verifyOTPandUpdatePassword';
import { LoginDto } from '../DTO/login.dto';
import { LoginService } from '../services/login.service';
import { CourseService } from '../services/course.service';

@Controller()
export class CommonController {
  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
    private courseService: CourseService,
  ) {}

  @Post('login')
  async verifyUser(@Body() user: LoginDto, @Res() res: Response) {
    const response = await this.loginService.verifyUser(user);

    if (response.success) {
      const data = response.data;

      if (data.role == 'Learn') {
        res.cookie('jwt-learn', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      } else if (data.role == 'Lead') {
        res.cookie('jwt-lead', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      } else if (data.role == 'Admin') {
        res.cookie('jwt-admin', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      } else if (data.role == 'SuperAdmin') {
        res.cookie('jwt-super_admin', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      }

      return res.json({
        success: response.success,
        message: response.message,
        userData: response.data,
        token: response.token,
      });
    } else {
      return res.json({ success: response.success, message: response.message });
    }
  }

  @Post('register')
  async postUser(@Body() user: RegisterDto, @Res() res: Response) {
    console.log(user, 'helooo registeer');
    const response = await this.registerService.createUser(user);
    console.log(response, 'responseeee');
    if (response.success) {
      const data = response.data;
      if (data.isVerified) {
        if (data.role == 'Learn') {
          res.cookie('jwt-learn', response.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true,
          });
        } else if (data.role == 'Lead') {
          res.cookie('jwt-lead', response.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true,
          });
        }
      }
      return res.json({
        success: response.success,
        message: response.message,
        userData: response.data,
        token: response.token,
      });
    } else {
      return res.json({ success: response.success, message: response.message });
    }
  }

  @Post('verifyotp')
  async verifyOTP(@Body() data: VerifyDto, @Res() res: Response) {
    console.log('yesss');
    const response = await this.registerService.verifyOTP(data);

    if (response.success) {
      const data = response.data;

      if (data.role == 'Learn') {
        res.cookie('jwt-learn', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      } else if (data.role == 'Lead') {
        res.cookie('jwt-lead', response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: 'none',
          secure: true,
        });
      }
      return res.json({
        success: response.success,
        message: response.message,
        token: response.token,
        userData: response.data,
      });
    }
  }
  @Post('resendotp')
  async reSendOTP(@Body() data: resendOTPDto) {
    this.registerService.reSendOTP(data);
  }

  @Post('forgetpassword')
  async forgetPassword(@Body() data: ForgetPasswordDto, @Res() res: Response) {
    const response = await this.registerService.forgetPassword(data);

    if (response.success) {
      return res.json({
        success: response.success,
        userData: response.userData,
      });
    } else {
      return res.json({ success: response.success, message: response.message });
    }
  }
  @Post('newPasswordverifyotp')
  async VerifyOtpAndUpdatePassword(
    @Body() data: verifyOTPandUpdateDTO,
    @Res() res: Response,
  ) {
    const response = await this.registerService.VerifyOtpAndUpdatePassword(
      data,
    );

    if (response.success) {
      return res.json({
        success: response.success,
        token: response.token,
        userData: response.userData,
      });
    } else {
      return res.json({ success: response.success, message: response.message });
    }
  }

  @Get('getallcourses')
  async getAllCourse(@Res() res: Response) {
    const response = await this.courseService.getAllCourse();
    console.log(response);

    res.json({ success: true, Corusedata: response });
  }

  @Get('/getCourseDetail')
  async getcourseDetail(
    @Query('CourseId') CourseId: string,
    @Res() res: Response,
  ) {
    try {
      const CourseData = await this.courseService.findCourseById(CourseId);
      res.json({ success: true, CourseData });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Internal Error' });
    }
  }
}
