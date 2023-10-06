import mongoose from 'mongoose';
export declare const subscriptionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    IsLifeTime: boolean;
    Name?: string;
    Expirytime?: Date;
    StudentID?: mongoose.Types.ObjectId;
    SubscribedTime?: Date;
    TutorID?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    IsLifeTime: boolean;
    Name?: string;
    Expirytime?: Date;
    StudentID?: mongoose.Types.ObjectId;
    SubscribedTime?: Date;
    TutorID?: mongoose.Types.ObjectId;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    IsLifeTime: boolean;
    Name?: string;
    Expirytime?: Date;
    StudentID?: mongoose.Types.ObjectId;
    SubscribedTime?: Date;
    TutorID?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
