import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema(
  {
    sender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    content: String,
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  },
  {
    timestamps: true,
  },
);
