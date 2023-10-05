"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.subscriptionSchema = new mongoose_1.default.Schema({
    Name: String,
    TutorID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    StudentID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    IsLifeTime: { type: Boolean, default: false },
    SubscribedTime: Date,
    Expirytime: Date,
}, {
    timestamps: true,
});
//# sourceMappingURL=Subscription.js.map