import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/mongooseUserRepository';
import { EmailService } from 'src/infrastructure/services/email/email.service';
import createUserUseCase from 'src/Domain/usecase/createUser';
import verifyUserUseCase from 'src/Domain/usecase/verifyUser';
import updateUserPasswordUseCase from 'src/Domain/usecase/updateUserPassword';
import emailServiceUseCase from 'src/Domain/services/email/emailservice';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
 ],
  controllers: [RegisterController],
  providers: [RegisterService, mongooseUserRepository,
     EmailService,createUserUseCase,verifyUserUseCase,updateUserPasswordUseCase]
})
export class RegisterModule { }
