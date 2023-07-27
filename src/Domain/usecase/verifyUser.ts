import UserRepository from "../interfaces/user.repository"
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { VerifyDto } from "src/infrastructure/core/user/DTO/verifyotpdto";
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY


class verifyUserUseCase{
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository=userRepository
    }

    async execute(data:VerifyDto ) {
        const response = await this.userRepository.SetAsVerified(data.userId)

      console.log(response, "reg usecase verifyuser");

      let token = jwt.sign({ userId: response._id }, SECRECT_KEY);

      return { success: true, data: response, token }

    }

}



export default verifyUserUseCase