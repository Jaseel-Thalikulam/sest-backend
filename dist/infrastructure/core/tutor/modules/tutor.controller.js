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
exports.TutorController = void 0;
const common_1 = require("@nestjs/common");
const tutorProfileDTO_1 = require("../../common/DTO/tutorProfileDTO");
const search_service_1 = require("../../common/services/search.service");
const profile_service_1 = require("../../common/services/profile.service");
const category_service_1 = require("../../common/services/category.service");
const insertCategoryDTO_1 = require("../dto/insertCategoryDTO");
const tutor_Category_service_1 = require("./services/tutor_Category.service");
const fetchChatsDto_1 = require("../../common/DTO/chat/fetchChatsDto");
const creatChatDTO_1 = require("../../common/DTO/chat/creatChatDTO");
const chat_service_1 = require("../../common/services/chat.service");
const payment_service_1 = require("../../common/services/payment.service");
const platform_express_1 = require("@nestjs/platform-express");
const post_service_1 = require("../../common/services/post.service");
const relationship_service_1 = require("../../common/services/relationship.service");
const homepage_service_1 = require("../../student/modules/services/homepage.service");
const UserIdDTO_1 = require("../../student/DTO/UserIdDTO");
const tutorIdDTO_1 = require("../../student/DTO/tutorIdDTO");
const pollDataDto_1 = require("../../common/DTO/post/pollDataDto");
const deletePostDto_1 = require("../../common/DTO/post/deletePostDto");
const likePostDto_1 = require("../../common/DTO/post/likePostDto");
const commentDataDto_1 = require("../../common/DTO/post/commentDataDto");
const CommentAPIDto_1 = require("../../common/DTO/post/CommentAPIDto");
const JistimeetDTO_1 = require("../../common/DTO/meet/JistimeetDTO");
const meet_service_1 = require("../../common/services/meet.service");
const S3_service_1 = require("./services/S3.service");
const course_service_1 = require("../../common/services/course.service");
const upload_service_1 = require("../../upload/upload.service");
const paymentDTO_1 = require("../../common/DTO/payment/paymentDTO");
const subscriptionDto_1 = require("../../common/DTO/subscription/subscriptionDto");
const subscription_service_1 = require("../../common/services/subscription.service");
let TutorController = exports.TutorController = class TutorController {
    constructor(subscriptionService, paymentService, uploadService, courseService, s3Service, meetService, chatService, relationShipService, editTutorPriofileService, tutorCategoryService, categoryService, postService, studentHomePageService, _Search_Services) {
        this.subscriptionService = subscriptionService;
        this.paymentService = paymentService;
        this.uploadService = uploadService;
        this.courseService = courseService;
        this.s3Service = s3Service;
        this.meetService = meetService;
        this.chatService = chatService;
        this.relationShipService = relationShipService;
        this.editTutorPriofileService = editTutorPriofileService;
        this.tutorCategoryService = tutorCategoryService;
        this.categoryService = categoryService;
        this.postService = postService;
        this.studentHomePageService = studentHomePageService;
        this._Search_Services = _Search_Services;
    }
    async postUser(user, res) {
        const response = await this.editTutorPriofileService.editProfile(user);
        return res.json({
            success: response.success,
            message: response.message,
            userData: response.userData,
        });
    }
    async getCategories(res) {
        const response = await this.categoryService.getAllCategory();
        return res.json({ success: response.success, categorydata: response.data });
    }
    async insertCategory(insertData, res) {
        const response = await this.tutorCategoryService.insertCategory(insertData);
        return res.json({
            success: response.success,
            tutordata: response.tutordata,
            message: response.message,
        });
    }
    async removeCategory(removeData, res) {
        const response = await this.tutorCategoryService.removeCategory(removeData);
        return res.json({
            success: response.success,
            tutordata: response.tutordata,
            message: response.message,
        });
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
        const response = await this.chatService.fetchMessages(chatId);
        try {
            res.json({
                success: true,
                message: 'Fetched All Message',
                data: response,
            });
        }
        catch (err) {
            res.json({ success: false, message: 'Failed to Fetched All Message' });
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
            const response = await this.postService.uploadArticle(ArticleData);
            res.json({ success: response.success });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async CreateCourse(coverImage, tutorId, title, description, category, res) {
        try {
            const CourseData = {
                coverImage,
                tutorId,
                title,
                description,
                category,
            };
            console.log(CourseData);
            const response = await this.courseService.createCourse(CourseData);
            res.json({ success: true, CourseData: response });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async UploadVideo(files, title, courseId, userId, req, res) {
        try {
            const { ThumbnailURL } = await this.uploadService.uploadThumbnail(files.thumbnail[0]);
            const URL = await this.s3Service.upload(files.video[0].originalname, files.video[0].buffer);
            const VideoData = {
                title,
                courseId,
                userId,
                URL,
                ThumbnailURL,
            };
            const response = await this.courseService.addVideo(VideoData);
            res.json({
                success: response.success,
                message: response.message,
                videoData: response.videoDBdata,
            });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async UploadPoll(pollData, res) {
        try {
            await this.postService.uploadPoll(pollData);
            res.json({ success: true });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async uploadMedia(mediaThumbnail, userId, timeStamp, type, caption, res) {
        try {
            const MediaData = {
                userId,
                mediaThumbnail,
                mediaCaption: caption,
                type,
                timeStamp,
            };
            const response = await this.postService.uploadMedia(MediaData);
            res.json({ success: response.success, message: response.message });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async fetchFeedPost(userId, res) {
        try {
            if (!userId) {
                console.log('nononio');
            }
            console.log('called', userId);
            const follwingUsers = await this.relationShipService.fetchAllFollowingUsers(userId);
            const FeedPost = await this.postService.fetchFeedPosts(follwingUsers);
            res.json({ success: true, FeedPost });
        }
        catch (err) {
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
    async fetchUserPost(userId, res) {
        try {
            const FeedPost = await this.postService.fetchUserPost(userId);
            res.json({ success: true, FeedPost });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
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
    async getSubscriptionDetails(TutorId, StudentId, res) {
        try {
            const SubscriptionDetail = {
                TutorId,
                StudentId,
            };
            console.log(SubscriptionDetail, 'subb tutor');
            const response = await this.subscriptionService.getSubscriptionDetail(SubscriptionDetail);
            res.json({ success: response.success, plan: response.plan });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async handleDeletePost(res, data) {
        try {
            const response = await this.postService.deletePost(data);
            res.json({ success: response.success, message: response.message });
        }
        catch (err) {
            res.json({ success: false, messsage: 'Server Error' });
        }
    }
    async handleDeleteComment(res, data) {
        try {
            const response = await this.postService.deleteComment(data);
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
    async likePost(Postlikedata, res) {
        try {
            const response = await this.postService.likePost(Postlikedata);
            res.json({ success: response.success, Postdata: response.data });
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
    async likeComment(Commentlikedata, res) {
        try {
            const response = await this.postService.likeComment(Commentlikedata);
            res.json({ success: response.success, Postdata: response.data });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async addComment(commentData, res) {
        try {
            const response = await this.postService.addComment(commentData);
            res.json({ success: response.success, Postdata: response.data });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
        }
    }
    async editMedia(mediaThumbnail, userId, timeStamp, type, postId, caption, res) {
        try {
            const MediaData = {
                userId,
                mediaThumbnail,
                mediaCaption: caption,
                type,
                timeStamp,
                postId,
            };
            const response = await this.postService.editMedia(MediaData);
            res.json({
                success: response.success,
                Postdata: response.data,
                message: response.messgae,
            });
        }
        catch (err) {
            res.json({ success: false, message: 'Server Error' });
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
            res.json({ success: false, message: 'Internal Error' });
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
    (0, common_1.Post)('/editprofile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tutorProfileDTO_1.ProfileDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "postUser", null);
__decorate([
    (0, common_1.Get)('/getCategories'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('/insertCategory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [insertCategoryDTO_1.TutorCategoryDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "insertCategory", null);
__decorate([
    (0, common_1.Post)('/removeCategory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [insertCategoryDTO_1.TutorCategoryDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.Post)('/chat/access'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creatChatDTO_1.accessChatDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "accessChat", null);
__decorate([
    (0, common_1.Post)('/chat/fetchallchats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fetchChatsDto_1.fetchChatsDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "fetchChats", null);
__decorate([
    (0, common_1.Get)('/chat/fetchAllMessage'),
    __param(0, (0, common_1.Query)('ChatId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "fetchAllMessage", null);
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
], TutorController.prototype, "UploadArticle", null);
__decorate([
    (0, common_1.Post)('/create/course'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('tutorId')),
    __param(2, (0, common_1.Body)('title')),
    __param(3, (0, common_1.Body)('description')),
    __param(4, (0, common_1.Body)('category')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "CreateCourse", null);
__decorate([
    (0, common_1.Post)('/upload/video'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('courseId')),
    __param(3, (0, common_1.Body)('userId')),
    __param(4, (0, common_1.Req)()),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "UploadVideo", null);
__decorate([
    (0, common_1.Post)('/post/poll'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pollDataDto_1.PollDataDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "UploadPoll", null);
__decorate([
    (0, common_1.Post)('/post/media'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mediaThumbnail')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('timeStamp')),
    __param(3, (0, common_1.Body)('type')),
    __param(4, (0, common_1.Body)('caption')),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "uploadMedia", null);
__decorate([
    (0, common_1.Get)('/fetchFeedPost'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "fetchFeedPost", null);
__decorate([
    (0, common_1.Get)('/getvideoData'),
    __param(0, (0, common_1.Query)('videoId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getvideoData", null);
__decorate([
    (0, common_1.Get)('/gettutorcourses'),
    __param(0, (0, common_1.Query)('tutorId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "fetchTutorCourses", null);
__decorate([
    (0, common_1.Get)('/userPost'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "fetchUserPost", null);
__decorate([
    (0, common_1.Get)('/tutorlist'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getAllTutor", null);
__decorate([
    (0, common_1.Post)('/userdata'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tutorIdDTO_1.TutorIdDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/Subscription/Payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paymentDTO_1.PaymentDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "SubscriptionPayment", null);
__decorate([
    (0, common_1.Post)('/addSubscription'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscriptionDto_1.SubscriptionDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "AddSubscription", null);
__decorate([
    (0, common_1.Post)('/follow'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserIdDTO_1.FollowDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "handleFollow", null);
__decorate([
    (0, common_1.Get)('/followindicator'),
    __param(0, (0, common_1.Query)('followedBy')),
    __param(1, (0, common_1.Query)('following')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "handleFollowIndicator", null);
__decorate([
    (0, common_1.Get)('/getSubscriptionDetails'),
    __param(0, (0, common_1.Query)('TutorId')),
    __param(1, (0, common_1.Query)('StudentId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getSubscriptionDetails", null);
__decorate([
    (0, common_1.Delete)('/deletepost'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, deletePostDto_1.default]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "handleDeletePost", null);
__decorate([
    (0, common_1.Delete)('/post/deletecomment'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommentAPIDto_1.default]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "handleDeleteComment", null);
__decorate([
    (0, common_1.Post)('/post/like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [likePostDto_1.LikePostDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "likePost", null);
__decorate([
    (0, common_1.Get)('/getfollowers'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getfollowers", null);
__decorate([
    (0, common_1.Post)('/post/likecomment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommentAPIDto_1.default, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "likeComment", null);
__decorate([
    (0, common_1.Post)('/post/addComment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [commentDataDto_1.default, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('/post/editmedia'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('mediaThumbnail')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Body)('timeStamp')),
    __param(3, (0, common_1.Body)('type')),
    __param(4, (0, common_1.Body)('postId')),
    __param(5, (0, common_1.Body)('caption')),
    __param(6, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "editMedia", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('searchInput')),
    __param(1, (0, common_1.Query)('option')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "Search", null);
__decorate([
    (0, common_1.Get)('/getCourseDetail'),
    __param(0, (0, common_1.Query)('CourseId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getcourseDetail", null);
__decorate([
    (0, common_1.Get)('/meet/token'),
    __param(0, (0, common_1.Query)('meetData')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [JistimeetDTO_1.JitsiMeetDataDTO, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getMeetToken", null);
exports.TutorController = TutorController = __decorate([
    (0, common_1.Controller)('/lead'),
    __metadata("design:paramtypes", [subscription_service_1.Subscription_service,
        payment_service_1.PaymentService,
        upload_service_1.upload_Service,
        course_service_1.CourseService,
        S3_service_1.S3Service,
        meet_service_1.MeetService,
        chat_service_1.ChatService,
        relationship_service_1.relationship_Service,
        profile_service_1.Edit_ProfileService,
        tutor_Category_service_1.tutor_CategoryService,
        category_service_1.CategoryService,
        post_service_1.PostService,
        homepage_service_1.StudentHomePageService,
        search_service_1.search_Service])
], TutorController);
//# sourceMappingURL=tutor.controller.js.map