import { Controller, Post,Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from '../../DTO/login.dto';

@Controller('login')
export class LoginController {

      constructor(
       
        private loginService: LoginService) { }

    @Post()
    async verifyUser(@Body() user: LoginDto) {
   
        return this.loginService.verifyUser(user)
    }

}

