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
exports.UserListService = void 0;
const mongooseAdminRepository_1 = require("../../../../../database/repositories/superadmin/mongooseAdminRepository");
const common_1 = require("@nestjs/common");
let UserListService = exports.UserListService = class UserListService {
    constructor(AdminRepository) {
        this._AdminRepository = AdminRepository;
    }
    async getAllUsers() {
        try {
            console.log('get all user superadmin -service');
            const usersArray = await this._AdminRepository.getAllUsers();
            return usersArray.filter((user) => user.role === 'Learn' || user.role === 'Lead');
        }
        catch (err) {
            console.log(err);
        }
    }
    async userAccess(id) {
        try {
            const data = await this._AdminRepository.changeUserAccess(id);
            return { success: true, message: 'Success', data };
        }
        catch (err) {
            console.log(err, 'from userlist');
            return { success: false, message: 'Unauthorized' };
        }
    }
};
exports.UserListService = UserListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseAdminRepository_1.mongooseSuperAdminRepository])
], UserListService);
//# sourceMappingURL=usersList.service.js.map