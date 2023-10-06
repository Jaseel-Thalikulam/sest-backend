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
exports.mongoosePostRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongoosePostRepository = exports.mongoosePostRepository = class mongoosePostRepository {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async UploadArticle(ArticleData) {
        const { articleContent, articleThumbnailURL, articleTitle, timeStamp, userId, type, } = ArticleData;
        const newPost = new this.postModel({
            userId,
            timeStamp,
            type,
            articleThumbnailURL,
            articleTitle,
            articleContent,
        });
        await newPost.save();
        return { success: true };
    }
    async uploadMedia(mediaData) {
        const { mediaCaption, mediaThumbnailURL, timeStamp, type, userId } = mediaData;
        const newPost = new this.postModel({
            userId,
            timeStamp,
            type,
            mediaCaption,
            mediaThumbnailURL,
        });
        console.log(newPost);
        await newPost.save();
        return { success: true, message: 'Media upload successful' };
    }
    async editMedia(mediaData) {
        const { mediaCaption, mediaThumbnailURL, mediaThumbnail } = mediaData;
        const updateObject = mediaThumbnail !== undefined
            ? { mediaThumbnailURL: mediaThumbnailURL, mediaCaption: mediaCaption }
            : { mediaCaption: mediaCaption };
        const updatedPost = await this.postModel.findByIdAndUpdate(mediaData.postId, updateObject, { new: true });
        if (!updatedPost) {
            throw new Error('Post not found');
        }
        return {
            success: true,
            data: updatedPost,
            messgae: 'Successfully Updated',
        };
    }
    async fetchFeedPosts(followingUsers) {
        const feedPosts = await this.postModel
            .find({ userId: { $in: followingUsers } })
            .sort({ timeStamp: -1 })
            .populate('userId')
            .populate('comments.userId');
        return feedPosts;
    }
    async UploadPoll(pollData) {
        const { userId, type, timeStamp, pollQuestion, pollOptions } = pollData;
        const newPost = new this.postModel({
            userId,
            timeStamp,
            type,
            pollQuestion,
            pollOptions,
        });
        await newPost.save();
        return { success: true };
    }
    async fetchUserPost(userId) {
        const userPosts = await this.postModel
            .find({ userId: userId })
            .sort({ timeStamp: -1 })
            .populate('userId')
            .populate('comments.userId');
        return userPosts;
    }
    async findPostById(postId) {
        const post = await this.postModel.findById(postId);
        return post;
    }
    async deletePost(postId) {
        const query = {
            _id: postId,
        };
        const result = await this.postModel.deleteOne(query);
        if (result.deletedCount === 1) {
            return { success: true, message: 'successfully deleted' };
        }
        else {
            return { success: false, message: 'Something went Wrong' };
        }
    }
    async deleteComment(commentId, postId) {
        const result = await this.postModel
            .findOneAndUpdate({ _id: postId }, { $pull: { comments: { _id: commentId } } }, { new: true })
            .populate('comments.userId');
        return {
            success: true,
            message: 'Comment deleted successfully',
            data: result,
        };
    }
    async isLiked(Postlikedata) {
        const { postId, userId } = Postlikedata;
        const post = await this.postModel.findOne({
            _id: postId,
            likes: {
                $elemMatch: { userId: userId },
            },
        });
        return post ? true : false;
    }
    async isCommentLiked(data) {
        const { commentId, postId, userId } = data;
        const post = await this.postModel.findOne({
            _id: postId,
            'comments._id': commentId,
            'comments.likes.userId': userId,
        });
        return post ? true : false;
    }
    async likePost(Postlikedata) {
        const { postId, userId } = Postlikedata;
        console.log(postId, userId);
        const updatedPost = await this.postModel.findOneAndUpdate({ _id: postId }, {
            $push: {
                likes: { userId: userId, timeStamp: new Date().toISOString() },
            },
        }, { new: true });
        return { success: true, data: updatedPost };
    }
    async likeComment(data) {
        const { postId, userId, commentId } = data;
        const updatedPost = await this.postModel
            .findOneAndUpdate({
            _id: postId,
            'comments._id': commentId,
        }, {
            $addToSet: {
                'comments.$.likes': {
                    userId: userId,
                    timeStamp: new Date().toISOString(),
                },
            },
        }, { new: true })
            .populate('comments.userId');
        return { success: true, data: updatedPost };
    }
    async unlikeComment(data) {
        const { postId, userId, commentId } = data;
        const updatedPost = await this.postModel
            .findOneAndUpdate({
            _id: postId,
            'comments._id': commentId,
        }, {
            $pull: {
                'comments.$.likes': {
                    userId: userId,
                },
            },
        }, { new: true })
            .populate('comments.userId');
        return { success: true, data: updatedPost };
    }
    async unlikePost(Postlikedata) {
        const { postId, userId } = Postlikedata;
        const updatedPost = await this.postModel
            .findOneAndUpdate({ _id: postId }, {
            $pull: { likes: { userId: userId } },
        }, { new: true })
            .populate('comments.userId');
        return { success: true, data: updatedPost };
    }
    async addComment(commentData) {
        const { content, postId, timeStamp, userId } = commentData;
        const newComment = {
            userId,
            content,
            timeStamp,
        };
        const updatedDocument = await this.postModel
            .findOneAndUpdate({ _id: postId }, { $push: { comments: newComment } }, { new: true })
            .populate('comments.userId');
        return { success: true, data: updatedDocument };
    }
};
exports.mongoosePostRepository = mongoosePostRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongoosePostRepository);
//# sourceMappingURL=mongoosePostRepository.js.map