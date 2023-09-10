import { ObjectId } from 'mongoose';

class Post {
  // Common
  public _id!: ObjectId;
  public userId: ObjectId;
  public timeStamp: string;
  public type: string;
  public comments: Comment[];
  public likes: Like[];

  // Article
  public articleThumbnailURL: string;
  public articleTitle: string;
  public articleContent: string;

  // Poll
  public pollQuestion: string;
  public pollOptions: string[];
  public pollVotes: number[];
  public totalVotes: number;

  // Media
  public mediaThumbnailURL: string;
  public mediaCaption: string;

  constructor(
    // Common
    userId: ObjectId,
    timeStamp: string,
    type: string,
    comments: Comment[],
    likes: Like[],

    // Article
    articleThumbnailURL: string,
    articleTitle: string,
    articleContent: string,

    // Poll
    pollQuestion: string,
    pollOptions: string[],
    pollVotes: number[],
    totalVotes: number,

    // Media
    mediaThumbnailURL: string,
    mediaCaption: string,
  ) {
    // Common
    this.userId = userId;
    this.timeStamp = timeStamp;
    this.type = type;
    this.comments = comments;
    this.likes = likes;

    // Article
    this.articleThumbnailURL = articleThumbnailURL;
    this.articleTitle = articleTitle;
    this.articleContent = articleContent;

    // Poll
    this.pollQuestion = pollQuestion;
    this.pollOptions = pollOptions;
    this.pollVotes = pollVotes;
    this.totalVotes = totalVotes;

    // Media
    this.mediaThumbnailURL = mediaThumbnailURL;
    this.mediaCaption = mediaCaption;
  }
}

class Comment {
  public _id: string;
  public userId: ObjectId;
  public content: string;
  public timeStamp: string;
  public likes: Like[];

  constructor(
    userId: ObjectId,
    content: string,
    timeStamp: string,
    likes: Like[],
  ) {
    this.userId = userId;
    this.content = content;
    this.timeStamp = timeStamp;
    this.likes = likes;
  }
}

class Like {
  public userId: ObjectId;
  public timeStamp: string;

  constructor(userId: ObjectId, timeStamp: string) {
    this.userId = userId;
    this.timeStamp = timeStamp;
  }
}

export default Post;
