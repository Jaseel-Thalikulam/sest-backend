import mongoose from 'mongoose';
export declare const videoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    Title?: string;
    URL?: string;
    CourseId?: mongoose.Types.ObjectId;
    PublisherId?: mongoose.Types.ObjectId;
    ThumbnailURL?: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    Title?: string;
    URL?: string;
    CourseId?: mongoose.Types.ObjectId;
    PublisherId?: mongoose.Types.ObjectId;
    ThumbnailURL?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    Title?: string;
    URL?: string;
    CourseId?: mongoose.Types.ObjectId;
    PublisherId?: mongoose.Types.ObjectId;
    ThumbnailURL?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
