import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import verifyLoginUserUseCase from '../../../../../Domain/usecase/common/loginUser';
import { mongooseUserRepository } from '../../../../database/repositories/common/mongooseUserRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],

  providers: [LoginService, mongooseUserRepository, verifyLoginUserUseCase],
  controllers: [LoginController],
})
export class LoginModule {}
