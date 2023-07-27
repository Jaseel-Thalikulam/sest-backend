import emailServiceUseCase from "../services/email/emailservice";
import UserRepository from "../interfaces/user.repository"
import * as jwt from 'jsonwebtoken';
import { RegisterDto } from "src/infrastructure/core/user/DTO/register.dto";
import * as bcrypt from 'bcrypt';
import User from "../entity/user.entity";
import * as dotenv from 'dotenv';
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY


class createUserUseCase{
    private userRepository: UserRepository
    private emailServiceUseCase: emailServiceUseCase;


    constructor(userRepository: UserRepository, emailServiceUseCase: emailServiceUseCase) {
        this.emailServiceUseCase = emailServiceUseCase
        this.userRepository=userRepository
    }


    async execute(user: RegisterDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newuser = new User(user.name, user.email, user.password, user.role)
        
        const createdUser = await this.userRepository.createUser(newuser)

        this.emailServiceUseCase.SendEmailOTP(createdUser.email, createdUser._id)
        
        if (createdUser) {
            let token
  
            if (createdUser.isVerified) {
              token = jwt.sign({ userId: createdUser._id }, SECRECT_KEY);
            }
  
            return {token,createdUser}
          }

    }

}



export default createUserUseCase