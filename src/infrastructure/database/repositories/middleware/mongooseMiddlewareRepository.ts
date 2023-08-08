import IMiddlewareRepository from '../../../../Domain/interfaces/middleware.interface';
import User from '../../../../Domain/entity/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

export class mongooseMiddlewareRepository implements IMiddlewareRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async isSuperAdmin(id: ObjectId) {
    try {
      const data = await this.userModel.findById(id);

      return data.role == 'SuperAdmin' ? true : false;
    } catch (err) {
      console.log(err);
    }
  }
  async isTutor(id: ObjectId) {
    try {
      const data = await this.userModel.findById(id);

      return data.role == 'Lead' ? true : false;
    } catch (err) {
      console.log(err);
    }
  }
  async isStudent(id: ObjectId) {
    try {
      const data = await this.userModel.findById(id);

      return data.role == 'Learn' ? true : false;
    } catch (err) {
      console.log(err);
    }
  }
}
