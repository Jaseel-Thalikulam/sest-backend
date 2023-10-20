"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const homepage_service_1 = require("./services/homepage.service");
const common_1 = require("@nestjs/common");
const tutorIdDTO_1 = require("../DTO/tutorIdDTO");
const tutorProfileDTO_1 = require("../../common/DTO/tutorProfileDTO");
const profile_service_1 = require("../../common/services/profile.service");
const search_service_1 = require("../../common/services/search.service");
const creatChatDTO_1 = require("../../common/DTO/chat/creatChatDTO");
const chat_service_1 = require("../../common/services/chat.service");
const fetchChatsDto_1 = require("../../common/DTO/chat/fetchChatsDto");
const UserIdDTO_1 = require("../DTO/UserIdDTO");
const relationship_service_1 = require("../../common/services/relationship.service");
const post_service_1 = require("../../common/services/post.service");
const platform_express_1 = require("@nestjs/platform-express");
const deletePostDto_1 = require("../../common/DTO/post/deletePostDto");
const likePostDto_1 = require("../../common/DTO/post/likePostDto");
const commentDataDto_1 = require("../../common/DTO/post/commentDataDto");
const CommentAPIDto_1 = require("../../common/DTO/post/CommentAPIDto");
const meet_service_1 = require("../../common/services/meet.service");
const JistimeetDTO_1 = require("../../common/DTO/meet/JistimeetDTO");
const course_service_1 = require("../../common/services/course.service");
const subscription_service_1 = require("../../common/services/subscription.service");
const paymentDTO_1 = require("../../common/DTO/payment/paymentDTO");
const payment_service_1 = require("../../common/services/payment.service");
const subscriptionDto_1 = require("../../common/DTO/subscription/subscriptionDto");
const S3_service_1 = require("../../tutor/modules/services/S3.service");
let StudentController = class StudentController {
    constructor(s3Service, subscriptionService, courseService, chatService, meetService, relationShipService, studentHomePageService, _Edit_ProfileService, _Post_Services, _Search_Services, paymentService) {
        this.s3Service = s3Service;
        this.subscriptionService = subscriptionService;
        this.courseService = courseService;
        this.chatService = chatService;
        this.meetService = meetService;
        this.relationShipService = relationShipService;
        this.studentHomePageService = studentHomePageService;
        this._Edit_ProfileService = _Edit_ProfileService;
        this._Post_Services = _Post_Services;
        this._Search_Services = _Search_Services;
        this.paymentService = paymentService;
    }
    async SubscriptionPayment(PaymentDetails, res) {
        try {
            const isAlreadySubscribed = await this.subscriptionService.isAlreadySubscribed(PaymentDetails);
            if (!isAlreadySubscribed) {
                const response = await this.paymentService.executepayment(PaymentDetails);
                res.json({
                    success: response.success,
                    client_secret: response.client_secret,
                });
            }
            else {
                res.json({ success: false, message: 'Already Subscribed' });
            }
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async AddSubscription(SubscriptionDetails, res) {
        try {
            const response = await this.subscriptionService.createSubscription(SubscriptionDetails);
            res.json({ success: response.success });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async getvideoData(videoId, res) {
        try {
            const response = await this.courseService.getVideodata(videoId);
            response.URL = await this.s3Service.getSignedUrl(response.URL);
            res.json({
                success: true,
                message: 'SuccessFullty Fetched',
                videoData: response,
            });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async getcourseDetail(CourseId, res) {
        try {
            const CourseData = await this.courseService.findCourseById(CourseId);
            res.json({ success: true, CourseData });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Internal Error' });
        }
    }
    async getAllTutor(res) {
        const response = await this.studentHomePageService.getAllTutors();
        res.json({ success: true, Tutorsdata: response });
    }
    async getUser(userId, res) {
        const response = await this.studentHomePageService.getTutor(userId);
        res.json({ success: true, Tutorsdata: response });
    }
    async postUser(user, res) {
        try {
            const response = await this._Edit_ProfileService.editProfile(user);
            res.json({
                success: response.success,
                message: response.message,
                userData: response.userData,
            });
        }
        catch (err) { }
    }
    async fetchTutorCourses(tutorId, res) {
        try {
            const response = await this.courseService.findCourseByPublisherId(tutorId);
            res.json({ success: true, Corusedata: response });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async getSubscriptionDetails(TutorId, StudentId, res) {
        try {
            const SubscriptionDetail = {
                TutorId,
                StudentId,
            };
            const response = await this.subscriptionService.getSubscriptionDetail(SubscriptionDetail);
            res.json({ success: response.success, plan: response.plan });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async accessChat(data, res) {
        const response = await this.chatService.accessChat(data);
        res.json({
            success: response.success,
            message: response.message,
            Chat: response.Chat,
        });
    }
    async fetchChats(data, res) {
        try {
            const response = await this.chatService.fetchChats(data);
            res.json({
                success: response.success,
                message: response.message,
                Chats: response.Chats,
            });
        }
        catch (err) {
            res.json({ success: false, message: 'Server error' });
        }
    }
    async fetchAllMessage(chatId, res) {
        try {
            const response = await this.chatService.fetchMessages(chatId);
            res.json({
                success: true,
                message: 'Successfully Fetched',
                data: response,
            });
        }
        catch (err) {
            res.json({
                success: false,
                message: 'Internal error',
            });
        }
    }
    async Search(searchInput, option, res) {
        try {
            const searchQuery = {
                option,
                searchInput,
            };
            const response = await this._Search_Services.Search(searchQuery);
            res.json({ success: true, Data: response });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Internal Error' });
        }
    }
    async UploadArticle(articleThumbnail, userId, timeStamp, type, articleTitle, articleContent, res) {
        try {
            const ArticleData = {
                userId,
                articleTitle,
                articleContent,
                articleThumbnail,
                type,
                timeStamp,
            };
            const response = await this._Post_Services.uploadArticle(ArticleData);
            res.json({ success: response.success });
        }
        catch (err) {
            res.json({ success: false });
        }
    }
    async likePost(Postlikedata, res) {
        try {
            const response = await this._Post_Services.likePost(Postlikedata);
            res.json({ success: response.success, Postdata: response.data });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async handleDeletePost(res, data) {
        try {
            const response = await this._Post_Services.deletePost(data);
            res.json({ success: response.success, message: response.message });
        }
        catch (err) {
            res.json({ success: false, messsage: 'Server Error' });
        }
    }
    async handleDeleteComment(res, data) {
        try {
            const response = await this._Post_Services.deleteComment(data);
            res.json({
                success: response.success,
                message: response.message,
                Postdata: response.data,
            });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, messsage: 'Server Error' });
        }
    }
    async likeComment(Commentlikedata, res) {
        try {
            const response = await this._Post_Services.likeComment(Commentlikedata);
            res.json({ success: response.success, Postdata: response.data });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async addComment(commentData, res) {
        try {
            const response = await this._Post_Services.addComment(commentData);
            res.json({ success: response.success, Postdata: response.data });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async fetchUserPost(userId, res) {
        try {
            const FeedPost = await this._Post_Services.fetchUserPost(userId);
            res.json({ success: true, FeedPost });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async handleFollow(UsersId, res) {
        try {
            this.relationShipService.handlefollow(UsersId);
            res.json({ success: true, message: 'Successfully completed' });
        }
        catch (err) {
            res.json({
                success: false,
                message: 'Server Error Unable to Complete the Functionality',
            });
        }
    }
    async handleFollowIndicator(followedBy, following, res) {
        try {
            const UsersId = {
                followedBy,
                following,
            };
            const isFollowing = await this.relationShipService.isfollowed(UsersId);
            res.json({ success: true, message: 'Success', isFollowing });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async fetchFeedPost(userId, res) {
        try {
            const follwingUsers = await this.relationShipService.fetchAllFollowingUsers(userId);
            const FeedPost = await this._Post_Services.fetchFeedPosts(follwingUsers);
            res.json({ success: true, FeedPost });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async getfollowers(userId, res) {
        try {
            const followers = await this.relationShipService.fetchAllFollowers(userId);
            const follwingUsers = await this.relationShipService.fetchAllFollowingUsers(userId);
            res.json({ success: true, followers, follwingUsers });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async getMeetToken(meetData, res) {
        try {
            const response = await this.meetService.generateToken(meetData);
            res.json({ success: true, token: response });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Server Error' });
        }
    }
};
__decorate([
    (0, common_1.Post)('/Subscription/Payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paymentDTO_1.PaymentDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "SubscriptionPayment", null);
__decorate([
    (0, common_1.Post)('/addSubscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscriptionDto_1.SubscriptionDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "AddSubscription", null);
__decorate([
    (0, common_1.Get)('/getvideoData'),
    __param(0, (0, common_1.Query)('videoId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getvideoData", null);
__decorate([
    (0, common_1.Get)('/getCourseDetail'),
    __param(0, (0, common_1.Query)('CourseId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getcourseDetail", null);
__decorate([
    (0, common_1.Get)('/tutorlist'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAllTutor", null);
__decorate([
    (0, common_1.Post)('/userdata'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tutorIdDTO_1.TutorIdDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/editprofile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tutorProfileDTO_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "postUser", null);
__decorate([
    (0, common_1.Get)('/gettutorcourses'),
    __param(0, (0, common_1.Query)('tutorId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "fetchTutorCourses", null);
__decorate([
    (0, common_1.Get)('/getSubscriptionDetails'),
    __param(0, (0, common_1.Query)('TutorId')),
    __param(1, (0, common_1.Query)('StudentId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getSubscriptionDetails", null);
__decorate([
    (0, common_1.Post)('/chat/access'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creatChatDTO_1.accessChatDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "accessChat", null);
__decorate([
    (0, common_1.Post)('/chat/fetchallchats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetchChatsDto_1.fetchChatsDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "fetchChats", null);
__decorate([
    (0, common_1.Get)('/chat/fetchAllMessage'),
    __param(0, (0, common_1.Query)('ChatId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "fetchAllMessage", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('searchInput')),
    __param(1, (0, common_1.Query)('option')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "Search", null);
__decorate([
    (0, common_1.Post)('/post/article'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('articleThumbnail')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('timeStamp')),
    __param(3, (0, common_1.Body)('type')),
    __param(4, (0, common_1.Body)('articleTitle')),
    __param(5, (0, common_1.Body)('articleContent')),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "UploadArticle", null);
__decorate([
    (0, common_1.Post)('/post/like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [likePostDto_1.LikePostDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)('/deletepost'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deletePostDto_1.default]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "handleDeletePost", null);
__decorate([
    (0, common_1.Delete)('/post/deletecomment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommentAPIDto_1.default]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "handleDeleteComment", null);
__decorate([
    (0, common_1.Post)('/post/likecomment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentAPIDto_1.default, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Post)('/post/addComment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commentDataDto_1.default, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)('/userPost'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "fetchUserPost", null);
__decorate([
    (0, common_1.Post)('/follow'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserIdDTO_1.FollowDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "handleFollow", null);
__decorate([
    (0, common_1.Get)('/followindicator'),
    __param(0, (0, common_1.Query)('followedBy')),
    __param(1, (0, common_1.Query)('following')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "handleFollowIndicator", null);
__decorate([
    (0, common_1.Get)('/fetchFeedPost'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "fetchFeedPost", null);
__decorate([
    (0, common_1.Get)('/getfollowers'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getfollowers", null);
__decorate([
    (0, common_1.Get)('/meet/token'),
    __param(0, (0, common_1.Query)('meetData')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [JistimeetDTO_1.JitsiMeetDataDTO, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getMeetToken", null);
StudentController = __decorate([
    (0, common_1.Controller)('learn'),
    __metadata("design:paramtypes", [S3_service_1.S3Service,
        subscription_service_1.Subscription_service,
        course_service_1.CourseService,
        chat_service_1.ChatService,
        meet_service_1.MeetService,
        relationship_service_1.relationship_Service,
        homepage_service_1.StudentHomePageService,
        profile_service_1.Edit_ProfileService,
        post_service_1.PostService,
        search_service_1.search_Service,
        payment_service_1.PaymentService])
], StudentController);
exports.default = StudentController;
//# sourceMappingURL=student.controller.js.map