import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  // Common
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timeStamp: String,
  type: String,

  // Article
  articleThumbnailURL: String,
  articleTitle: String,
  articleContent: String,

  // Poll
  pollQuestion: String,
  pollOptions: [String],
  pollVotes: {
    type: [Number],
    default: [0, 0, 0, 0],
  },
  totalVotes: {
    type: Number,
    default: 0,
  },

  // Media
  mediaThumbnailURL: String,
  mediaCaption: String,
  // Comments
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      timeStamp: String,
      likes: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          timeStamp: String,
        },
      ],
    },
  ],

  // Likes
  likes: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      timeStamp: String,
    },
  ],
});
