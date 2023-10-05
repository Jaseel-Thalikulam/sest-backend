"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminModule = void 0;
const mongooseCategoryRepository_1 = require("../../../database/repositories/category/mongooseCategoryRepository");
const mongooseAdminRepository_1 = require("../../../database/repositories/superadmin/mongooseAdminRepository");
const usersList_service_1 = require("./services/userList/usersList.service");
const category_service_1 = require("../../common/services/category.service");
const Category_1 = require("../../../database/schema/Category");
const SuperAdmin_controller_1 = require("./SuperAdmin.controller");
const User_1 = require("../../../database/schema/User");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const addCategoryuseCase_1 = require("../../../../Domain/usecase/superadmin/addCategoryuseCase");
let SuperAdminModule = exports.SuperAdminModule = class SuperAdminModule {
};
exports.SuperAdminModule = SuperAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: User_1.UserSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Category',
                    schema: Category_1.categorySchema,
                },
            ]),
        ],
        controllers: [SuperAdmin_controller_1.default],
        providers: [
            usersList_service_1.UserListService,
            category_service_1.CategoryService,
            mongooseAdminRepository_1.mongooseSuperAdminRepository,
            mongooseCategoryRepository_1.mongooseCategoryRepository,
            addCategoryuseCase_1.default,
        ],
    })
], SuperAdminModule);
//# sourceMappingURL=SuperAdmin.module.js.map