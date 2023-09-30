import { mongooseMiddlewareRepository } from './infrastructure/database/repositories/middleware/mongooseMiddlewareRepository';
import { mongooseUserRepository } from './infrastructure/database/repositories/common/mongooseUserRepository';
import { SuperAdminVerifyMiddleware } from './infrastructure/core/superAdmin/middlewares/Superadmin.middleware';
import { TutorVerifyMiddleware } from './infrastructure/core/tutor/middlewares/Tutor.middleware';
import { CommonModule } from './infrastructure/core/common/modules/common.module';
import { SuperAdminModule } from './infrastructure/core/superAdmin/modules/SuperAdmin.module';
import { tutorModule } from './infrastructure/core/tutor/modules/tutor.module';
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
import { ChatModule } from './Domain/utilities/chat/chat.module';
import { ConfigService } from '@nestjs/config';
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

    CommonModule,
    tutorModule,
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
