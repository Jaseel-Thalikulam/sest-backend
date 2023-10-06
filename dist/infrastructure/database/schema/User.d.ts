import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatarUrl: string;
    tags: mongoose.Types.ObjectId[];
    subscription: mongoose.Types.ObjectId[];
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    isVerified?: boolean;
    isBanned?: boolean;
    phoneNumber?: number;
    about?: string;
    DOB?: Date;
    otp?: {
        code?: string;
        expiresAt?: Date;
    };
    URLs?: {
        github?: string;
        linkedin?: string;
        pinterest?: string;
        twitter?: string;
    };
}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatarUrl: string;
    tags: mongoose.Types.ObjectId[];
    subscription: mongoose.Types.ObjectId[];
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    isVerified?: boolean;
    isBanned?: boolean;
    phoneNumber?: number;
    about?: string;
    DOB?: Date;
    otp?: {
        code?: string;
        expiresAt?: Date;
    };
    URLs?: {
        github?: string;
        linkedin?: string;
        pinterest?: string;
        twitter?: string;
    };
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    avatarUrl: string;
    tags: mongoose.Types.ObjectId[];
    subscription: mongoose.Types.ObjectId[];
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    isVerified?: boolean;
    isBanned?: boolean;
    phoneNumber?: number;
    about?: string;
    DOB?: Date;
    otp?: {
        code?: string;
        expiresAt?: Date;
    };
    URLs?: {
        github?: string;
        linkedin?: string;
        pinterest?: string;
        twitter?: string;
    };
} & {
    _id: mongoose.Types.ObjectId;
}>;
