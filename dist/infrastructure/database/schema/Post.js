"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timeStamp: String,
    type: String,
    articleThumbnailURL: String,
    articleTitle: String,
    articleContent: String,
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
    mediaThumbnailURL: String,
    mediaCaption: String,
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
    likes: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            timeStamp: String,
        },
    ],
});
//# sourceMappingURL=Post.js.map