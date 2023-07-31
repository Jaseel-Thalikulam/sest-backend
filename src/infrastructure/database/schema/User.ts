import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  isBanned: boolean;
  phoneNumber?: string;
  about?: string;
  DOB: Date;
  otp?: {
    code: string;
    expiresAt: Date;
  };
  URLs?: {
    github?: string;
    linkedin?: string;
    pinterest?: string;
    twitter?: string;
  };
  tags: string[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  phoneNumber: { type: String },
  about: { type: String },
  DOB: { type: Date, required: true },
  otp: {
    code: { type: String },
    expiresAt: { type: Date },
  },
  URLs: {
    github: { type: String },
    linkedin: { type: String },
    pinterest: { type: String },
    twitter: { type: String },
  },
  tags: { type: [String], default: [] }, // Array of tags with a default empty array
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
