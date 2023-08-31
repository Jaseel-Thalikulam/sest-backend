import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { mongooseTutorRepository } from 'src/infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { TutorController } from './tutor.controller';
import { CategoryService } from 'src/infrastructure/core/common/services/category/category.service';
import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';
import { categorySchema } from 'src/infrastructure/database/schema/Category';
import { tutor_CategoryService } from './services/tutor_Category.service';
import insertTutorCategoryuseCase from 'src/Domain/usecase/tutor/insertCategoryuseCase';
import removeTutorCategoryuseCase from 'src/Domain/usecase/tutor/removeCategoryuseCase';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import edit_Profile_useCase from 'src/Domain/usecase/common/editProfile';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { ChatService } from '../../common/services/chat/chat.service';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { chatSchema } from 'src/infrastructure/database/schema/Chat';
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
        name: 'Category',
        schema: categorySchema,
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
  controllers: [TutorController],
  providers: [
    mongooseTutorRepository,
    edit_Profile_useCase,
    CategoryService,
    mongooseCategoryRepository,
    add_Category_UseCase,
    tutor_CategoryService,
    Edit_ProfileService,
    insertTutorCategoryuseCase,
    removeTutorCategoryuseCase,
    mongooseUserRepository,
    ChatService,
    createChatuseCase,
    sendMessageuseCase,
    mongooseChatRepository,
    mongooseMessageRepository,
  ],
})
export class tutorModule {}
