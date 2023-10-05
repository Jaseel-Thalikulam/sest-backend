"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Post {
    constructor(userId, timeStamp, type, comments, likes, articleThumbnailURL, articleTitle, articleContent, pollQuestion, pollOptions, pollVotes, totalVotes, mediaThumbnailURL, mediaCaption) {
        this.userId = userId;
        this.timeStamp = timeStamp;
        this.type = type;
        this.comments = comments;
        this.likes = likes;
        this.articleThumbnailURL = articleThumbnailURL;
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.pollQuestion = pollQuestion;
        this.pollOptions = pollOptions;
        this.pollVotes = pollVotes;
        this.totalVotes = totalVotes;
        this.mediaThumbnailURL = mediaThumbnailURL;
        this.mediaCaption = mediaCaption;
    }
}
class Comment {
    constructor(userId, content, timeStamp, likes) {
        this.userId = userId;
        this.content = content;
        this.timeStamp = timeStamp;
        this.likes = likes;
    }
}
class Like {
    constructor(userId, timeStamp) {
        this.userId = userId;
        this.timeStamp = timeStamp;
    }
}
exports.default = Post;
//# sourceMappingURL=post.entity.js.map