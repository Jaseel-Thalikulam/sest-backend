import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { RegisterService } from '../services/register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../database/schema/User';
import { mongooseUserRepository } from '../../../database/repositories/common/mongooseUserRepository';
import { EmailService } from '../../../utilities/email/email.service';
import createUserUseCase from '../../../../Domain/usecase/common/user/createUser';
import verifyUserUseCase from '../../../../Domain/usecase/common/user/verifyUser';
import updateUserPasswordUseCase from '../../../../Domain/usecase/common/user/updateUserPassword';
import { LoginService } from '../services/login.service';
import verifyLoginUserUseCase from 'src/Domain/usecase/common/user/loginUser';
import { CourseService } from '../services/course.service';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import createCourseUseCase from 'src/Domain/usecase/common/course/createCourseuseCase';
import { mongoosevideoRepository } from 'src/infrastructure/database/repositories/video/mongoosevideorepository';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';
import { videoSchema } from 'src/infrastructure/database/schema/Video';
import { courseSchema } from 'src/infrastructure/database/schema/Course';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: videoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: courseSchema,
      },
    ]),
  ],
  controllers: [CommonController],
  providers: [
    RegisterService,
    CourseService,
    cloudinaryUploaduseCase,
    createCourseUseCase,
    mongoosevideoRepository,
    mongooseCourseRepository,
    LoginService,
    mongooseUserRepository,
    verifyLoginUserUseCase,
    EmailService,
    createUserUseCase,
    verifyUserUseCase,
    updateUserPasswordUseCase,
  ],
})
export class CommonModule {}
