import mongoose from 'mongoose';
export declare const courseSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    videos: mongoose.Types.ObjectId[];
    Category?: mongoose.Types.ObjectId;
    CoverImage?: string;
    Descripton?: string;
    publisherId?: mongoose.Types.ObjectId;
    Title?: string;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    videos: mongoose.Types.ObjectId[];
    Category?: mongoose.Types.ObjectId;
    CoverImage?: string;
    Descripton?: string;
    publisherId?: mongoose.Types.ObjectId;
    Title?: string;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    videos: mongoose.Types.ObjectId[];
    Category?: mongoose.Types.ObjectId;
    CoverImage?: string;
    Descripton?: string;
    publisherId?: mongoose.Types.ObjectId;
    Title?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
