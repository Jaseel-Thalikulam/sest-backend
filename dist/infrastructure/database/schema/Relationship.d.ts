import mongoose from 'mongoose';
export declare const relationshipSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    source?: mongoose.Types.ObjectId;
    target?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    source?: mongoose.Types.ObjectId;
    target?: mongoose.Types.ObjectId;
}> & {
    source?: mongoose.Types.ObjectId;
    target?: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
}>;
