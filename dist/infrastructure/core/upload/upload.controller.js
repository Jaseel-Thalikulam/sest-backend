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
exports.upload_Controller = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
let upload_Controller = exports.upload_Controller = class upload_Controller {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async Upload_avatar(imageData, userId, res) {
        const response = await this.uploadService.upload_avatar(imageData, userId);
        if (response.success) {
            res.json({
                success: response.success,
                message: response.message,
                userData: response.userData,
            });
        }
        else {
            res.json({ success: response.success, message: response.message });
        }
    }
};
__decorate([
    (0, common_1.Post)('/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('userId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], upload_Controller.prototype, "Upload_avatar", null);
exports.upload_Controller = upload_Controller = __decorate([
    (0, common_1.Controller)('/upload'),
    __metadata("design:paramtypes", [upload_service_1.upload_Service])
], upload_Controller);
//# sourceMappingURL=upload.controller.js.map