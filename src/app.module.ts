import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegisterModule } from './Domain/user/modules/register/register.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoginModule } from './Domain/user/modules/login/login.module';
import { UserListModule } from './Domain/admin/modules/usersList/usersList.module';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminVerifyMiddleware } from './Domain/admin/middlewares/Superadmin.middleware';
import { middlewareGateway } from './database/gateways/middlewareGateway';
import { DataBase } from './database/database.handler';
import { UserSchema } from './database/schema/User'; 
import { MailerModule } from '@nestjs-modules/mailer'
import * as dotenv from 'dotenv';
dotenv.config();
const TWILIO_SECRECT_KEY = process.env.TWILIO_SECRECT_KEY
const  MONGO_SECRET_KEY = process.env.MONGO_SECRET_KEY


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.sendgrid.net",
        port:465,
        secure:true,
        auth: {
          user: "apikey",
          pass:TWILIO_SECRECT_KEY
        }
      }
    })  ,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RegisterModule,
    MongooseModule.forRoot(MONGO_SECRET_KEY),
    LoginModule,
    UserListModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
  ]),
  ],providers:[middlewareGateway,DataBase]
 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminVerifyMiddleware).forRoutes('Superadmin');
  }
}

