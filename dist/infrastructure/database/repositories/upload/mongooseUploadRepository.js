"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseUploadRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const mongoose_3 = require("mongoose");
const ObjectId = mongoose_3.default.Types.ObjectId;
let mongooseUploadRepository = exports.mongooseUploadRepository = class mongooseUploadRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async updateAvatarUrl(userID, avatarUrl) {
        const userObjectId = new ObjectId(userID);
        const userData = await this.userModel.findById(userObjectId);
        console.log(userData);
        if (userData) {
            userData.avatarUrl = avatarUrl;
            await userData.save();
            return {
                success: true,
                message: 'Avatar Updated SuccessFully',
                userData,
            };
        }
        else {
            return { success: false, message: 'User not found' };
        }
    }
};
exports.mongooseUploadRepository = mongooseUploadRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseUploadRepository);
//# sourceMappingURL=mongooseUploadRepository.js.map