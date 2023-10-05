import { ObjectId } from 'mongoose';
declare class User {
    _id: ObjectId;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    isBanned: boolean;
    phoneNumber?: string;
    about?: string;
    avatarUrl?: string;
    DOB: Date;
    otp?: {
        code: string;
        expiresAt: Date;
    };
    URLs: {
        github?: string;
        linkedin?: string;
        pinterest?: string;
        twitter?: string;
    };
    tags: string[];
    subscription: string[];
    constructor(name: string, username: string, email: string, password: string, role: string, isVerified: boolean, tags?: string[], subscription?: string[], phoneNumber?: string, avatarUrl?: string, about?: string, otp?: {
        code: string;
        expiresAt: Date;
    }, URLs?: {
        github?: string;
        linkedin?: string;
        pinterest?: string;
    }, DOB?: Date);
    getTags(): string[];
    addTag(tag: string): void;
    removeTag(tag: string): void;
}
export default User;
