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
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let S3UploaduseCase = class S3UploaduseCase {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION'),
        });
    }
    async execute(fileName, file) {
        const uniqueKey = (await this.generateRandomString(16)) + fileName;
        const response = await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: 'sest-upload',
            Key: uniqueKey,
            Body: file,
        }));
        const URL = (await this.configService.getOrThrow('AWS_CLOUD_FRONT')) + uniqueKey;
        return URL;
    }
    async generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
};
S3UploaduseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3UploaduseCase);
exports.default = S3UploaduseCase;
//# sourceMappingURL=S3UploaduseCase.js.map