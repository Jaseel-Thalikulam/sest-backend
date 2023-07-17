import { Module } from '@nestjs/common';
import { RegisterModule } from './user/register/register.module';
import {MongooseModule} from '@nestjs/mongoose'


@Module({
  imports: [RegisterModule,MongooseModule.forRoot('mongodb+srv://jaseelta111:mvW6wA1yX7WhnhPY@cluster0.swxijv6.mongodb.net/sest')]
 
})
export class AppModule {}

