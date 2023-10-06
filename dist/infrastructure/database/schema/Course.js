"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.courseSchema = new mongoose_1.default.Schema({
    Title: String,
    Descripton: String,
    videos: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Video' }],
    publisherId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    CoverImage: String,
    Category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
}, {
    timestamps: true,
});
//# sourceMappingURL=Course.js.map