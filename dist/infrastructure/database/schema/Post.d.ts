import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    comments: {
        likes: {
            timeStamp?: string;
            userId?: mongoose.Types.ObjectId;
        }[];
        timeStamp?: string;
        content?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    likes: {
        timeStamp?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    pollOptions: string[];
    pollVotes: number[];
    totalVotes: number;
    type?: string;
    timeStamp?: string;
    userId?: mongoose.Types.ObjectId;
    articleThumbnailURL?: string;
    articleTitle?: string;
    articleContent?: string;
    pollQuestion?: string;
    mediaThumbnailURL?: string;
    mediaCaption?: string;
}, mongoose.Document<unknown, {}, {
    comments: {
        likes: {
            timeStamp?: string;
            userId?: mongoose.Types.ObjectId;
        }[];
        timeStamp?: string;
        content?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    likes: {
        timeStamp?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    pollOptions: string[];
    pollVotes: number[];
    totalVotes: number;
    type?: string;
    timeStamp?: string;
    userId?: mongoose.Types.ObjectId;
    articleThumbnailURL?: string;
    articleTitle?: string;
    articleContent?: string;
    pollQuestion?: string;
    mediaThumbnailURL?: string;
    mediaCaption?: string;
}> & {
    comments: {
        likes: {
            timeStamp?: string;
            userId?: mongoose.Types.ObjectId;
        }[];
        timeStamp?: string;
        content?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    likes: {
        timeStamp?: string;
        userId?: mongoose.Types.ObjectId;
    }[];
    pollOptions: string[];
    pollVotes: number[];
    totalVotes: number;
    type?: string;
    timeStamp?: string;
    userId?: mongoose.Types.ObjectId;
    articleThumbnailURL?: string;
    articleTitle?: string;
    articleContent?: string;
    pollQuestion?: string;
    mediaThumbnailURL?: string;
    mediaCaption?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
