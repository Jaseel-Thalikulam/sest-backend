import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schema/User';
import { loginGateway } from '../../database/gateways/loginGateway';
import { DataBase } from '../../database/database.handler';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
    ]),],
  
  providers: [LoginService,loginGateway,DataBase],
  controllers:[LoginController]

})
export class LoginModule {}
