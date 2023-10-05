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
const mongooseUserRepository_1 = require("../../../infrastructure/database/repositories/common/mongooseUserRepository");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
let verifyLoginUserUseCase = class verifyLoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(user) {
        const data = await this.userRepository.findUserByEmail(user.email);
        if (data) {
            const Verified = await bcrypt.compare(user.password, data.password);
            if (Verified) {
                if (data.isVerified) {
                    if (data.isBanned == false) {
                        const token = jwt.sign({ userId: data._id }, SECRECT_KEY);
                        return { success: true, message: 'Verified', data, token };
                    }
                    else {
                        return { success: false, message: 'Banned By Admin' };
                    }
                }
                else {
                    return { success: false, message: 'User Not Exist' };
                }
            }
            else {
                return { success: false, message: 'Incorrect Password' };
            }
        }
        else {
            return { success: false, message: 'User Not Exist' };
        }
    }
};
verifyLoginUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository])
], verifyLoginUserUseCase);
exports.default = verifyLoginUserUseCase;
//# sourceMappingURL=loginUser.js.map