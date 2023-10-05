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
exports.mongooseStudentRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseStudentRepository = exports.mongooseStudentRepository = class mongooseStudentRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getAlltutors() {
        return await this.userModel
            .find({
            role: 'Lead',
        })
            .populate({
            path: 'tags',
            model: 'Category',
        });
    }
    async getTutor(userId) {
        return await this.userModel.findById(userId.userId).populate({
            path: 'tags',
            model: 'Category',
        });
    }
};
exports.mongooseStudentRepository = mongooseStudentRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseStudentRepository);
//# sourceMappingURL=mongooseStudentRepository.js.map