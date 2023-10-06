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
exports.tutor_CategoryService = void 0;
const common_1 = require("@nestjs/common");
const insertCategoryuseCase_1 = require("../../../../../Domain/usecase/tutor/insertCategoryuseCase");
const removeCategoryuseCase_1 = require("../../../../../Domain/usecase/tutor/removeCategoryuseCase");
let tutor_CategoryService = exports.tutor_CategoryService = class tutor_CategoryService {
    constructor(insertTutorCategoryuseCase, removeTutorCategoryuseCase) {
        this._insertTutorCategoryuseCase = insertTutorCategoryuseCase;
        this._removeTutorCategoryuseCase = removeTutorCategoryuseCase;
    }
    async insertCategory(insertiondata) {
        return await this._insertTutorCategoryuseCase.execute(insertiondata);
    }
    async removeCategory(insertiondata) {
        return await this._removeTutorCategoryuseCase.execute(insertiondata);
    }
};
exports.tutor_CategoryService = tutor_CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [insertCategoryuseCase_1.default,
        removeCategoryuseCase_1.default])
], tutor_CategoryService);
//# sourceMappingURL=tutor_Category.service.js.map