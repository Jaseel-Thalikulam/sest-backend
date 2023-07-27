import { Body, Controller, Get, Post, Res } from '@nestjs/common'; 
import { RegisterService } from './register.service';
import { RegisterDto } from '../../dto/register.dto';
import { Response } from 'express';
import { VerifyDto } from '../../DTO/verifyotpdto';
import { Console } from 'console';
import { resendOTPDto } from '../../DTO/resendOTPdto';
import { ForgetPasswordDto } from '../../DTO/forgetPassword.dto';
import { verifyOTPandUpdateDTO } from '../../DTO/verifyOTPandUpdatePassword';

@Controller()
export class RegisterController {
    
  constructor(private registerService: RegisterService) { }

  @Post('register')
  async postUser(@Body() user: RegisterDto, @Res() res: Response) {
console.log(user,"helooo registeer")
    const response = await this.registerService.createUser(user);
    if (response.success) {
      const data = response.data;
      if (data.role == 'Learn') {
        res.cookie("jwt-learn", response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      } else if (data.role == 'Lead') {
        res.cookie("jwt-lead", response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      }
      return res.json({ success: response.success, message: response.message, userData: response.data, token: response.token });
    } else {
      return res.json({ success: response.success, message: response.message })
    }

   

  }

  @Post("verifyotp")
  async verifyOTP(@Body() data: VerifyDto, @Res() res: Response) {

    const response = await this.registerService.verifyOTP(data)
      
    if (response.success) {
      const data = response.data;
     
      if (data.role == 'Learn') {
        res.cookie("jwt-learn", response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      } else if (data.role == 'Lead') {
        res.cookie("jwt-lead", response.token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
      
      }
        return res.json({ success: response.success, message: response.message,token:response.token,userData:response.data})
      
      
    }
    
  }
  @Post("resendotp")
  async reSendOTP(@Body() data: resendOTPDto, @Res() res: Response) {
   
    this.registerService.reSendOTP(data)
  }
  
  @Post("forgetpassword")
  async forgetPassword(@Body() data: ForgetPasswordDto, @Res() res: Response) {
   
    const response = await this.registerService.forgetPassword(data)
    
    if (response.success) {
      
      return res.json({ success: response.success, userData: response.userData })
    
    } else {
       
      return res.json({success:response.success,message:response.message})
      
    }
  }
  @Post("newPasswordverifyotp")
  async VerifyOtpAndUpdatePassword(@Body() data: verifyOTPandUpdateDTO, @Res() res: Response){
   
    const response = await this.registerService.VerifyOtpAndUpdatePassword(data)
    
    if (response.success) {
      
      return res.json({ success: response.success,token:response.token,userData:response.userData})
    
    } else {
       
      return res.json({success:response.success,message:response.message})
      
    }
  }
  

}

