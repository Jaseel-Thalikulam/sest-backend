import mongoose from 'mongoose';

export const messageSchema = new mongoose.Schema({
  sender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  content: String,
  timeStamp: String,
});
