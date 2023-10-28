"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentModule = void 0;
const User_1 = require("../../../database/schema/User");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const student_controller_1 = require("./student.controller");
const homepage_service_1 = require("./services/homepage.service");
const profile_service_1 = require("../../common/services/profile.service");
const mongooseStudentRepository_1 = require("../../../database/repositories/student/mongooseStudentRepository");
const mongooseUserRepository_1 = require("../../../database/repositories/common/mongooseUserRepository");
const editProfile_1 = require("../../../../Domain/usecase/common/user/editProfile");
const chat_service_1 = require("../../common/services/chat.service");
const mongooseChatRepository_1 = require("../../../database/repositories/chat/mongooseChatRepository");
const createChatuseCase_1 = require("../../../../Domain/usecase/common/chat/createChatuseCase");
const Chat_1 = require("../../../database/schema/Chat");
const sendMessageuseCase_1 = require("../../../../Domain/usecase/common/chat/sendMessageuseCase");
const mongooseMessageRespository_1 = require("../../../database/repositories/messages/mongooseMessageRespository");
const Message_1 = require("../../../database/schema/Message");
const relationship_service_1 = require("../../common/services/relationship.service");
const followUser_1 = require("../../../../Domain/usecase/common/relationship/followUser");
const mongooseRelationshipRepository_1 = require("../../../database/repositories/relationship/mongooseRelationshipRepository");
const Relationship_1 = require("../../../database/schema/Relationship");
const unfollowUser_1 = require("../../../../Domain/usecase/common/relationship/unfollowUser");
const post_service_1 = require("../../common/services/post.service");
const cloudinary_uploaduseCase_1 = require("../../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const mongoosePostRepository_1 = require("../../../database/repositories/post/mongoosePostRepository");
const Post_1 = require("../../../database/schema/Post");
const search_service_1 = require("../../common/services/search.service");
const searchUser_1 = require("../../../../Domain/usecase/common/search/searchUser");
const meet_service_1 = require("../../common/services/meet.service");
const createJitsiMeetToken_1 = require("../../../../Domain/usecase/common/meet/createJitsiMeetToken");
const course_service_1 = require("../../common/services/course.service");
const createCourseuseCase_1 = require("../../../../Domain/usecase/common/course/createCourseuseCase");
const mongoosevideorepository_1 = require("../../../database/repositories/video/mongoosevideorepository");
const mongoosecourserepository_1 = require("../../../database/repositories/course/mongoosecourserepository");
const Video_1 = require("../../../database/schema/Video");
const Course_1 = require("../../../database/schema/Course");
const Subscription_1 = require("../../../database/schema/Subscription");
const subscription_service_1 = require("../../common/services/subscription.service");
const mongooseSubscriptionRepository_1 = require("../../../database/repositories/subscription/mongooseSubscriptionRepository");
const createSubscriptionuseCase_1 = require("../../../../Domain/usecase/common/subscription/createSubscriptionuseCase");
const payment_service_1 = require("../../common/services/payment.service");
const S3_service_1 = require("../../tutor/modules/services/S3.service");
const S3UploaduseCase_1 = require("../../../../Domain/usecase/tutor/S3UploaduseCase");
const S3GenerateSignedUrluseCase_1 = require("../../../../Domain/usecase/tutor/S3GenerateSignedUrluseCase");
let studentModule = exports.studentModule = class studentModule {
};
exports.studentModule = studentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: User_1.UserSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Chat',
                    schema: Chat_1.chatSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Message',
                    schema: Message_1.messageSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'RelationShip',
                    schema: Relationship_1.relationshipSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Post',
                    schema: Post_1.PostSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Video',
                    schema: Video_1.videoSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: Course_1.courseSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Subscription', schema: Subscription_1.subscriptionSchema },
            ]),
        ],
        controllers: [student_controller_1.default],
        providers: [
            course_service_1.CourseService,
            S3_service_1.S3Service,
            S3UploaduseCase_1.default,
            S3GenerateSignedUrluseCase_1.default,
            subscription_service_1.Subscription_service,
            mongooseSubscriptionRepository_1.mongooseSubscriptionRepository,
            createSubscriptionuseCase_1.default,
            createCourseuseCase_1.default,
            payment_service_1.PaymentService,
            mongoosevideorepository_1.mongoosevideoRepository,
            mongoosecourserepository_1.mongooseCourseRepository,
            chat_service_1.ChatService,
            post_service_1.PostService,
            mongooseChatRepository_1.mongooseChatRepository,
            mongooseRelationshipRepository_1.mongooseRelationshipRepository,
            homepage_service_1.StudentHomePageService,
            meet_service_1.MeetService,
            relationship_service_1.relationship_Service,
            profile_service_1.Edit_ProfileService,
            search_service_1.search_Service,
            mongooseStudentRepository_1.mongooseStudentRepository,
            mongoosePostRepository_1.mongoosePostRepository,
            mongooseMessageRespository_1.mongooseMessageRepository,
            editProfile_1.default,
            mongooseUserRepository_1.mongooseUserRepository,
            createChatuseCase_1.default,
            cloudinary_uploaduseCase_1.default,
            sendMessageuseCase_1.default,
            createJitsiMeetToken_1.default,
            followUser_1.default,
            unfollowUser_1.default,
            searchUser_1.default,
        ],
    })
], studentModule);
//# sourceMappingURL=student.module.js.map