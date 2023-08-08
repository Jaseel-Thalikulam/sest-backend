import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import { mongooseUserRepository } from '../../../../database/repositories/common/mongooseUserRepository';
import { EmailService } from '../../../../utilities/email/email.service';
import createUserUseCase from '../../../../../Domain/usecase/common/createUser';
import verifyUserUseCase from '../../../../../Domain/usecase/common/verifyUser';
import updateUserPasswordUseCase from '../../../../../Domain/usecase/common/updateUserPassword';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    mongooseUserRepository,
    EmailService,
    createUserUseCase,
    verifyUserUseCase,
    updateUserPasswordUseCase,
  ],
})
export class RegisterModule {}
