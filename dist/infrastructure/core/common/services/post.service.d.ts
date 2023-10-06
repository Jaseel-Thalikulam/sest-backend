/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { ArticleDataDto } from '../DTO/post/articleDataDto';
import { mongoosePostRepository } from 'src/infrastructure/database/repositories/post/mongoosePostRepository';
import { PollDataDto } from '../DTO/post/pollDataDto';
import { MediaDataDto } from '../DTO/post/mediaDataDto';
import IDeletePostDto from '../DTO/post/deletePostDto';
import { LikePostDTO } from '../DTO/post/likePostDto';
import CommentDataDTO from '../DTO/post/commentDataDto';
import DeleteCommentDto from '../DTO/post/CommentAPIDto';
export declare class PostService {
    private readonly _cloudinaryUploaduseCase;
    private readonly _mongoosePostRepository;
    constructor(cloudinaryUploaduseCase: cloudinaryUploaduseCase, mongoosePostRepository: mongoosePostRepository);
    uploadArticle(ArticleData: ArticleDataDto): Promise<{
        success: boolean;
    }>;
    editMedia(mediadata: MediaDataDto): Promise<{
        success: boolean;
        data: import("../../../../Domain/entity/post.entity").default;
        messgae: string;
    }>;
    fetchFeedPosts(followingUsers: string[]): Promise<import("../../../../Domain/entity/post.entity").default[]>;
    uploadPoll(pollData: PollDataDto): Promise<{
        success: boolean;
    }>;
    deletePost(data: IDeletePostDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteComment(data: DeleteCommentDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/post.entity").default> & import("../../../../Domain/entity/post.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
    }>;
    fetchUserPost(userId: string): Promise<import("../../../../Domain/entity/post.entity").default[]>;
    uploadMedia(mediaData: MediaDataDto): Promise<{
        success: boolean;
        message: string;
    }>;
    likePost(Postlikedata: LikePostDTO): Promise<{
        success: boolean;
        data: import("../../../../Domain/entity/post.entity").default;
    }>;
    likeComment(data: DeleteCommentDto): Promise<{
        success: boolean;
        data: import("../../../../Domain/entity/post.entity").default;
    }>;
    addComment(commentData: CommentDataDTO): Promise<{
        success: boolean;
        data: import("../../../../Domain/entity/post.entity").default;
    }>;
}
