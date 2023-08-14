import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
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

  providers: [ChatService, mongooseUserRepository, verifyLoginUserUseCase],
  controllers: [ChatController],
})
export class ChatModule {}
