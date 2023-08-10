import mongoose from 'mongoose';

export const categorySchema = new mongoose.Schema({
  Name: String,
  Description: String,
  IsListed: { type: Boolean, default: true },
});
