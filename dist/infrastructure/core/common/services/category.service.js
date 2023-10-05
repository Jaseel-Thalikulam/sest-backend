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
exports.CategoryService = void 0;
const mongooseCategoryRepository_1 = require("../../../database/repositories/category/mongooseCategoryRepository");
const common_1 = require("@nestjs/common");
const addCategoryuseCase_1 = require("../../../../Domain/usecase/superadmin/addCategoryuseCase");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(CategoryRepository, addCategoryUseCase) {
        this._CategoryRepository = CategoryRepository;
        this._addCategoryUseCase = addCategoryUseCase;
    }
    async getAllCategory() {
        try {
            const categoryArray = await this._CategoryRepository.getAllCategory();
            return { success: true, data: categoryArray };
        }
        catch (err) {
            console.log(err);
        }
    }
    async addCategory(category) {
        const isCategoryExist = await this._CategoryRepository.getCategory(category.Name);
        if (!isCategoryExist) {
            await this._addCategoryUseCase.execute(category);
            return { success: true, message: 'Successfully Added' };
        }
        else {
            return { success: false, message: 'Category Already Exist' };
        }
    }
    async updateCategory(category) {
        const isCategoryExist = await this._CategoryRepository.getCategory(category.Name);
        if (!isCategoryExist) {
            return { success: false, message: 'Category Not Exist', data: null };
        }
        else {
            return await this._CategoryRepository.updateCategory(category);
        }
    }
    async unlistCategory(id) {
        try {
            const data = await this._CategoryRepository.unlistCategory(id);
            return { success: true, message: 'Success', data };
        }
        catch (err) {
            console.log(err, 'from userlist');
            return { success: false, message: 'Unauthorized' };
        }
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseCategoryRepository_1.mongooseCategoryRepository,
        addCategoryuseCase_1.default])
], CategoryService);
//# sourceMappingURL=category.service.js.map