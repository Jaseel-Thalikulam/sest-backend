import { mongooseUserRepository } from '../../../infrastructure/database/repositories/common/mongooseUserRepository';
import { LoginDto } from '../../../infrastructure/core/common/DTO/login.dto';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;

@Injectable()
class verifyLoginUserUseCase {
  private userRepository: mongooseUserRepository;

  constructor(userRepository: mongooseUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: LoginDto) {
    const data = await this.userRepository.findUserByEmail(user.email);
    if (data) {
      const Verified = await bcrypt.compare(user.password, data.password);
      if (Verified) {
        if (data.isVerified) {
          if (data.isBanned == false) {
            const token = jwt.sign({ userId: data._id }, SECRECT_KEY);
            return { success: true, message: 'Verified', data, token };
          } else {
            return { success: false, message: 'Banned By Admin' };
          }
        } else {
          return { success: false, message: 'User Not Exist' };
        }
      } else {
        return { success: false, message: 'Incorrect Password' };
      }
    } else {
      return { success: false, message: 'User Not Exist' };
    }
  }
}

export default verifyLoginUserUseCase;
