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
/// <reference types="mongoose/types/inferschematype" />
import { Model, ObjectId } from 'mongoose';
import Post from 'src/Domain/entity/post.entity';
import IPost from 'src/Domain/interfaces/IPost';
import { ArticleDataDto } from 'src/infrastructure/core/common/DTO/post/articleDataDto';
import { PollDataDto } from 'src/infrastructure/core/common/DTO/post/pollDataDto';
import { MediaDataDto } from 'src/infrastructure/core/common/DTO/post/mediaDataDto';
import { LikePostDTO } from 'src/infrastructure/core/common/DTO/post/likePostDto';
import CommentDataDTO from 'src/infrastructure/core/common/DTO/post/commentDataDto';
import DeleteCommentDto from 'src/infrastructure/core/common/DTO/post/CommentAPIDto';
export declare class mongoosePostRepository implements IPost {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    UploadArticle(ArticleData: ArticleDataDto): Promise<{
        success: boolean;
    }>;
    uploadMedia(mediaData: MediaDataDto): Promise<{
        success: boolean;
        message: string;
    }>;
    editMedia(mediaData: MediaDataDto): Promise<{
        success: boolean;
        data: Post;
        messgae: string;
    }>;
    fetchFeedPosts(followingUsers: string[]): Promise<Post[]>;
    UploadPoll(pollData: PollDataDto): Promise<{
        success: boolean;
    }>;
    fetchUserPost(userId: string): Promise<Post[]>;
    findPostById(postId: string): Promise<Post>;
    deletePost(postId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteComment(commentId: string, postId: ObjectId): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, Post> & Post & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
    }>;
    isLiked(Postlikedata: LikePostDTO): Promise<boolean>;
    isCommentLiked(data: DeleteCommentDto): Promise<boolean>;
    likePost(Postlikedata: LikePostDTO): Promise<{
        success: boolean;
        data: Post;
    }>;
    likeComment(data: DeleteCommentDto): Promise<{
        success: boolean;
        data: Post;
    }>;
    unlikeComment(data: DeleteCommentDto): Promise<{
        success: boolean;
        data: Post;
    }>;
    unlikePost(Postlikedata: LikePostDTO): Promise<{
        success: boolean;
        data: Post;
    }>;
    addComment(commentData: CommentDataDTO): Promise<{
        success: boolean;
        data: Post;
    }>;
}
