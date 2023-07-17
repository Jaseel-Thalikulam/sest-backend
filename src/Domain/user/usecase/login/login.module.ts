import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schema/User';
import { UserGateway } from '../../database/gateway';
import { DataBase } from '../../database/database.handler';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
    ]),],
  
  providers: [LoginService,UserGateway,DataBase],
  controllers:[LoginController]

})
export class LoginModule {}
