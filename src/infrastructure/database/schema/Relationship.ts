import mongoose from 'mongoose';

export const relationshipSchema = new mongoose.Schema({
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
