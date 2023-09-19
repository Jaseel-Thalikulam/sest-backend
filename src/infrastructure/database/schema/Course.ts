import mongoose from 'mongoose';

export const courseSchema = new mongoose.Schema(
  {
    Title: String,
    Descripton: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CoverImage: String,
  },
  {
    timestamps: true,
  },
);
