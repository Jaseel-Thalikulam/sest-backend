import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IStudentRepository from 'src/Domain/interfaces/student.interface';
import { TutorIdDto } from 'src/infrastructure/core/student/DTO/tutorIdDTO';

export class mongooseStudentRepository implements IStudentRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAlltutors() {
    return await this.userModel
      .find({
        role: 'Lead',
      })
      .populate({
        path: 'tags',
        model: 'Category',
      });
  }

  async getTutor(tutordata: TutorIdDto) {
    return await this.userModel.findById(tutordata.tutorId).populate({
      path: 'tags',
      model: 'Category',
    });
  }
}
