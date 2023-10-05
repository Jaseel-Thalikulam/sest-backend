"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.videoSchema = new mongoose_1.default.Schema({
    Title: String,
    URL: String,
    CourseId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' },
    PublisherId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    ThumbnailURL: String,
}, {
    timestamps: true,
});
//# sourceMappingURL=Video.js.map