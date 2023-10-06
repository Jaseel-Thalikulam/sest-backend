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
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const SECRECT_KEY = process.env.SECRECT_KEY;
dotenv.config();
let updateUserPasswordUseCase = class updateUserPasswordUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const password = data.password;
        console.log(password, 'from passwordddd');
        const hashedPassword = await bcrypt.hash(password, 10);
        const userDetails = {
            password: hashedPassword,
            email: data.email,
        };
        const user = await this.userRepository.UpdatePassword(userDetails);
        if (user) {
            const token = jwt.sign({ userId: user._id }, SECRECT_KEY);
            return { success: true, token, user };
        }
    }
};
updateUserPasswordUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository])
], updateUserPasswordUseCase);
exports.default = updateUserPasswordUseCase;
//# sourceMappingURL=updateUserPassword.js.map