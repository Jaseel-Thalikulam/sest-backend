import mongoose from 'mongoose';
export declare const categorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    IsListed: boolean;
    Name?: string;
    Description?: string;
}, mongoose.Document<unknown, {}, {
    IsListed: boolean;
    Name?: string;
    Description?: string;
}> & {
    IsListed: boolean;
    Name?: string;
    Description?: string;
} & {
    _id: mongoose.Types.ObjectId;
}>;
