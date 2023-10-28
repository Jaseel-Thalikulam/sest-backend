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
const mongooseUserRepository_1 = require("../../../../infrastructure/database/repositories/common/mongooseUserRepository");
const email_service_1 = require("../../../../infrastructure/utilities/email/email.service");
const user_entity_1 = require("../../../entity/user.entity");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
let createUserUseCase = class createUserUseCase {
    constructor(userRepository, EmailService) {
        this.EmailService = EmailService;
        this.userRepository = userRepository;
    }
    async execute(user) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const baseUsername = user.name.toLowerCase().replace(/\s+/g, '');
        let username = baseUsername;
        let usernameSuffix = 1;
        while (true) {
            const existingUser = await this.userRepository.getUserByUsername(username);
            console.log(existingUser, 'existinfg userr');
            if (!existingUser) {
                break;
            }
            username = `${baseUsername}${usernameSuffix}`;
            usernameSuffix++;
        }
        const newuser = new user_entity_1.default(user.name, username, user.email, hashedPassword, user.role, user.isVerified);
        const createdUser = await this.userRepository.createUser(newuser);
        this.EmailService.SendEmailOTP(createdUser.email, createdUser._id);
        if (createdUser) {
            let token;
            if (createdUser.isVerified) {
                token = jwt.sign({ userId: createdUser._id }, SECRECT_KEY);
            }
            return { token, createdUser };
        }
    }
};
createUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository,
        email_service_1.EmailService])
], createUserUseCase);
exports.default = createUserUseCase;
//# sourceMappingURL=createUser.js.map