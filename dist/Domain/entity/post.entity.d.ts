import { ObjectId } from 'mongoose';
declare class Post {
    _id: ObjectId;
    userId: ObjectId;
    timeStamp: string;
    type: string;
    comments: Comment[];
    likes: Like[];
    articleThumbnailURL: string;
    articleTitle: string;
    articleContent: string;
    pollQuestion: string;
    pollOptions: string[];
    pollVotes: number[];
    totalVotes: number;
    mediaThumbnailURL: string;
    mediaCaption: string;
    constructor(userId: ObjectId, timeStamp: string, type: string, comments: Comment[], likes: Like[], articleThumbnailURL: string, articleTitle: string, articleContent: string, pollQuestion: string, pollOptions: string[], pollVotes: number[], totalVotes: number, mediaThumbnailURL: string, mediaCaption: string);
}
declare class Comment {
    _id: string;
    userId: ObjectId;
    content: string;
    timeStamp: string;
    likes: Like[];
    constructor(userId: ObjectId, content: string, timeStamp: string, likes: Like[]);
}
declare class Like {
    userId: ObjectId;
    timeStamp: string;
    constructor(userId: ObjectId, timeStamp: string);
}
export default Post;
