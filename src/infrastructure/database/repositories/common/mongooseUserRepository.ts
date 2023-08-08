import IUserRepository from '../../../../Domain/interfaces/user.interface';
import { LoginDto } from '../../../core/common/DTO/login.dto';
import User from '../../../../Domain/entity/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

export class mongooseUserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser.toObject();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    console.log('helo finduserby email');
    const foundUser = await this.userModel.findOne({ email });
    return foundUser ? foundUser.toObject() : null;
  }

  async addExpiryOTP(id: ObjectId, OTP: number) {
    const StringifiedId = id.toString();

    const filter = { _id: StringifiedId };
    const otpExpiryDate = Date.now() + 30000;

    const update = {
      $set: {
        'otp.code': OTP,
        'otp.expiresAt': otpExpiryDate,
      },
    };

    await this.userModel.findByIdAndUpdate(filter, update, {
      projection: {
        otp: 1,
      },
    });
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async SetAsVerified(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (user) {
      user.isVerified = true;

      user.otp = undefined;
    }

    return await user.save();
  }

  async removeUser(id: ObjectId) {
    const result = await this.userModel.deleteOne({ _id: id });

    console.log(result);
  }

  async UpdatePassword(userDetails: LoginDto) {
    const userData = await this.userModel.findOne({ email: userDetails.email });

    userData.password = userDetails.password;

    return userData.save();
  }
}
