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
exports.mongooseCategoryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const ObjectId = mongoose_3.default.Types.ObjectId;
let mongooseCategoryRepository = exports.mongooseCategoryRepository = class mongooseCategoryRepository {
    constructor(CategoryModel) {
        this.CategoryModel = CategoryModel;
    }
    async createCategory(category) {
        const newCategory = new this.CategoryModel(category);
        return await newCategory.save();
    }
    async updateCategory(category) {
        const { Name, Description, categoryId } = category;
        console.log(categoryId, 'catid');
        const existingCategory = await this.CategoryModel.findById(categoryId);
        console.log(existingCategory);
        if (!existingCategory) {
            return { success: false, message: 'category not exist' };
        }
        existingCategory.Name = Name;
        existingCategory.Description = Description;
        const data = await existingCategory.save();
        return { success: true, data };
    }
    async getCategory(Name) {
        const response = await this.CategoryModel.findOne({ Name: Name });
        return response !== null;
    }
    async unlistCategory(id) {
        const categoryObjectId = new ObjectId(id);
        const categorydata = await this.CategoryModel.findById(categoryObjectId);
        console.log(categorydata);
        if (categorydata) {
            categorydata.IsListed = !categorydata.IsListed;
            const Catdata = await categorydata.save();
            const Arr = [Catdata];
            return Arr;
        }
        else {
            return false;
        }
    }
    getAllCategory() {
        return this.CategoryModel.find({});
    }
};
exports.mongooseCategoryRepository = mongooseCategoryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('Category')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], mongooseCategoryRepository);
//# sourceMappingURL=mongooseCategoryRepository.js.map