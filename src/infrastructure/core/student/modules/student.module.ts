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
import { relationship_Service } from '../../common/services/relationship/relationship.service';
import followUser_UseCase from 'src/Domain/usecase/common/relationship/followUser';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';
import { relationshipSchema } from 'src/infrastructure/database/schema/Relationship';
import unFollowUser_UseCase from 'src/Domain/usecase/common/relationship/unfollowUser';
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
    MongooseModule.forFeature([
      {
        name: 'RelationShip',
        schema: relationshipSchema,
      },
    ]),
  ],
  controllers: [StudentController],
  providers: [
    ChatService,
    mongooseChatRepository,
    mongooseRelationshipRepository,
    StudentHomePageService,
    relationship_Service,
    Edit_ProfileService,
    mongooseStudentRepository,
    mongooseMessageRepository,
    edit_Profile_useCase,
    mongooseUserRepository,
    createChatuseCase,
    sendMessageuseCase,
    followUser_UseCase,
    unFollowUser_UseCase,
  ],
})
export class studentModule {}
