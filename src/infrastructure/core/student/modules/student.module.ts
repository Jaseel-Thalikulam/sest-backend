import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import StudentController from './student.controller';
import { StudentHomePageService } from './services/homepage.service'; 
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ])
  ],
  controllers: [StudentController],
  providers: [StudentHomePageService, mongooseStudentRepository],
})
export class studentModule {}
