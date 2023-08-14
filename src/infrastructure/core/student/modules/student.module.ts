import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import StudentController from './student.controller';
import { StudentHomePageService } from './services/homepage.service';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import edit_Profile_useCase from 'src/Domain/usecase/common/editProfile';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [
    StudentHomePageService,
    Edit_ProfileService,
    mongooseStudentRepository,
    edit_Profile_useCase,
    mongooseUserRepository,
  ],
})
export class studentModule {}
