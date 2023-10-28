"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorModule = void 0;
const User_1 = require("../../../database/schema/User");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoosetutorRepository_1 = require("../../../database/repositories/tutor/mongoosetutorRepository");
const tutor_controller_1 = require("./tutor.controller");
const category_service_1 = require("../../common/services/category.service");
const mongooseCategoryRepository_1 = require("../../../database/repositories/category/mongooseCategoryRepository");
const addCategoryuseCase_1 = require("../../../../Domain/usecase/superadmin/addCategoryuseCase");
const Category_1 = require("../../../database/schema/Category");
const tutor_Category_service_1 = require("./services/tutor_Category.service");
const insertCategoryuseCase_1 = require("../../../../Domain/usecase/tutor/insertCategoryuseCase");
const removeCategoryuseCase_1 = require("../../../../Domain/usecase/tutor/removeCategoryuseCase");
const profile_service_1 = require("../../common/services/profile.service");
const editProfile_1 = require("../../../../Domain/usecase/common/user/editProfile");
const mongooseUserRepository_1 = require("../../../database/repositories/common/mongooseUserRepository");
const chat_service_1 = require("../../common/services/chat.service");
const createChatuseCase_1 = require("../../../../Domain/usecase/common/chat/createChatuseCase");
const sendMessageuseCase_1 = require("../../../../Domain/usecase/common/chat/sendMessageuseCase");
const mongooseChatRepository_1 = require("../../../database/repositories/chat/mongooseChatRepository");
const mongooseMessageRespository_1 = require("../../../database/repositories/messages/mongooseMessageRespository");
const Chat_1 = require("../../../database/schema/Chat");
const Message_1 = require("../../../database/schema/Message");
const post_service_1 = require("../../common/services/post.service");
const cloudinary_uploaduseCase_1 = require("../../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const mongoosePostRepository_1 = require("../../../database/repositories/post/mongoosePostRepository");
const Post_1 = require("../../../database/schema/Post");
const relationship_service_1 = require("../../common/services/relationship.service");
const followUser_1 = require("../../../../Domain/usecase/common/relationship/followUser");
const unfollowUser_1 = require("../../../../Domain/usecase/common/relationship/unfollowUser");
const mongooseRelationshipRepository_1 = require("../../../database/repositories/relationship/mongooseRelationshipRepository");
const Relationship_1 = require("../../../database/schema/Relationship");
const homepage_service_1 = require("../../student/modules/services/homepage.service");
const mongooseStudentRepository_1 = require("../../../database/repositories/student/mongooseStudentRepository");
const searchUser_1 = require("../../../../Domain/usecase/common/search/searchUser");
const search_service_1 = require("../../common/services/search.service");
const meet_service_1 = require("../../common/services/meet.service");
const createJitsiMeetToken_1 = require("../../../../Domain/usecase/common/meet/createJitsiMeetToken");
const S3_service_1 = require("./services/S3.service");
const S3UploaduseCase_1 = require("../../../../Domain/usecase/tutor/S3UploaduseCase");
const S3GenerateSignedUrluseCase_1 = require("../../../../Domain/usecase/tutor/S3GenerateSignedUrluseCase");
const course_service_1 = require("../../common/services/course.service");
const Course_1 = require("../../../database/schema/Course");
const createCourseuseCase_1 = require("../../../../Domain/usecase/common/course/createCourseuseCase");
const mongoosecourserepository_1 = require("../../../database/repositories/course/mongoosecourserepository");
const mongoosevideorepository_1 = require("../../../database/repositories/video/mongoosevideorepository");
const Video_1 = require("../../../database/schema/Video");
const upload_service_1 = require("../../upload/upload.service");
const mongooseUploadRepository_1 = require("../../../database/repositories/upload/mongooseUploadRepository");
const payment_service_1 = require("../../common/services/payment.service");
const subscription_service_1 = require("../../common/services/subscription.service");
const createSubscriptionuseCase_1 = require("../../../../Domain/usecase/common/subscription/createSubscriptionuseCase");
const mongooseSubscriptionRepository_1 = require("../../../database/repositories/subscription/mongooseSubscriptionRepository");
const Subscription_1 = require("../../../database/schema/Subscription");
let tutorModule = exports.tutorModule = class tutorModule {
};
exports.tutorModule = tutorModule = __decorate([
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
                    name: 'Category',
                    schema: Category_1.categorySchema,
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
                    name: 'Post',
                    schema: Post_1.PostSchema,
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
                    name: 'Video',
                    schema: Video_1.videoSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: Course_1.courseSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: 'Subscription', schema: Subscription_1.subscriptionSchema },
            ]),
        ],
        controllers: [tutor_controller_1.TutorController],
        providers: [
            subscription_service_1.Subscription_service,
            mongooseSubscriptionRepository_1.mongooseSubscriptionRepository,
            createSubscriptionuseCase_1.default,
            payment_service_1.PaymentService,
            upload_service_1.upload_Service,
            cloudinary_uploaduseCase_1.default,
            mongooseUploadRepository_1.mongooseUploadRepository,
            mongoosevideorepository_1.mongoosevideoRepository,
            createCourseuseCase_1.default,
            mongoosecourserepository_1.mongooseCourseRepository,
            course_service_1.CourseService,
            S3_service_1.S3Service,
            S3GenerateSignedUrluseCase_1.default,
            S3UploaduseCase_1.default,
            createJitsiMeetToken_1.default,
            meet_service_1.MeetService,
            mongoosetutorRepository_1.mongooseTutorRepository,
            homepage_service_1.StudentHomePageService,
            search_service_1.search_Service,
            mongooseStudentRepository_1.mongooseStudentRepository,
            editProfile_1.default,
            category_service_1.CategoryService,
            relationship_service_1.relationship_Service,
            followUser_1.default,
            unfollowUser_1.default,
            mongoosePostRepository_1.mongoosePostRepository,
            mongooseRelationshipRepository_1.mongooseRelationshipRepository,
            post_service_1.PostService,
            mongooseCategoryRepository_1.mongooseCategoryRepository,
            addCategoryuseCase_1.default,
            tutor_Category_service_1.tutor_CategoryService,
            profile_service_1.Edit_ProfileService,
            insertCategoryuseCase_1.default,
            removeCategoryuseCase_1.default,
            cloudinary_uploaduseCase_1.default,
            mongooseUserRepository_1.mongooseUserRepository,
            chat_service_1.ChatService,
            createChatuseCase_1.default,
            sendMessageuseCase_1.default,
            searchUser_1.default,
            mongooseChatRepository_1.mongooseChatRepository,
            mongooseMessageRespository_1.mongooseMessageRepository,
            mongoosePostRepository_1.mongoosePostRepository,
        ],
    })
], tutorModule);
//# sourceMappingURL=tutor.module.js.map