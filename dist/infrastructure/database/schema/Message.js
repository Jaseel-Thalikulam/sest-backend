"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.messageSchema = new mongoose_1.default.Schema({
    sender: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
    chat: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Chat' },
    content: String,
    timeStamp: String,
});
//# sourceMappingURL=Message.js.map