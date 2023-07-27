import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../database/schema/User';
import verifyLoginUserUseCase from 'src/Domain/usecase/loginUser';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/mongooseUserRepository';
import User from 'src/Domain/entity/user.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema:UserSchema,
    }
    ])],
  
  providers: [LoginService,mongooseUserRepository,verifyLoginUserUseCase],
  controllers:[LoginController]

})
export class LoginModule {}
