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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_Service = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_uploaduseCase_1 = require("../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const mongooseUploadRepository_1 = require("../../database/repositories/upload/mongooseUploadRepository");
let upload_Service = exports.upload_Service = class upload_Service {
    constructor(cloudinaryUploaduseCase, mongooseUploadRepository) {
        this._cloudinaryUploaduseCase = cloudinaryUploaduseCase;
        this._mongooseUploadRepository = mongooseUploadRepository;
    }
    async upload_avatar(imageData, userId) {
        const response = await this._cloudinaryUploaduseCase
            .execute(imageData)
            .then((URL) => {
            return { success: true, URL };
        })
            .catch(() => {
            return { success: false, message: 'Something went wrong' };
        });
        if (response.success) {
            return await this._mongooseUploadRepository.updateAvatarUrl(userId, response.URL);
        }
        else {
            return { success: false, message: response.message };
        }
    }
    async uploadThumbnail(imageData) {
        return await this._cloudinaryUploaduseCase
            .execute(imageData)
            .then((ThumbnailURL) => {
            return { success: true, ThumbnailURL };
        })
            .catch(() => {
            return {
                success: false,
                ThumbnailURL: '',
                message: 'Something went wrong',
            };
        });
    }
};
exports.upload_Service = upload_Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_uploaduseCase_1.default,
        mongooseUploadRepository_1.mongooseUploadRepository])
], upload_Service);
//# sourceMappingURL=upload.service.js.map