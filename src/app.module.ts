import { Module } from '@nestjs/common';
import { RegisterModule } from './Domain/user/usecase/register/register.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoginModule } from './Domain/user/usecase/login/login.module';


@Module({
  imports: [
    RegisterModule,
    MongooseModule.forRoot('mongodb+srv://jaseelta111:mvW6wA1yX7WhnhPY@cluster0.swxijv6.mongodb.net/sest'),
    LoginModule
  ]
 
})
export class AppModule {}

