import { Module } from '@nestjs/common';
import { RegisterModule } from './Domain/user/modules/register/register.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoginModule } from './Domain/user/modules/login/login.module';
import { UserListModule } from './Domain/admin/modules/usersList/usersList.module';


@Module({
  imports: [
    RegisterModule,
    MongooseModule.forRoot('mongodb+srv://jaseelta111:mvW6wA1yX7WhnhPY@cluster0.swxijv6.mongodb.net/sest'),
    LoginModule,
    UserListModule
  ]
 
})
export class AppModule {}

