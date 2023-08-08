import ISuperAdminRepository from '../../../../Domain/interfaces/admin.interface';
import User from '../../../../Domain/entity/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class mongooseSuperAdminRepository implements ISuperAdminRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async changeUserAccess(id: string) {
    try {
      const userId = new mongoose.Types.ObjectId(id);
      const userData = await this.userModel.findById(userId);

      if (userData) {
        userData.isBanned = !userData.isBanned;

        return await userData.save();
      } else {
        return false;
      }
    } catch (err) {
      console.log(err, 'from DB Gatway');

      return false;
    }
  }

  async getAllUsers() {
    console.log('Finding UsersList');
    return await this.userModel.find({});
  }
}
