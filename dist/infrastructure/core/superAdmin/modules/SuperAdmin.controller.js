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
const Category_dto_1 = require("../DTO/Category.dto");
const category_service_1 = require("../../common/services/category.service");
const usersList_service_1 = require("./services/userList/usersList.service");
const common_1 = require("@nestjs/common");
const EditCategoryDto_1 = require("../DTO/EditCategoryDto");
let UserListController = class UserListController {
    constructor(userlistservice, categoryservice) {
        this.userlistservice = userlistservice;
        this.categoryservice = categoryservice;
    }
    async getAllUser(res) {
        const response = await this.userlistservice.getAllUsers();
        return res.json({ success: true, data: response });
    }
    async userAccess(id, res) {
        const response = await this.userlistservice.userAccess(id);
        if (response.success) {
            return res.json({
                success: true,
                Userdata: response.data,
                message: response.message,
            });
        }
        else {
            return res.json({ success: false, message: response.message });
        }
    }
    async unlistCategory(id, res) {
        const response = await this.categoryservice.unlistCategory(id);
        if (response.success) {
            return res.json({
                success: true,
                categorydata: response.data,
                message: response.message,
            });
        }
        else {
            return res.json({ success: false, message: response.message });
        }
    }
    async getAllCategory(res) {
        const response = await this.categoryservice.getAllCategory();
        return res.json({ success: response.success, categorydata: response.data });
    }
    async addCategory(Category, res) {
        const response = await this.categoryservice.addCategory(Category);
        console.log(response, 'from add category controller');
        return res.json({ success: response.success, message: response.message });
    }
    async updateCategory(Category, res) {
        const response = await this.categoryservice.updateCategory(Category);
        return res.json({
            success: response.success,
            message: response.message,
            data: response.data,
        });
    }
};
__decorate([
    (0, common_1.Get)('/userslist'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)('/blockuser'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "userAccess", null);
__decorate([
    (0, common_1.Post)('/unlistCategory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "unlistCategory", null);
__decorate([
    (0, common_1.Get)('/Categories'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Post)('/addCategory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Category_dto_1.CategoryDto, Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "addCategory", null);
__decorate([
    (0, common_1.Post)('/updateCategory'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EditCategoryDto_1.EditCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], UserListController.prototype, "updateCategory", null);
UserListController = __decorate([
    (0, common_1.Controller)('/Superadmin'),
    __metadata("design:paramtypes", [usersList_service_1.UserListService,
        category_service_1.CategoryService])
], UserListController);
exports.default = UserListController;
//# sourceMappingURL=SuperAdmin.controller.js.map