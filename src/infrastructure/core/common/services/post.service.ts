import { Injectable } from '@nestjs/common';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { ArticleDataDto } from '../DTO/post/articleDataDto';
import { IUploadResponse } from 'src/Domain/interfaces/uploadresponse.interface';
import { mongoosePostRepository } from 'src/infrastructure/database/repositories/post/mongoosePostRepository';
import { PollDataDto } from '../DTO/post/pollDataDto';
import { MediaDataDto } from '../DTO/post/mediaDataDto';
import IDeletePostDto from '../DTO/post/deletePostDto';
import { LikePostDTO } from '../DTO/post/likePostDto';
import CommentDataDTO from '../DTO/post/commentDataDto';
import DeleteCommentDto from '../DTO/post/CommentAPIDto';
@Injectable()
export class PostService {
  private readonly _cloudinaryUploaduseCase: cloudinaryUploaduseCase;
  private readonly _mongoosePostRepository: mongoosePostRepository;

  constructor(
    cloudinaryUploaduseCase: cloudinaryUploaduseCase,
    mongoosePostRepository: mongoosePostRepository,
  ) {
    this._cloudinaryUploaduseCase = cloudinaryUploaduseCase;
    this._mongoosePostRepository = mongoosePostRepository;
  }

  public async uploadArticle(ArticleData: ArticleDataDto) {
    const response: IUploadResponse = await this._cloudinaryUploaduseCase
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

  public async editMedia(mediadata: MediaDataDto) {
    if (mediadata.mediaThumbnail == undefined) {
      return await this._mongoosePostRepository.editMedia(mediadata);
    } else {
      const response: IUploadResponse = await this._cloudinaryUploaduseCase
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

  public async fetchFeedPosts(followingUsers: string[]) {
    return await this._mongoosePostRepository.fetchFeedPosts(followingUsers);
  }

  public async uploadPoll(pollData: PollDataDto) {
    return await this._mongoosePostRepository.UploadPoll(pollData);
  }

  public async deletePost(data: IDeletePostDto) {
    const postData = await this._mongoosePostRepository.findPostById(
      data.postId,
    );

    if (postData.userId.toString() == data.userId) {
      return await this._mongoosePostRepository.deletePost(data.postId);
    } else {
      return { success: false, message: 'Access Denied' };
    }
  }
  public async deleteComment(data: DeleteCommentDto) {
    const postData = await this._mongoosePostRepository.findPostById(
      data.postId,
    );

    if (postData) {
      const commentToDelete = postData.comments.find((comment) => {
        return (
          comment._id.toString() === data.commentId &&
          comment.userId.toString() === data.userId
        );
      });

      if (commentToDelete) {
        return await this._mongoosePostRepository.deleteComment(
          commentToDelete._id,
          postData._id,
        );
      }
    }
    return { success: false, message: 'Access Denied', data: null };
  }

  public async fetchUserPost(userId: string) {
    return await this._mongoosePostRepository.fetchUserPost(userId);
  }

  public async uploadMedia(mediaData: MediaDataDto) {
    const response: IUploadResponse = await this._cloudinaryUploaduseCase
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
    } else {
      return { success: false, message: 'Error Uploading to Cloudinary' };
    }
  }

  public async likePost(Postlikedata: LikePostDTO) {
    const isLiked = await this._mongoosePostRepository.isLiked(Postlikedata);

    if (!isLiked) {
      return await this._mongoosePostRepository.likePost(Postlikedata);
    } else if (isLiked) {
      return await this._mongoosePostRepository.unlikePost(Postlikedata);
    }
  }
  public async likeComment(data: DeleteCommentDto) {
    const isLiked = await this._mongoosePostRepository.isCommentLiked(data);
    if (!isLiked) {
      return await this._mongoosePostRepository.likeComment(data);
    } else if (isLiked) {
      return await this._mongoosePostRepository.unlikeComment(data);
    }
  }

  public async addComment(commentData: CommentDataDTO) {
    return await this._mongoosePostRepository.addComment(commentData);
  }
}
