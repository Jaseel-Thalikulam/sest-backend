"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationshipSchema = void 0;
const mongoose_1 = require("mongoose");
exports.relationshipSchema = new mongoose_1.default.Schema({
    source: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    target: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
});
//# sourceMappingURL=Relationship.js.map