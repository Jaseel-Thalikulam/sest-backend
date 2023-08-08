import { VerifyDto } from '../../../infrastructure/core/common/DTO/verifyotpdto';
import UserRepository from '../../interfaces/user.interface';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

dotenv.config();

const SECRECT_KEY = process.env.SECRECT_KEY;

@Injectable()
class verifyUserUseCase {
  private userRepository: mongooseUserRepository;

  constructor(userRepository: mongooseUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: VerifyDto) {
    const response = await this.userRepository.SetAsVerified(data.userId);

    console.log(response, 'reg usecase verifyuser');

    const token = jwt.sign({ userId: response._id }, SECRECT_KEY);

    return { success: true, data: response, token };
  }
}

export default verifyUserUseCase;
