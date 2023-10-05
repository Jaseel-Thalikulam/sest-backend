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
exports.mongooseCourseRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseCourseRepository = exports.mongooseCourseRepository = class mongooseCourseRepository {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    createCourse(courseData) {
        const newCourse = new this.courseModel({
            CoverImage: courseData.coverUrl,
            Descripton: courseData.description,
            publisherId: courseData.tutorId,
            Title: courseData.title,
            Category: courseData.category,
        });
        return newCourse.save();
    }
    async addVideo(videoDBdata) {
        await this.courseModel
            .findByIdAndUpdate(videoDBdata.CourseId, { $push: { videos: videoDBdata._id } }, { new: true })
            .populate('videos');
    }
    async isTutorAuthorised(userId, courseId) {
        const response = await this.courseModel.findOne({
            _id: courseId,
            publisherId: userId,
        });
        return response ? true : false;
    }
    async findCourseByPublisherId(tutorId) {
        return await this.courseModel.find({ publisherId: tutorId });
    }
    async findCourseById(CourseId) {
        return await this.courseModel
            .findById(CourseId)
            .populate('videos')
            .populate('publisherId');
    }
    async findAllCourse() {
        return await this.courseModel.find().sort({ Rating: -1 }).limit(8);
    }
};
exports.mongooseCourseRepository = mongooseCourseRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Course')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseCourseRepository);
//# sourceMappingURL=mongoosecourserepository.js.map