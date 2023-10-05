"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = void 0;
const mongoose_1 = require("mongoose");
exports.chatSchema = new mongoose_1.default.Schema({
    Name: String,
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});
//# sourceMappingURL=Chat.js.map