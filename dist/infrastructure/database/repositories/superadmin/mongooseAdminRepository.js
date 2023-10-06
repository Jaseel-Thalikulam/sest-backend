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
exports.mongooseSuperAdminRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseSuperAdminRepository = exports.mongooseSuperAdminRepository = class mongooseSuperAdminRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async changeUserAccess(id) {
        try {
            const userId = new mongoose_1.default.Types.ObjectId(id);
            const userData = await this.userModel.findById(userId);
            if (userData) {
                userData.isBanned = !userData.isBanned;
                return await userData.save();
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err, 'from DB Gatway');
            return false;
        }
    }
    async getAllUsers() {
        console.log('Finding UsersList');
        return await this.userModel.find({});
    }
};
exports.mongooseSuperAdminRepository = mongooseSuperAdminRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseSuperAdminRepository);
//# sourceMappingURL=mongooseAdminRepository.js.map