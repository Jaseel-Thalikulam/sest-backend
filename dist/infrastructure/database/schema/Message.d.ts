import mongoose from 'mongoose';
export declare const messageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    sender: mongoose.Types.ObjectId[];
    timeStamp?: string;
    chat?: mongoose.Types.ObjectId;
    content?: string;
}, mongoose.Document<unknown, {}, {
    sender: mongoose.Types.ObjectId[];
    timeStamp?: string;
    chat?: mongoose.Types.ObjectId;
    content?: string;
}> & {
    sender: mongoose.Types.ObjectId[];
    timeStamp?: string;
    chat?: mongoose.Types.ObjectId;
    content?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
