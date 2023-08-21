import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import StudentController from './student.controller';
import { StudentHomePageService } from './services/homepage.service';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import edit_Profile_useCase from 'src/Domain/usecase/common/editProfile';
import { ChatService } from '../../common/services/chat/chat.service';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { chatSchema } from 'src/infrastructure/database/schema/Chat';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { messageSchema } from 'src/infrastructure/database/schema/Message';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
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
  controllers: [StudentController],
  providers: [
    ChatService,
    mongooseChatRepository,
    StudentHomePageService,
    Edit_ProfileService,
    mongooseStudentRepository,
    mongooseMessageRepository,
    edit_Profile_useCase,
    mongooseUserRepository,
    createChatuseCase,
    sendMessageuseCase,
  ],
})
export class studentModule {}
