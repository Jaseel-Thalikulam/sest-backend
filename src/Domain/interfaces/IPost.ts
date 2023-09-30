import { ArticleDataDto } from 'src/infrastructure/core/common/DTO/post/articleDataDto';
import { PollDataDto } from 'src/infrastructure/core/common/DTO/post/pollDataDto';
import { MediaDataDto } from 'src/infrastructure/core/common/DTO/post/mediaDataDto';
import { LikePostDTO } from 'src/infrastructure/core/common/DTO/post/likePostDto';
import CommentDataDTO from 'src/infrastructure/core/common/DTO/post/commentDataDto';
import DeleteCommentDto from 'src/infrastructure/core/common/DTO/post/CommentAPIDto';
import { ObjectId } from 'mongoose';
import Post from '../entity/post.entity';

export default interface IPost {
  UploadArticle(ArticleData: ArticleDataDto): Promise<{ success: boolean }>;
  uploadMedia(
    mediaData: MediaDataDto,
  ): Promise<{ success: boolean; message: string }>;
  editMedia(
    mediaData: MediaDataDto,
  ): Promise<{ success: boolean; data: Post; messgae: string }>;
  fetchFeedPosts(followingUsers: string[]): Promise<Post[]>;
  UploadPoll(pollData: PollDataDto): Promise<{ success: boolean }>;
  fetchUserPost(userId: string): Promise<Post[]>;
  findPostById(postId: string): Promise<Post>;
  deletePost(postId: string): Promise<{ success: boolean; message: string }>;
  deleteComment(
    commentId: string,
    postId: ObjectId,
  ): Promise<{ success: boolean; message: string; data: Post }>;
  isLiked(Postlikedata: LikePostDTO): Promise<boolean>;
  isCommentLiked(data: DeleteCommentDto): Promise<boolean>;
  likePost(
    Postlikedata: LikePostDTO,
  ): Promise<{ success: boolean; data: Post }>;
  likeComment(
    data: DeleteCommentDto,
  ): Promise<{ success: boolean; data: Post }>;
  unlikeComment(
    data: DeleteCommentDto,
  ): Promise<{ success: boolean; data: Post }>;
  unlikePost(
    Postlikedata: LikePostDTO,
  ): Promise<{ success: boolean; data: Post }>;
  addComment(
    commentData: CommentDataDTO,
  ): Promise<{ success: boolean; data: Post }>;
}
