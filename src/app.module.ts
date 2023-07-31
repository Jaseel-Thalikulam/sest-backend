import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegisterModule } from './infrastructure/core/common/modules/register/register.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoginModule } from './infrastructure/core/common/modules/login/login.module';
import { UserListModule } from './infrastructure/core/admin/modules/usersList/usersList.module';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminVerifyMiddleware } from './infrastructure/core/admin/middlewares/Superadmin.middleware';
import { TutorVerifyMiddleware } from './infrastructure/core/tutor/middlewares/Tutor.middleware';
import { UserSchema } from './infrastructure/database/schema/User';
import { MailerModule } from '@nestjs-modules/mailer'
import * as dotenv from 'dotenv';
import { mongooseUserRepository } from './infrastructure/database/repositories/mongooseUserRepository';

import { mongooseMiddlewareRepository } from './infrastructure/database/repositories/mongooseMiddlewareRepository';
import { tutorModule } from './infrastructure/core/tutor/modules/mainmodule/tutor.module';
import { mongooseTutorRepository } from './infrastructure/database/repositories/tutor/mongoosetutorRepository';
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
    tutorModule,
    MongooseModule.forRoot(MONGO_SECRET_KEY),
    LoginModule,
    UserListModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
  ]),
  ], providers: [
    mongooseUserRepository,
    mongooseMiddlewareRepository
     // This registers the repository as a provider
    
  ],
 

 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminVerifyMiddleware).forRoutes('Superadmin');
    consumer.apply(TutorVerifyMiddleware).forRoutes('lead');
  }
}

