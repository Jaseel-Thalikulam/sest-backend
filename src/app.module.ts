import { mongooseMiddlewareRepository } from './infrastructure/database/repositories/middleware/mongooseMiddlewareRepository';
import { mongooseUserRepository } from './infrastructure/database/repositories/common/mongooseUserRepository';
import { SuperAdminVerifyMiddleware } from './infrastructure/core/Superadmin/middlewares/Superadmin.middleware';
import { TutorVerifyMiddleware } from './infrastructure/core/tutor/middlewares/Tutor.middleware';
import { RegisterModule } from './infrastructure/core/common/modules/register/register.module';
import { SuperAdminModule } from './infrastructure/core/Superadmin/modules/SuperAdmin.module';
import { tutorModule } from './infrastructure/core/tutor/modules/tutor.module';
import { LoginModule } from './infrastructure/core/common/modules/login/login.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserSchema } from './infrastructure/database/schema/User';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { StudentVerifyMiddleware } from './infrastructure/core/student/middlewares/Student.middleware';
import { studentModule } from './infrastructure/core/student/modules/student.module';
import { uploadModule } from './infrastructure/core/upload/upload.module';
import { v2 as cloudinary } from 'cloudinary';
import { chatSchema } from './infrastructure/database/schema/Chat';
import { messageSchema } from './infrastructure/database/schema/Message';
import { ChatGateway } from './Domain/utilities/chat/gateway/chat.gateway';
import { ChatService } from './infrastructure/core/common/services/chat/chat.service';
import { ChatModule } from './Domain/utilities/chat/chat.module';

cloudinary.config({
  secure: true,
});
dotenv.config();
const TWILIO_SECRECT_KEY = process.env.TWILIO_SECRECT_KEY;
const MONGO_SECRET_KEY = process.env.MONGO_SECRET_KEY;

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
          user: 'apikey',
          pass: TWILIO_SECRECT_KEY,
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(MONGO_SECRET_KEY),
    RegisterModule,
    tutorModule,
    LoginModule,
    uploadModule,
    SuperAdminModule,
    studentModule,
    ChatModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),

    MongooseModule.forFeature([
      {
        name: 'Chat',
        schema: chatSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: messageSchema,
      },
    ]),
  ],
  providers: [mongooseUserRepository, mongooseMiddlewareRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminVerifyMiddleware).forRoutes('Superadmin');
    consumer.apply(TutorVerifyMiddleware).forRoutes('lead');
    consumer.apply(StudentVerifyMiddleware).forRoutes('learn');
  }
}
