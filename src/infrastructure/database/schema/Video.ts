import mongoose from 'mongoose';

export const videoSchema = new mongoose.Schema(
  {
    Title: String,
    URL: String,
    CourseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    PublisherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ThumbnailURL: String,
  },
  {
    timestamps: true,
  },
);
