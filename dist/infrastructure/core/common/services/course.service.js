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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_uploaduseCase_1 = require("../../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const createCourseuseCase_1 = require("../../../../Domain/usecase/common/course/createCourseuseCase");
const mongoosevideorepository_1 = require("../../../database/repositories/video/mongoosevideorepository");
const mongoosecourserepository_1 = require("../../../database/repositories/course/mongoosecourserepository");
let CourseService = exports.CourseService = class CourseService {
    constructor(cloudaniryuploaduseCase, createcourse, mongoosevideoRepository, mongoosecourseRepository) {
        this.cloudinary = cloudaniryuploaduseCase;
        this.createCourseuseCase = createcourse;
        this.mongooseVideoRepository = mongoosevideoRepository;
        this.mongoosecourseRepository = mongoosecourseRepository;
    }
    async createCourse(courseData) {
        courseData.coverUrl = await this.cloudinary.execute(courseData.coverImage);
        delete courseData.coverImage;
        return await this.createCourseuseCase.execute(courseData);
    }
    async getVideodata(videoId) {
        return this.mongooseVideoRepository.getvideoDetail(videoId);
    }
    async addVideo(videoData) {
        const isTutorAuthorised = await this.mongoosecourseRepository.isTutorAuthorised(videoData.userId, videoData.courseId);
        if (isTutorAuthorised) {
            const videoDBdata = await this.mongooseVideoRepository.uploadVideoDetail(videoData);
            await this.mongoosecourseRepository.addVideo(videoDBdata);
            return { success: true, message: 'successFully Added', videoDBdata };
        }
        else {
            return {
                success: false,
                message: 'Authorization Failed',
                videoDBdata: null,
            };
        }
    }
    async findCourseByPublisherId(tutorId) {
        return await this.mongoosecourseRepository.findCourseByPublisherId(tutorId);
    }
    async findCourseById(CourseId) {
        return await this.mongoosecourseRepository.findCourseById(CourseId);
    }
    async getAllCourse() {
        return await this.mongoosecourseRepository.findAllCourse();
    }
};
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloudinary_uploaduseCase_1.default,
        createCourseuseCase_1.default,
        mongoosevideorepository_1.mongoosevideoRepository,
        mongoosecourserepository_1.mongooseCourseRepository])
], CourseService);
//# sourceMappingURL=course.service.js.map