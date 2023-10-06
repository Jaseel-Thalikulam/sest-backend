"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.default.Schema({
    Name: String,
    Description: String,
    IsListed: { type: Boolean, default: true },
});
//# sourceMappingURL=Category.js.map