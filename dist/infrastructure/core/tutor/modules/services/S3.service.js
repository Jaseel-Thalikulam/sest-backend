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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const S3UploaduseCase_1 = require("../../../../../Domain/usecase/tutor/S3UploaduseCase");
const S3GenerateSignedUrluseCase_1 = require("../../../../../Domain/usecase/tutor/S3GenerateSignedUrluseCase");
let S3Service = exports.S3Service = class S3Service {
    constructor(S3useCase, S3GenerateSignedURLuseCase) {
        this._S3UploaduseCase = S3useCase;
        this._S3GenerateSignedURLuseCase = S3GenerateSignedURLuseCase;
    }
    async upload(fileName, file) {
        return await this._S3UploaduseCase.execute(fileName, file);
    }
    async getSignedUrl(URL) {
        return await this._S3GenerateSignedURLuseCase.execute(URL);
    }
};
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [S3UploaduseCase_1.default,
        S3GenerateSignedUrluseCase_1.default])
], S3Service);
//# sourceMappingURL=S3.service.js.map