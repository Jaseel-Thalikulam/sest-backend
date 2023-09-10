import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import Post from 'src/Domain/entity/post.entity';
import IPost from 'src/Domain/interfaces/IPost';
import { ArticleDataDto } from 'src/infrastructure/core/common/DTO/post/articleDataDto';
import { PollDataDto } from 'src/infrastructure/core/common/DTO/post/pollDataDto';
import { MediaDataDto } from 'src/infrastructure/core/common/DTO/post/mediaDataDto';
import { LikePostDTO } from 'src/infrastructure/core/common/DTO/post/likePostDto';
import CommentDataDTO from 'src/infrastructure/core/common/DTO/post/commentDataDto';
import DeleteCommentDto from 'src/infrastructure/core/common/DTO/post/deleteCommentDto';
export class mongoosePostRepository implements IPost {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async UploadArticle(ArticleData: ArticleDataDto) {
    const {
      articleContent,
      articleThumbnailURL,
      articleTitle,
      timeStamp,
      userId,
      type,
    } = ArticleData;

    // Create a new Post document
    const newPost = new this.postModel({
      userId, // Assuming userId is a valid ObjectId
      timeStamp,
      type,
      articleThumbnailURL,
      articleTitle,
      articleContent,
    });

    // Save the new Post document to the database
    await newPost.save();

    return { success: true };
  }

  async uploadMedia(mediaData: MediaDataDto) {
    const { mediaCaption, mediaThumbnailURL, timeStamp, type, userId } =
      mediaData;
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

  async editMedia(mediaData: MediaDataDto) {
    const { mediaCaption, mediaThumbnailURL, mediaThumbnail } = mediaData;

    // Define the update object based on the condition
    const updateObject =
      mediaThumbnail !== undefined
        ? { mediaThumbnailURL: mediaThumbnailURL, mediaCaption: mediaCaption }
        : { mediaCaption: mediaCaption };

    // Use Mongoose to update the document
    const updatedPost = await this.postModel.findByIdAndUpdate(
      mediaData.postId, // Replace 'postId' with the actual ID of the post you want to update
      updateObject,
      { new: true }, // Return the updated document
    );

    if (!updatedPost) {
      throw new Error('Post not found'); // Handle the case where the post is not found
    }

    // Handle success, you can return the updated post or perform other actions
    return {
      success: true,
      data: updatedPost,
      messgae: 'Successfully Updated',
    };
  }

  async fetchFeedPosts(followingUsers: string[]) {
    const feedPosts = await this.postModel
      .find({ userId: { $in: followingUsers } })
      .sort({ timeStamp: -1 })
      .populate('userId')
      .populate('comments.userId');

    return feedPosts;
  }

  async UploadPoll(pollData: PollDataDto) {
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

  async fetchUserPost(userId: string) {
    const userPosts = await this.postModel
      .find({ userId: userId })
      .sort({ timeStamp: -1 })
      .populate('userId')
      .populate('comments.userId');

    return userPosts;
  }

  async findPostById(postId: string) {
    return await this.postModel.findById(postId);
  }

  async deletePost(postId: string) {
    const query = {
      _id: postId,
    };
    const result = await this.postModel.deleteOne(query);

    if (result.deletedCount === 1) {
      return { success: true, message: 'successfully deleted' };
    } else {
      return { success: false, message: 'Something went Wrong' };
    }
  }
  async deleteComment(commentId: string, postId: ObjectId) {
    const result = await this.postModel
      .findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true },
      )
      .populate('comments.userId');

    return {
      success: true,
      message: 'Comment deleted successfully',
      data: result,
    };
  }

  async isLiked(Postlikedata: LikePostDTO) {
    const { postId, userId } = Postlikedata;
    const post = await this.postModel.findOne({
      _id: postId,
      likes: {
        $elemMatch: { userId: userId },
      },
    });

    return post ? true : false;
  }

  async isCommentLiked(data: DeleteCommentDto) {
    const { commentId, postId, userId } = data;

    const post = await this.postModel.findOne({
      _id: postId,
      'comments._id': commentId,
      'comments.likes.userId': userId,
    });

    return post ? true : false;
  }

  async likePost(Postlikedata: LikePostDTO) {
    const { postId, userId } = Postlikedata;
    console.log(postId, userId);
    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          likes: { userId: userId, timeStamp: new Date().toISOString() },
        },
      },
      { new: true }, // Return the updated document
    );

    return { success: true, data: updatedPost };
  }
  async likeComment(data: DeleteCommentDto) {
    const { postId, userId, commentId } = data;

    const updatedPost = await this.postModel
      .findOneAndUpdate(
        {
          _id: postId,
          'comments._id': commentId,
        },
        {
          $addToSet: {
            'comments.$.likes': {
              userId: userId,
              timeStamp: new Date().toISOString(),
            },
          },
        },
        { new: true },
      )
      .populate('comments.userId');

    return { success: true, data: updatedPost };
  }

  async unlikeComment(data: DeleteCommentDto) {
    const { postId, userId, commentId } = data;

    const updatedPost = await this.postModel
      .findOneAndUpdate(
        {
          _id: postId,
          'comments._id': commentId,
        },
        {
          $pull: {
            'comments.$.likes': {
              userId: userId,
            },
          },
        },
        { new: true },
      )
      .populate('comments.userId');

    return { success: true, data: updatedPost };
  }

  async unlikePost(Postlikedata: LikePostDTO) {
    const { postId, userId } = Postlikedata;
    const updatedPost = await this.postModel
      .findOneAndUpdate(
        { _id: postId },
        {
          $pull: { likes: { userId: userId } },
        },
        { new: true }, // Return the updated document
      )
      .populate('comments.userId');
    return { success: true, data: updatedPost };
  }

  async addComment(commentData: CommentDataDTO) {
    const { content, postId, timeStamp, userId } = commentData;

    console.log(content, postId, timeStamp, userId);
    const newComment = {
      userId,
      content,
      timeStamp,
    };

    // Use the MongoDB $push operator to add the new comment to the comments array
    const updatedDocument = await this.postModel
      .findOneAndUpdate(
        { _id: postId }, // Find the post by its ID
        { $push: { comments: newComment } },
        { new: true }, // This option returns the updated document
      )
      .populate('comments.userId');

    return { success: true, data: updatedDocument };
  }
}
