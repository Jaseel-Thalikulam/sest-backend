import { Controller, Post,Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../../dto/login.dto';

@Controller('login')
export class LoginController {

      constructor(
       
        private loginService: LoginService) { }

    @Post()
    async verifyUser(@Body() user: LoginDto) {
   
        const response = this.loginService.verifyUser(user)
        console.log(response)
    }

}

