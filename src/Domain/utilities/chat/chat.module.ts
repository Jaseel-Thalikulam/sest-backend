import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { chatSchema } from 'src/infrastructure/database/schema/Chat';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { messageSchema } from 'src/infrastructure/database/schema/Message';
import { ChatService } from 'src/infrastructure/core/common/services/chat.service';
import { ChatGateway } from './gateway/chat.gateway';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Chat',
        schema: chatSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: messageSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    ChatService,
    ChatGateway,
    mongooseChatRepository,
    mongooseMessageRepository,
    createChatuseCase,
    sendMessageuseCase,
  ],
})
export class ChatModule {}
