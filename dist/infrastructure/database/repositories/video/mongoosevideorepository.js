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
exports.mongoosevideoRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongoosevideoRepository = exports.mongoosevideoRepository = class mongoosevideoRepository {
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async uploadVideoDetail(videoData) {
        const newvideo = new this.videoModel({
            Title: videoData.title,
            URL: videoData.URL,
            CourseId: videoData.courseId,
            PublisherId: videoData.userId,
            ThumbnailURL: videoData.ThumbnailURL,
        });
        return newvideo.save();
    }
    async getvideoDetail(videoId) {
        return await this.videoModel.findById(videoId);
    }
};
exports.mongoosevideoRepository = mongoosevideoRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Video')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongoosevideoRepository);
//# sourceMappingURL=mongoosevideorepository.js.map