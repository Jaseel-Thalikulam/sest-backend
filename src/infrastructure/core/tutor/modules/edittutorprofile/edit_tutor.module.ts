
import { Module } from '@nestjs/common';
import {  Edit_tutorController} from './edit_tutor.controller';
import { Edit_tutorService } from './edit_tutor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import edit_Tutor_Profile from 'src/Domain/usecase/tutor/editTutorProfile';
import { mongooseTutorRepository } from 'src/infrastructure/database/repositories/tutor/mongoosetutorRepository';
//add usecase also
  
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
 ],
  controllers: [Edit_tutorController],
  providers: [Edit_tutorService, mongooseTutorRepository,edit_Tutor_Profile]
})
export class edit_tutorModule { }
