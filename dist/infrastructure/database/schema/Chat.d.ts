import mongoose from 'mongoose';
export declare const chatSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    Name?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    Name?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    isGroupChat: boolean;
    users: mongoose.Types.ObjectId[];
    Name?: string;
    latestMessage?: mongoose.Types.ObjectId;
    groupAdmin?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
