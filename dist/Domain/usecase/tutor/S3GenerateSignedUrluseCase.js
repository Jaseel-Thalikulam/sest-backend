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
const config_1 = require("@nestjs/config");
const cloudfront_signer_1 = require("@aws-sdk/cloudfront-signer");
let S3GenerateSignedURLuseCase = class S3GenerateSignedURLuseCase {
    constructor(configService) {
        this.configService = configService;
    }
    async execute(URL) {
        return (0, cloudfront_signer_1.getSignedUrl)({
            url: URL,
            dateLessThan: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
            privateKey: this.configService.getOrThrow('CLOUDFRONT_PRIVATE_KEY'),
            keyPairId: this.configService.getOrThrow('CLOUD_FRONT_KEY_PAIR_ID'),
        });
    }
};
S3GenerateSignedURLuseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3GenerateSignedURLuseCase);
exports.default = S3GenerateSignedURLuseCase;
//# sourceMappingURL=S3GenerateSignedUrluseCase.js.map