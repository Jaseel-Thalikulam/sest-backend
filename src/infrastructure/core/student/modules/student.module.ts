import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import StudentController from './student.controller';
import { StudentHomePageService } from './services/homepage.service';
import { Edit_ProfileService } from '../../common/services/profile.service';
import { mongooseStudentRepository } from 'src/infrastructure/database/repositories/student/mongooseStudentRepository';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import edit_Profile_useCase from 'src/Domain/usecase/common/user/editProfile';
import { ChatService } from '../../common/services/chat.service';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { chatSchema } from 'src/infrastructure/database/schema/Chat';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { messageSchema } from 'src/infrastructure/database/schema/Message';
import { relationship_Service } from '../../common/services/relationship.service';
import followUser_UseCase from 'src/Domain/usecase/common/relationship/followUser';
import { mongooseRelationshipRepository } from 'src/infrastructure/database/repositories/relationship/mongooseRelationshipRepository';
import { relationshipSchema } from 'src/infrastructure/database/schema/Relationship';
import unFollowUser_UseCase from 'src/Domain/usecase/common/relationship/unfollowUser';
import { PostService } from '../../common/services/post.service';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { mongoosePostRepository } from 'src/infrastructure/database/repositories/post/mongoosePostRepository';
import { PostSchema } from 'src/infrastructure/database/schema/Post';
import { search_Service } from '../../common/services/search.service';
import search_Query_useCase from 'src/Domain/usecase/common/search/searchUser';
import { MeetService } from '../../common/services/meet.service';
import createJitsiMeetToken from 'src/Domain/usecase/common/meet/createJitsiMeetToken';
import { CourseService } from '../../common/services/course.service';
import createCourseUseCase from 'src/Domain/usecase/common/course/createCourseuseCase';
import { mongoosevideoRepository } from 'src/infrastructure/database/repositories/video/mongoosevideorepository';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';
import { videoSchema } from 'src/infrastructure/database/schema/Video';
import { courseSchema } from 'src/infrastructure/database/schema/Course';
import { subscriptionSchema } from 'src/infrastructure/database/schema/Subscription';
import { Subscription_service } from '../../common/services/subscription.service';
import { mongooseSubscriptionRepository } from 'src/infrastructure/database/repositories/subscription/mongooseSubscriptionRepository';
import createSubscription_useCase from 'src/Domain/usecase/common/subscription/createSubscriptionuseCase';
import { PaymentService } from '../../common/services/payment.service';
import { S3Service } from '../../tutor/modules/services/S3.service';
import S3UploaduseCase from 'src/Domain/usecase/tutor/S3UploaduseCase';
import S3GenerateSignedURLuseCase from 'src/Domain/usecase/tutor/S3GenerateSignedUrluseCase';
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
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Video',
        schema: videoSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    MongooseModule.forFeature([
      { name: 'Subscription', schema: subscriptionSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [
    CourseService,
    S3Service,
    S3UploaduseCase,
    S3GenerateSignedURLuseCase,
    Subscription_service,
    mongooseSubscriptionRepository,
    createSubscription_useCase,
    createCourseUseCase,
    PaymentService,
    mongoosevideoRepository,
    mongooseCourseRepository,
    ChatService,
    PostService,
    mongooseChatRepository,
    mongooseRelationshipRepository,
    StudentHomePageService,
    MeetService,
    relationship_Service,
    Edit_ProfileService,
    search_Service,
    mongooseStudentRepository,
    mongoosePostRepository,
    mongooseMessageRepository,
    edit_Profile_useCase,
    mongooseUserRepository,
    createChatuseCase,
    cloudinaryUploaduseCase,
    sendMessageuseCase,
    createJitsiMeetToken,
    followUser_UseCase,
    unFollowUser_UseCase,
    search_Query_useCase,
  ],
})
export class studentModule {}
