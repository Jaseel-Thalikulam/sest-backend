
import { LoginService } from './login.service';
import { LoginDto } from '../../dto/login.dto';
import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';



@Controller('login')
export class LoginController {

      constructor(
       
        private loginService: LoginService) { }

    @Post()
    async verifyUser(@Body() user: LoginDto,@Res() res: Response) {
   
        const response = await this.loginService.verifyUser(user)
        console.log(response.success)   
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
            } else if (data.role == 'Admin') {
                res.cookie("jwt-admin", response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: "none", 
                    secure: true, 
                });
            }else if (data.role == 'SuperAdmin') {
                res.cookie("jwt-super_admin", response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: "none", 
                    secure: true, 
                });
            }
            console.log("login response :" + response.message)

          
            return res.json({ success: response.success, message: response.message,userData:response.data,token:response.token })
        } else {
            return res.json({ success: response.success, message: response.message})
            
        }
    }

}

