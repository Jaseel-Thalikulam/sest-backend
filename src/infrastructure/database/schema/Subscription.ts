import mongoose from 'mongoose';

export const subscriptionSchema = new mongoose.Schema(
  {
        Name: String,
        TutorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        IsLifeTime: Boolean,
        SubscribedTime: Date,
        Expirytime :Date
  },
  {
    timestamps: true,
  },
);
