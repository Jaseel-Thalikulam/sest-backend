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
exports.mongooseTutorRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseTutorRepository = exports.mongooseTutorRepository = class mongooseTutorRepository {
    constructor(userModel, categoryModel) {
        this.userModel = userModel;
        this.categoryModel = categoryModel;
    }
    async addCategory(category) {
        const userdetail = await this.userModel.findById(category.userId);
        const categoryDoc = await this.categoryModel.findById(category.categoryId);
        if (!categoryDoc) {
            return { success: false, message: 'Category not found' };
        }
        const tags = userdetail.tags || [];
        if (tags.length >= 3) {
            return { success: false, message: 'Maximum 3 tags allowed' };
        }
        const index = tags.indexOf(category.categoryId);
        if (index === -1) {
            tags.push(category.categoryId);
        }
        else {
            return { success: false, message: 'Category already added' };
        }
        const update = {
            $set: {
                tags,
            },
        };
        await this.userModel.findByIdAndUpdate(category.userId, update);
        const tutordata = await this.userModel.findById(category.userId).populate({
            path: 'tags',
            model: 'Category',
        });
        return { success: true, message: 'Category Added Successfully', tutordata };
    }
    async removeCategory(category) {
        try {
            const userdetail = await this.userModel.findById(category.userId);
            const categoryDoc = await this.categoryModel.findById(category.categoryId);
            if (!categoryDoc) {
                return { success: false, message: 'Category not found' };
            }
            const tags = userdetail.tags || [];
            const index = tags.indexOf(category.categoryId);
            if (index !== -1) {
                tags.splice(index, 1);
            }
            else {
                return { success: false, message: 'Category not found in user tags' };
            }
            const update = {
                $set: {
                    tags,
                },
            };
            await this.userModel.findByIdAndUpdate(category.userId, update);
            const tutordata = await this.userModel
                .findById(category.userId)
                .populate({
                path: 'tags',
                model: 'Category',
            });
            return {
                success: true,
                message: 'Category Removed Successfully',
                tutordata,
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'An error occurred while removing the category',
                error,
            };
        }
    }
};
exports.mongooseTutorRepository = mongooseTutorRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __param(1, (0, mongoose_2.InjectModel)('Category')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], mongooseTutorRepository);
//# sourceMappingURL=mongoosetutorRepository.js.map