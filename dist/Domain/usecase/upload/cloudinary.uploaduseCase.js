"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
cloudinary_1.v2.config({
    secure: true,
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
let cloudinaryUploaduseCase = class cloudinaryUploaduseCase {
    async execute(imageData) {
        const imageBuffer = imageData.buffer;
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({
                resource_type: 'image',
                public_id: imageData.originalname,
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result.secure_url);
                }
            })
                .end(imageBuffer);
        });
    }
};
cloudinaryUploaduseCase = __decorate([
    (0, common_1.Injectable)()
], cloudinaryUploaduseCase);
exports.default = cloudinaryUploaduseCase;
//# sourceMappingURL=cloudinary.uploaduseCase.js.map