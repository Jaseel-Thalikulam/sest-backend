import { Body, Controller, Get, Post, Res } from '@nestjs/common'; 
import { RegisterService } from './register.service';
import { RegisterDto } from '../../dto/register.dto';
import { Response } from 'express';


@Controller('register')
export class RegisterController {
    
    constructor(private registerService: RegisterService) { }

    @Post()
    async postUser(@Body() user: RegisterDto, @Res() res: Response) {

      const response = await this.registerService.createUser(user);
      if (response.success) {
        const data = response.data;
        if (data.role =='Learn') {
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
      return res.json({ success: response.success, message: response.message,userData:response.data,token:response.token });
      } else {
        return res.json({ success: response.success, message: response.message})
      }

   

    }

    @Get()
    async getOTP() {
    
    }
    
}



