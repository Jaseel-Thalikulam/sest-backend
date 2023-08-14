import { mongooseUserRepository } from '../../../infrastructure/database/repositories/common/mongooseUserRepository';
import { EmailService } from '../../../infrastructure/utilities/email/email.service';
import { RegisterDto } from '../../../infrastructure/core/common/DTO/register.dto';
import User from '../../entity/user.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;

@Injectable()
class createUserUseCase {
  private userRepository: mongooseUserRepository;
  private EmailService: EmailService;

  constructor(
    userRepository: mongooseUserRepository,
    EmailService: EmailService,
  ) {
    this.EmailService = EmailService;
    this.userRepository = userRepository;
  }

  async execute(user: RegisterDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const baseUsername = user.name.toLowerCase().replace(/\s+/g, ''); // Convert name to lowercase and remove spaces
    let username = baseUsername;
    let usernameSuffix = 1;
  
    while (true) {
      const existingUser = await this.userRepository.getUserByUsername(username);
      console.log(existingUser,"existinfg userr")
      if (!existingUser) {
        break; // Unique username found, exit loop
      }
  
      // Username already exists, append a suffix and check again
      username = `${baseUsername}${usernameSuffix}`;
      usernameSuffix++;
    }
    const newuser = new User(
      user.name,
      username,
      user.email,
      hashedPassword,
      user.role,
      user.isVerified,
    );

    const createdUser = await this.userRepository.createUser(newuser);

    this.EmailService.SendEmailOTP(createdUser.email, createdUser._id);

    if (createdUser) {
      let token;

      if (createdUser.isVerified) {
        token = jwt.sign({ userId: createdUser._id }, SECRECT_KEY);
      }
      return { token, createdUser };
    }
  }
}

export default createUserUseCase;
