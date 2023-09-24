import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    phoneNumber: Number,
    password: String,
    isVerified: Boolean,
    isBanned: Boolean,
    role: String,
    DOB: Date,
    otp: {
      code: String,
      expiresAt: Date,
    },
    about: String,
    URLs: {
      github: String,
      linkedin: String,
      pinterest: String,
      twitter: String,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    avatarUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/dan9hatpk/image/upload/v1691999680/defaultavatar.png.png',
    },
    subscription: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    ],
  },
  {
    timestamps: true,
  },
);
