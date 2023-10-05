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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_uploaduseCase_1 = require("../../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const mongoosePostRepository_1 = require("../../../database/repositories/post/mongoosePostRepository");
let PostService = exports.PostService = class PostService {
    constructor(cloudinaryUploaduseCase, mongoosePostRepository) {
        this._cloudinaryUploaduseCase = cloudinaryUploaduseCase;
        this._mongoosePostRepository = mongoosePostRepository;
    }
    async uploadArticle(ArticleData) {
        const response = await this._cloudinaryUploaduseCase
            .execute(ArticleData.articleThumbnail)
            .then((URL) => {
            return { success: true, URL };
        })
            .catch(() => {
            return { success: false, message: 'Something went wrong' };
        });
        if (response.success) {
            ArticleData.articleThumbnailURL = response.URL;
            delete ArticleData.articleThumbnail;
            return await this._mongoosePostRepository.UploadArticle(ArticleData);
        }
    }
    async editMedia(mediadata) {
        if (mediadata.mediaThumbnail == undefined) {
            return await this._mongoosePostRepository.editMedia(mediadata);
        }
        else {
            const response = await this._cloudinaryUploaduseCase
                .execute(mediadata.mediaThumbnail)
                .then((URL) => {
                return { success: true, URL };
            })
                .catch(() => {
                return { success: false, message: 'Something went wrong' };
            });
            if (response.success) {
                mediadata.mediaThumbnailURL = response.URL;
                return await this._mongoosePostRepository.editMedia(mediadata);
            }
        }
    }
    async fetchFeedPosts(followingUsers) {
        return await this._mongoosePostRepository.fetchFeedPosts(followingUsers);
    }
    async uploadPoll(pollData) {
        return await this._mongoosePostRepository.UploadPoll(pollData);
    }
    async deletePost(data) {
        const postData = await this._mongoosePostRepository.findPostById(data.postId);
        if (postData.userId.toString() == data.userId) {
            return await this._mongoosePostRepository.deletePost(data.postId);
        }
        else {
            return { success: false, message: 'Access Denied' };
        }
    }
    async deleteComment(data) {
        const postData = await this._mongoosePostRepository.findPostById(data.postId);
        if (postData) {
            const commentToDelete = postData.comments.find((comment) => {
                return (comment._id.toString() === data.commentId &&
                    comment.userId.toString() === data.userId);
            });
            if (commentToDelete) {
                return await this._mongoosePostRepository.deleteComment(commentToDelete._id, postData._id);
            }
        }
        return { success: false, message: 'Access Denied', data: null };
    }
    async fetchUserPost(userId) {
        return await this._mongoosePostRepository.fetchUserPost(userId);
    }
    async uploadMedia(mediaData) {
        const response = await this._cloudinaryUploaduseCase
            .execute(mediaData.mediaThumbnail)
            .then((URL) => {
            return { success: true, URL };
        })
            .catch(() => {
            return { success: false, message: 'Something went wrong' };
        });
        if (response.success) {
            mediaData.mediaThumbnailURL = response.URL;
            delete mediaData.mediaThumbnail;
            return await this._mongoosePostRepository.uploadMedia(mediaData);
        }
        else {
            return { success: false, message: 'Error Uploading to Cloudinary' };
        }
    }
    async likePost(Postlikedata) {
        const isLiked = await this._mongoosePostRepository.isLiked(Postlikedata);
        if (!isLiked) {
            return await this._mongoosePostRepository.likePost(Postlikedata);
        }
        else if (isLiked) {
            return await this._mongoosePostRepository.unlikePost(Postlikedata);
        }
    }
    async likeComment(data) {
        const isLiked = await this._mongoosePostRepository.isCommentLiked(data);
        if (!isLiked) {
            return await this._mongoosePostRepository.likeComment(data);
        }
        else if (isLiked) {
            return await this._mongoosePostRepository.unlikeComment(data);
        }
    }
    async addComment(commentData) {
        return await this._mongoosePostRepository.addComment(commentData);
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_uploaduseCase_1.default,
        mongoosePostRepository_1.mongoosePostRepository])
], PostService);
//# sourceMappingURL=post.service.js.map