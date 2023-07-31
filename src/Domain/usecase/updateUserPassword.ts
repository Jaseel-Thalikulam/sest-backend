import { mongooseUserRepository } from 'src/infrastructure/database/repositories/mongooseUserRepository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginDto } from "src/infrastructure/core/common/DTO/login.dto";
import { Injectable } from '@nestjs/common';
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY

@Injectable()
class updateUserPasswordUseCase {
    private userRepository: mongooseUserRepository



    constructor(userRepository: mongooseUserRepository) {
        this.userRepository = userRepository
    }


    async execute(data: LoginDto) {
        const password = data.password
        console.log(password,"from passwordddd")
        const hashedPassword = await bcrypt.hash(password, 10);

       const userDetails = {
            password: hashedPassword,
            email: data.email
          };
    

        const user = await this.userRepository.UpdatePassword(userDetails)
        if(user) {
            let token = jwt.sign({ userId: user._id }, SECRECT_KEY);
  
            return{success:true,token,user}
        }

    }

}



export default updateUserPasswordUseCase