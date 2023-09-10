import IUserRepository from '../../../../Domain/interfaces/user.interface';
import { LoginDto } from '../../../core/common/DTO/login.dto';
import User from '../../../../Domain/entity/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ProfileDto } from 'src/infrastructure/core/common/DTO/tutorProfileDTO';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';

export class mongooseUserRepository implements IUserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = await this.userModel.create(user);
    return createdUser.toObject();
  }

  async getUserByUsername(username: string): Promise<boolean> {
    const data = await this.userModel.findOne({ username: username });

    return data ? true : false;
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.userModel.findOne({ email }).populate({
      path: 'tags',
      model: 'Category',
    });
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

  async UpdateProfile(userdata: ProfileDto) {
    try {
      const userDetails = await this.userModel.findById(userdata._id);

      if (userDetails) {
        if (userdata.Number !== '') {
          userDetails.phoneNumber = userdata.Number;
        }

        if (userdata.About !== '') {
          userDetails.about = userdata.About;
        }

        if (userdata.DOB) {
          userDetails.DOB = userdata.DOB;
        }

        if (userdata.githuburl) {
          const update = {
            $set: {
              'URLs.github': userdata.githuburl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }

        if (userdata.linkedinurl) {
          const update = {
            $set: {
              'URLs.linkedin': userdata.linkedinurl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }
        if (userdata.pinteresturl) {
          const update = {
            $set: {
              'URLs.pinterest': userdata.pinteresturl,
            },
          };

          await this.userModel.findByIdAndUpdate(userdata._id, update, {
            projection: {
              URLs: 1,
            },
          });
        }

        await userDetails.save();

        const userData = await this.userModel.findById(userdata._id).populate({
          path: 'tags',
          model: 'Category',
        });

        return { success: true, message: 'Successfully Updated!', userData };
      } else {
        return { success: false, message: 'User not found' };
      }
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }

  async findTutorsByUserId(data: searchQueryDTO) {
    const { searchInput } = data;

    const searchInputLowercase = searchInput.toLocaleLowerCase();

    return await this.userModel.find({
      username: { $regex: new RegExp(searchInputLowercase, 'i') },
      role: 'Lead', // Set the role to 'Learn'
    });
  }
  async findStudentsByUserId(data: searchQueryDTO) {
    const { searchInput } = data;

    const searchInputLowercase = searchInput.toLocaleLowerCase();

    return await this.userModel.find({
      username: { $regex: new RegExp(searchInputLowercase, 'i') },
      role: 'Learn',
      isBanned: false,
      isVerified: true,
    });
  }
}
