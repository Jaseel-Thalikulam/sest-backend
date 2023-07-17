import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserDto } from '../DTO/User.dto';
import {ObjectId} from 'mongoose' 
import { log } from 'console';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';


@Controller('register')
export class RegisterController {
    
    constructor(
       
        private registerService: RegisterService) { }

    @Post()
    async postUser(@Body() user: UserDto) {
        
        
        return this.registerService.postUser(user)
    }

    @Get()
    async getOTP() {
    
    }
    
    
}

