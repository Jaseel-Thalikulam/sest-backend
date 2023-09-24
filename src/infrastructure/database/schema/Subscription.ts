import mongoose from 'mongoose';

export const subscriptionSchema = new mongoose.Schema(
  {
    Name: String,
    TutorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    StudentID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    IsLifeTime: { type: Boolean, default: false },
    SubscribedTime: Date,
    Expirytime: Date,
  },
  {
    timestamps: true,
  },
);
