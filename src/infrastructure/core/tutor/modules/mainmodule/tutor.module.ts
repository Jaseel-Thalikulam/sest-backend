
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import { edit_tutorModule } from '../edittutorprofile/edit_tutor.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
     edit_tutorModule
 ],

})
export class tutorModule { }
