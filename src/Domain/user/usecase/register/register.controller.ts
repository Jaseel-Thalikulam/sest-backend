import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from '../../dto/register.dto';
import {ObjectId} from 'mongoose' 
import { log } from 'console';
import { InjectMailer, Mailer, template } from 'nestjs-mailer';


@Controller('register')
export class RegisterController {
    
    constructor(
       
        private registerService: RegisterService) { }

    @Post()
    async postUser(@Body() user: RegisterDto) {
        
        
        return this.registerService.createUser(user)
    }

    @Get()
    async getOTP() {
    
    }
    
    
}

