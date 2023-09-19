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
import { PostService } from '../../common/services/post/post.service';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { mongoosePostRepository } from 'src/infrastructure/database/repositories/post/mongoosePostRepository';
import { PostSchema } from 'src/infrastructure/database/schema/Post';
import { relationship_Service } from '../../common/services/relationship/relationship.service';
import followUser_UseCase from 'src/Domain/usecase/common/relationship/followUser';
import unFollowUser_UseCase from 'src/Domain/usecase/common/relationship/unfollowUser';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';
import { relationshipSchema } from 'src/infrastructure/database/schema/Relationship';
import { StudentHomePageService } from '../../student/modules/services/homepage.service';
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
import search_Query_useCase from 'src/Domain/usecase/common/search/searchUser';
import { search_Service } from '../../common/services/search/search.service';
import { MeetService } from '../../common/services/meet/meet.service';
import createJitsiMeetToken from 'src/Domain/usecase/common/meet/createJitsiMeetToken';
import { S3Service } from './services/S3.service';
import S3useCase from 'src/Domain/usecase/tutor/S3UploaduseCase';
import S3GenerateSignedURLuseCase from 'src/Domain/usecase/tutor/S3GenerateSignedUrluseCase';
import { CourseService } from '../../common/services/course/course.service';
import { courseSchema } from 'src/infrastructure/database/schema/Course';
import createCourseUseCase from 'src/Domain/usecase/common/course/createCourseuseCase';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';
import { mongoosevideoRepository } from 'src/infrastructure/database/repositories/video/mongoosevideorepository';
import { videoSchema } from 'src/infrastructure/database/schema/Video';
import { upload_Service } from '../../upload/upload.service';
import { mongooseUploadRepository } from 'src/infrastructure/database/repositories/upload/mongooseUploadRepository';

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
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'RelationShip',
        schema: relationshipSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: videoSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
  ],
  controllers: [TutorController],
  providers: [
    upload_Service,
    cloudinaryUploaduseCase,
    mongooseUploadRepository,
    mongoosevideoRepository,
    createCourseUseCase,
    mongooseCourseRepository,
    CourseService,
    S3Service,
    S3GenerateSignedURLuseCase,
    S3useCase,
    createJitsiMeetToken,
    MeetService,
    mongooseTutorRepository,
    StudentHomePageService,
    search_Service,
    mongooseStudentRepository,
    edit_Profile_useCase,
    CategoryService,
    relationship_Service,
    followUser_UseCase,
    unFollowUser_UseCase,
    mongoosePostRepository,
    mongooseRelationshipRepository,
    PostService,
    mongooseCategoryRepository,
    add_Category_UseCase,
    tutor_CategoryService,
    Edit_ProfileService,
    insertTutorCategoryuseCase,
    removeTutorCategoryuseCase,
    cloudinaryUploaduseCase,
    mongooseUserRepository,
    ChatService,
    createChatuseCase,
    sendMessageuseCase,
    search_Query_useCase,
    mongooseChatRepository,
    mongooseMessageRepository,
    mongoosePostRepository,
  ],
})
export class tutorModule {}
